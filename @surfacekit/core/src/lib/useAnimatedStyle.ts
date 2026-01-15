import React from "react";
import { StandardProperties } from "csstype";
import { LayoutChangeEvent, Platform, StyleSheet } from "react-native";
import { AnimatedRef, Keyframe, SharedValue, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { measure } from 'react-native-reanimated';
import { runOnJS } from "react-native-worklets";
import { animateToValue } from "./defaultAnimations";
import { useDynamicSharedValues } from "./useDynamicSharedValues";
import { TreeItem } from "./PresenceController";
import { createControlledPromise } from "./ControlledPromise";

export const useAnimatedStylesheet = (
  compRef: AnimatedRef<any>,
  componentProps: any,
  presence: TreeItem,
  originalProps: any,
) => {
  const transition = componentProps.transition || {};
  const styleProp = componentProps.style;
  const animation = componentProps.animation;

  delete componentProps.transition;
  delete componentProps.animation;
  delete componentProps.overrides;

  useTransitionedStyles(presence, transition, styleProp, originalProps);
  useDetachStyle(compRef, componentProps, presence, originalProps, styleProp);


  // if (animation) {

  //   const animations = Array.isArray(animation) ? animation : [animation];
    
  //   animations.forEach((animation) => {
  //     const keyframe = new Keyframe(animation.keyframes);
  //     const defintions = keyframe.parseDefinitions();


  //     // defintions.initialValues.forEach((value: any, index: number) => {

  //     // })
  //     // withSequence(
  //     //   ...keyframePoints.map((keyframePoint: KeyframePoint) =>
  //     //     withTiming(keyframePoint.value, {
  //     //       duration: keyframePoint.duration,
  //     //       easing: keyframePoint.easing
  //     //         ? keyframePoint.easing
  //     //         : Easing.linear,
  //     //     })
  //     //   )
  //     // )

  //     // componentProps.style.push({
  //     //   animationName: animation.keyframes,
  //     //   animationDuration: animation.duration || '300ms',
  //     //   animationIterationCount: animation.repeat || 0,
  //     //   animationTimingFunction: animation.timingFunction || 'linear',
  //     //   animationDirection: animation.direction || 'normal',
  //     // })
  //   });
  // }
  
};

const defaultTransforms: Record<string, any> = {
  rotate: "0deg",
  rotateX: "0deg",
  rotateY: "0deg",
  rotateZ: "0deg",
  translateX: 0,
  translateY: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  skew: "0deg",
  skewX: "0deg",
  skewY: "0deg",
  perspective: 1000,
};

const defaultTransformStyle = Object.entries(defaultTransforms).map(
  ([prop, value]) => ({ [prop]: value }),
);

const styleDefaults = {
  opacity: 1,
  padding: 0,
  paddingHorizontal: 0,
  paddingVertical: 0,
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  margin: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginHorizontal: 0,
  marginVertical: 0,
  borderRadius: 0,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
} as const;

const useTransitionedStyles = (
  presence: TreeItem,
  transition: any,
  styleProp: any[],
  props: any,
) => {

  const [state] = React.useState(() => ({
    pendingTransitions: [] as Promise<any>[],
    animationEffects: new Map<string, () => void>(),
    // completedAnimations: new Set<string>(),
  }));

  const sharedValues = useDynamicSharedValues();
  const animationKeys = Object.keys(transition || {});
  const remainingAnimatedProperties = new Set(animationKeys);
  const compiledStyle = Object.assign({}, ...styleProp);


  const animateProperty = (key: string, initial: any, next: any) => {
    remainingAnimatedProperties.delete(key);
    sharedValues.init(key, initial);
    const hasChanged = sharedValues.target(key, next);
    presence?.lifecycle?.scheduleAnimation?.();

    state.animationEffects.set(key, () => {
      const isAnimating = state.pendingTransitions.length > 0;
      if (!isAnimating) {
        presence?.lifecycle?.onAnimationStart?.();
      }
      
      const promiseCtl = createControlledPromise()
      const transitionConfig = transition[key];
      const delay = compiledStyle.transitionDelay || 0;

      const onAnimationEnd = () => promiseCtl.complete();

      if (hasChanged) {
        sharedValues.set(key, animateToValue(next, transitionConfig, () => {
          'worklet';
  
          runOnJS(onAnimationEnd)();
        }));
      } else {
        onAnimationEnd();
      }
  
      state.pendingTransitions.push(promiseCtl.promise);
      const totalAnimationsCount = state.pendingTransitions.length;
      Promise.all(state.pendingTransitions).then(() => {
        const animationChanged = totalAnimationsCount !== state.pendingTransitions.length;
        if (animationChanged) return;
  
        presence?.lifecycle?.onAnimationEnd?.();
      });
    });
  };

  React.useEffect(() => {
    Array.from(state.animationEffects.values())
      .forEach((startAnimation) => startAnimation());

    state.animationEffects.clear();
  });

  // Create Shared Values
  for (const propName in compiledStyle) {
    if (propName === "transform") {
      // remainingAnimatedProperties.delete(propName);
      compiledStyle.transform?.forEach((transform: any) => {
        const transformName = Object.keys(transform)[0] as any;
        const transformValue = transform[transformName];
        const isAnimated = transition[transformName];
        if (!isAnimated) return;

        animateProperty(transformName, transformValue, transformValue);
      });
    } else {
      const isAnimated = transition[propName];
      if (!isAnimated) continue;

      const initial = compiledStyle[propName];
      const next = compiledStyle[propName];
      animateProperty(propName, initial, next);
    }
  }


  // Sort animated properties to ensure scale comes after translate
  // is animated but not defined anymroe in styles
  // So we should animate it back to it's initial value
  // Note: we cannot animate width and height here because there is no default value
  Array.from(remainingAnimatedProperties).sort((a, b) => {
    const isScaleA = a.includes("scale");
    const isScaleB = b.includes("scale");
    const isTranslateA = a.includes("translate");
    const isTranslateB = b.includes("translate");

    if (isScaleA && isTranslateB) return 1;
    if (isTranslateA && isScaleB) return -1;
    return 0;
  }).forEach((prop: any) => {
    // @ts-expect-error
    const initial = defaultTransforms[prop] ?? styleDefaults[prop];
    if (initial !== undefined) {
      animateProperty(prop, initial, initial);
    }
  });


  // // Create Animated Style
  const styles : Record<string, SharedValue> = {};
  sharedValues.forEach((propName, sharedValue) => {
    styles[propName] = sharedValue;
  });

  const animatedStyle = useAnimatedStyle(() => {
    const style = {} as Record<string, any>;

    for (const key in styles) {
      const sharedValue = styles[key];
      const isTransform = key in defaultTransforms;
      if (!isTransform) {
        style[key] = sharedValue.value;
        continue;
      }
      
      if (!style.transform) {
        style.transform = [];
      }

      style.transform.push({
        [key]: sharedValue.value,
      });
    }

    return style;
  });

  
  styleProp.push(animatedStyle);
}

const useDetachStyle = (
  compRef: AnimatedRef<any>,
  componentProps: any,
  presence: TreeItem,
  originalProps: any,
  styleProp: any[]
) => {

  if (!presence?.item.containerRef) {
    return;
  }

  const prevOnLayout = componentProps.onLayout;
  const detachHistory = React.useRef<boolean[]>([]);
  const distanceX = useSharedValue(0);
  const distanceY = useSharedValue(0);
  componentProps.onLayout = (event: LayoutChangeEvent) => {
    prevOnLayout?.(event);

    const nativeLayout = event.nativeEvent.layout!;
    const layout = Platform.OS === 'web' && compRef ? measure(compRef)! : nativeLayout;

    distanceX.value = layout.x;
    distanceY.value = layout.y;
  };

  const detachStyle = useAnimatedStyle(() => {
    return {
      left: distanceX.value,
      top: distanceY.value,
    }
  });

  const unDetachStyle = useAnimatedStyle(() => {
    return {
      // left: 0,
      // top: 0,
    } as any;
  });

  
  const isDetached = !!componentProps.detach;
  detachHistory.current.push(isDetached);
  detachHistory.current = detachHistory.current.slice(-2);

  // When we detach the element, but quickly rerender without the detach styles
  // the detach style are kept because of how reanimated styles work.
  // So we need to override those properties to ensure that detach style are not present
  // when we rerender without detach = true;
  const shouldUndoDetachAnimatedStyles = detachHistory.current[0] === true
    && detachHistory.current[1] === false

  if (isDetached) {
    // When animating position, we need to track whether the component is 
    // positioned absolutely or not. If the style is applied in animated style
    // then we can't read and copy that information when applying styles
    // to the tracking component in AnimateLayoutPosition component.
    styleProp.push({ 
      position: 'absolute',
      top: distanceY.value,
      left: distanceX.value,
      
      // detach style should be displayed below undetached apps.
      zIndex: -1,
    });

    styleProp.push(detachStyle);
  } else if (shouldUndoDetachAnimatedStyles) {
    styleProp.unshift(unDetachStyle);
  }
}

export type TransformProperty =
  | "translateX"
  | "translateY"
  | "translateZ"
  | "scale"
  | "scaleX"
  | "scaleY"
  | "scaleZ"
  | "rotate"
  | "rotateX"
  | "rotateY"
  | "rotateZ"
  | "skew"
  | "skewX"
  | "skewY"
  | "perspective";
export type AnimatedProperty = Omit<keyof StandardProperties, "transform"> &
  TransformProperty;
export type TransitionProp = Partial<Record<AnimatedProperty, boolean>> | boolean;

export const DEFAULT_TRANSFORM_STYLE = StyleSheet.create<any>({
  base: {
    transform: defaultTransformStyle,
  },
}).base;

