import React from 'react';
import {  AnimatedRef, measure, useAnimatedRef, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useAnimatedLayoutSize, useLayoutSize } from './lib/useLayoutSize';
import { LayoutChangeEvent } from 'react-native';
import { animateToValue } from './lib/defaultAnimations';

interface AnimateLayoutSizeProps {
  innerRef?: AnimatedRef<any>;
  innerProps?: any;
  animateHeight?: boolean;
  animateWidth?: boolean;
  transition: any;
}

export const AnimateLayoutSize : React.FC<React.PropsWithChildren<AnimateLayoutSizeProps>> = (props) => {
  const trackRef = props.innerRef || useAnimatedRef<any>();
  const animatedSize = useTransitionedSize({ 
    elementRef: trackRef,
    transition: props.transition 
  });

  const animateHeight = props.animateHeight || false;
  const animateWidth = props.animateWidth || false;

  const applyStyle = useAnimatedStyle(() => {
    return {
      height: animateHeight ? animatedSize.ui?.height.value : "100%",
      width: animateWidth ? animatedSize.ui?.width.value : "100%",
    };
  });

  const getStyle = (attribute: any) => {
    return props.innerProps.style?.[attribute]
      || props.innerProps.style.findLast((style: any) => style[attribute])?.[attribute];
  }

  return (
    <View
      key={"apply"}
      relative
      overflowHidden
      debugId="animateSize"
      disableLayoutTransitions
      style={[    
        animatedSize.isInitialized && applyStyle,
      ]}
      
    >
      <View
        key={"track"}
        onLayout={animatedSize.onLayout}
        ref={trackRef}

        // We need to forward flexDirection and gap
        // otherwise the layout won't look how the user intend
        flexDirection={getStyle("flexDirection")}
        gap={getStyle('gap')}
        overrides={[
          animatedSize.isInitialized && {
            absolute: true,
            top: 0,
            left: 0,
            height: animateWidth ? animateHeight ? undefined : "100%" : undefined,
            width: animateHeight ? animateWidth ? undefined :"100%" : undefined,
          }
        ]}
      >
        {props.children}
      </View>
    </View>
  )
}


const INITIAL = {
  __hasChanged: false,
  width: 0,
  height: 0,
}

const useTransitionedSize = (config: {elementRef: AnimatedRef<any>, transition: any}) => {
  const [_, rerender] = React.useState({})
  const lastValues = React.useRef({ ...INITIAL });
  const trackTarget = (target: ReturnType<typeof getTargetFromLayout>) => {
    lastValues.current.__hasChanged = true;
    lastValues.current.width = target.width;
    lastValues.current.height = target.height;
  }

  const ui = {
    width:  useSharedValue(INITIAL.width),
    height:  useSharedValue(INITIAL.height),
  };

  const updateValue = React.useCallback((target: { width: number, height: number }) => {    
    const isInitialized = !!lastValues.current.__hasChanged;
    const widthChanged = (target.width !== lastValues.current.width);
    const heightChanged = (target.height !== lastValues.current.height);

    if (!isInitialized) {
      trackTarget(target);
      ui.width.value = target.width;
      ui.height.value = target.height;
      rerender({});
      return;
    }

    trackTarget(target);
    if (heightChanged) ui.height.value = animateToValue(target.height, config.transition)
    if (widthChanged) ui.width.value = animateToValue(target.width, config.transition)
  }, []);

  const getTargetFromLayout = (event: LayoutChangeEvent, debugId?: string) => {
    'worklet';

    const layout = event.nativeEvent.layout;
    const nextWidth = Math.round(layout.width);
    const nextHeight = Math.round(layout.height);
    
    return {
      width: nextWidth,
      height: nextHeight,
    };
  }

  const onLayout = (event: LayoutChangeEvent) => {  
    const target = getTargetFromLayout(event, 'onLayout');
    updateValue(target);
  }

  React.useLayoutEffect(() => {
    if(!config.elementRef) return;
  
    const measured = measure(config.elementRef!)
    if (!measured) return;
  
    const event : any = {
      nativeEvent: {
        layout: {
          width: measured.width,
          height: measured.height,
          x: measured.x,
          y: measured.y,
        }
      }
    };

    const target = getTargetFromLayout(event, 'onLayout');
    updateValue(target);
  })

  const isInitialized = !!lastValues.current.__hasChanged;

  return {
    isInitialized,
    onLayout,
    ui,
  }
}