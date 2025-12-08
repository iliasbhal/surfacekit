import React from 'react';
import {  AnimatedRef, useAnimatedRef } from 'react-native-reanimated';
import { useLayoutSize } from './lib/useLayoutSize';

interface AnimateLayoutSizeProps {
  View: any;
  innerRef?: AnimatedRef<any>;
  innerProps?: any;
  animateHeight?: boolean;
  animateWidth?: boolean;
}

export const AnimateLayoutSize : React.FC<React.PropsWithChildren<AnimateLayoutSizeProps>> = (props) => {
  const { View } = props;

  const trackRef = props.innerRef || useAnimatedRef<any>();
  const { size, onLayout } = useLayoutSize(trackRef);

  const animateHeight = props.animateHeight || false;
  const animateWidth = props.animateWidth || false;
  
  const applyProps = !size ? {
    transition: {},
  } : {
    // width: trackLayout.targetMeasure?.width,
    height: animateHeight ? size?.height : "100%",
    width: animateWidth ? size?.width : "100%",
    transition: {
      height: animateHeight,
      width: animateWidth,
    }
  };
  
  const trackProps = !size ? {} : {
    absolute: true,
    top: 0,
    left: 0,
    height: animateWidth ? animateHeight ? undefined : "100%" : undefined,
    width: animateHeight ? animateWidth ? undefined :"100%" : undefined,
  };

  const getStyle = (attribute: any) => {
    return props.innerProps.style?.[attribute]
      || props.innerProps.style.findLast((style: any) => style[attribute])?.[attribute];
  }

  const gap = getStyle('gap');
  const flexDirection = getStyle("flexDirection");

  return (
    <View
      key={"apply"}
      relative
      overflowHidden
      disableLayoutTransitions
      {...applyProps}
      
    >
      <View
        key={"track"}
        onLayout={onLayout}
        ref={trackRef}
        {...trackProps}
        flexDirection={flexDirection}
        gap={gap}
      >
        {props.children}
      </View>
    </View>
  )
}