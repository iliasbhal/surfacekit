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
    height: animateHeight ? size?.height : undefined,
    width: animateWidth ? size?.width : undefined,
    transition: {
      height: animateHeight,
      width: animateWidth,
    }
  };

  const trackProps = !size ? {} : {
    absolute: true,
    top: 0,
    left: 0,
  };

  const gap = props.innerProps.style?.gap 
    || props.innerProps.style.findLast((style: any) => style.gap)?.gap;

  return (
    <View
      key={"apply"}
      relative
      overflowHidden
      // overflowVisible
      width="100%"
      disableLayoutTransitions
      {...applyProps}
      
    >
      <View
        key={"track"}
        width="100%"
        onLayout={onLayout}
        ref={trackRef}
        {...trackProps}
        gap={gap}
      >
        {props.children}
      </View>
    </View>
  )
}