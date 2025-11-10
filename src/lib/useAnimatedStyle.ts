import React from "react";
import { StandardProperties } from "csstype";
import { StyleSheet } from "react-native";
import { Keyframe, SharedValue, useAnimatedStyle, withDelay } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import * as DefaultAnimations from "./defaultAnimations";
import { useDynamicSharedValues } from "./useDynamicSharedValues";
import { AnimatePresenceContextValue } from "./AnimatePresence";
import { createControlledPromise } from "./ControlledPromise";

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

export const useAnimatedStylesheet = (
  componentProps: any,
  presence: AnimatePresenceContextValue,
) => {
  const [state] = React.useState(() => ({
    pendingTransitions: [] as Promise<any>[],
    animationEffects: new Map<string, () => void>(),
    // completedAnimations: new Set<string>(),
  }));

  const transition = componentProps.transition || {};
  const animation = componentProps.animation;

  delete componentProps.transition;
  delete componentProps.animation;

  const styleProp = componentProps.style;

  const sharedValues = useDynamicSharedValues();
  const animationKeys = Object.keys(transition || {});
  const remainingAnimatedProperties = new Set(animationKeys);
  const compiledStyle = Object.assign({}, ...styleProp);

  // console.log('compiledStyle',componentProps.debugId, compiledStyle);

  const animateProperty = (key: string, initial: any, next: any) => {
    remainingAnimatedProperties.delete(key);
    sharedValues.init(key, initial);

    state.animationEffects.set(key, () => {
      const isAnimating = state.pendingTransitions.length > 0;
      if (!isAnimating) {
        presence?.lifecycle?.onAnimationStart?.();
      }
      
      // console.log('PRESENCE -- start animation', componentProps.debugId, key, next, Array.from(state.pendingTransitions));
      const promiseCtl = createControlledPromise()
      const delay = compiledStyle.transitionDelay || 0;
      sharedValues.set(key, withDelay(delay, DefaultAnimations.Natural(next, () => {
        scheduleOnRN(() => promiseCtl.complete());
      })));
  
  
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
    Array.from(state.animationEffects.values()).forEach((effect) => {
      effect();
    });

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
  const sortedProps = Array.from(remainingAnimatedProperties).sort((a, b) => {
    const isScaleA = a.includes("scale");
    const isScaleB = b.includes("scale");
    const isTranslateA = a.includes("translate");
    const isTranslateB = b.includes("translate");

    if (isScaleA && isTranslateB) return 1;
    if (isTranslateA && isScaleB) return -1;
    return 0;
  });

  // is animated but not defined anymroe in styles
  // So we should animate it back to it's initial value
  // Note: we cannot animate width and height here because there is no default value
  // console.log('styleProp - animatedProperties', animatedProperties);
  sortedProps.forEach((prop: any) => {
    // @ts-expect-error
    const initial = defaultTransforms[prop] ?? styleDefaults[prop];
    // console.log('styleProp - ANIMETED -', prop, initial);
    if (initial !== undefined) {
      animateProperty(prop, initial, initial);
    }
  });



  // // Create Animated Style
  const styles : Record<string, SharedValue> = {};
  sharedValues.forEach((propName, sharedValue) => {
    styles[propName] = sharedValue;
  });


  // // Create Animated Style
  const animatedStyle = useAnimatedStyle(() => {
    const style = {} as Record<string, any>;

    for (const key in styles) {
      const sharedValue = styles[key];
      const isTransform = key in defaultTransforms;
      if (isTransform) {
        if (!style.transform) {
          style.transform = [];
        }
        return style.transform.push({
          [key]: sharedValue.value,
        });
      }

      style[key] = sharedValue.value;
    }

    return style;
  });

  
  styleProp.push(animatedStyle);



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

  //     console.log('USE ANIMATION', animation, defintions);
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
