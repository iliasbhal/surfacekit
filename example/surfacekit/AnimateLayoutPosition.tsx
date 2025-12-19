import React, { RefObject } from 'react';
import { AnimatedRef, interpolate, measure, runOnJS, useAnimatedReaction, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import { useAnimatedLayoutSize, useLayoutSize } from './lib/useLayoutSize';
import { LayoutChangeEvent, Platform, findNodeHandle } from 'react-native';
import { animateToValue } from './lib/defaultAnimations';
import { useAnimatedPosition, useTrackPosition } from './lib/useLayoutPosition';
import { useDynamicSharedValues } from './lib/useDynamicSharedValues';

interface AnimateLayoutPositionProps {
  debugId?: string;
  transition?: boolean;
}

export const AnimateLayoutPosition : React.FC<React.PropsWithChildren<AnimateLayoutPositionProps>> = (props) => {
  const child = React.Children.only(props.children) as any;
  
  const trackRef = useAnimatedRef();
  const applyRef = useAnimatedRef();

  const sizeTracker = useAnimatedLayoutSize(applyRef, 'sizeTracker');
  const anchor = useAnchorStyle(child.props);
  const transition = useTransitionedPosition({
    elementRef: trackRef,
    transition: props.transition,
  });
  
  
  const isSizeMeasured = !!sizeTracker.initialSize;

  const anchorStyle = useAnimatedStyle(() => {
    const position : Record<string, number | string> = {};
    if (!isSizeMeasured) return position;

    const trackPos = measure(trackRef!)
    if (!trackPos) return position;

    
    position.position = 'absolute';
    
    const isOppositeAnchorHorizontal = typeof anchor.ui.right.value === 'number';
    if (isOppositeAnchorHorizontal) {
      const distance = trackPos.x + trackPos.width - transition.ui.right.value;
      position.right = distance + anchor.ui.right.value;
      position.left = 'unset';
    } else {
      position.left = transition.ui.left.value;
      position.right = 'unset';
    }
  
    const isOppositeAnchorVertical = typeof anchor.ui.bottom.value === 'number';
    if (isOppositeAnchorVertical) {
      const distance = (trackPos.y + trackPos.height - transition.ui.bottom.value);
      position.bottom = distance + anchor.ui.bottom.value;
      position.top = 'unset';
    } else {
      position.top = transition.ui.top.value;
      position.bottom = 'unset';
    }

    // console.log('REACTION STYLE', {
    //   right: position.right,
    //   left: position.left,
    // })
  
    return position;
  });

  // console.log('RERENDER ANIMATE LAYOUT', anchorSide);

  // We render in two steps.
  // 1st render is to display the component normaly
  // 2nd render is to apply a version that is animated
  // we keep updating the the size of the "track" component so that the "apply" component can be positioned correctly
  // the track is not visible and is used to compute the translateXY for the animation. It's like a placeholder.
  return [
    isSizeMeasured && ( 
      <View
        key={"track"}
        ref={trackRef}
        onLayout={(event) => {
          // if (rerenderIdRef.current.count === 0) {
          //   rerenderIdRef.current.count++;
            transition.onLayout?.(event);
          // }
        }}
        style={[
          ...anchor.positionStyle,
          ...sizeTracker.style,
          {
            // position: 'relative',
            zIndex: -1,
            opacity: 0,
            backgroundColor: 'transparent',
            // opacity: .5,
            // backgroundColor: 'red'
          }
        ]}
      />
    ),
    React.cloneElement(child, {
      key:"apply",
      ...child.props,
      ref: (ref) => {
        child.props.ref?.(ref);
        applyRef(ref);
      },
      onLayout: (event: LayoutChangeEvent) => {
        transition.onInitialLayout(event);
        sizeTracker.onLayout(event);
        child.props.onLayout?.(event);
      },
      style: [
        { zIndex: 1 },
        ...child.props.style,        
        transition.isInitialized && anchorStyle,
      ]
    })
  ];
}

const INITIAL = {
  __hasChanged: false,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
}

const useTransitionedPosition = (config: {elementRef: AnimatedRef<any>, transition: any}) => {
  const [_, rerender] = React.useState({})
  const lastValues = React.useRef({ ...INITIAL });
  const trackTarget = (target: ReturnType<typeof getTargetFromLayout>) => {
    lastValues.current.__hasChanged = true;
    lastValues.current.left = target.left;
    lastValues.current.right = target.right;
    lastValues.current.bottom = target.bottom;
    lastValues.current.top = target.top;
  }

  const ui = {
    left:  useSharedValue(INITIAL.left),
    top:  useSharedValue(INITIAL.top),
    right:  useSharedValue(INITIAL.right),
    bottom:  useSharedValue(INITIAL.bottom),
  };

  const updateValue = React.useCallback((target: { left: number, right: number, top: number, bottom: number }) => {    
    const isInitialized = !!lastValues.current.__hasChanged;
    if (!isInitialized) {
      trackTarget(target);
      ui.left.value = target.left;
      ui.top.value = target.top;
      ui.bottom.value = target.bottom;
      ui.right.value = target.right;
      rerender({});
      return;
    }

    const leftChanged = (target.left !== lastValues.current.left);
    const rightChanged = (target.right !== lastValues.current.right);
    const topChanged = (target.top !== lastValues.current.top);
    const bottomChanged = (target.bottom !== lastValues.current.bottom);
    
    // if (topChanged) console.log('ANIAMTE top', target.top);
    // if (leftChanged) console.log('ANIAMTE left', target.left);
    // if (rightChanged) console.log('ANIAMTE right', target.right);
    // if (bottomChanged) console.log('ANIAMTE bottom', target.bottom);

    trackTarget(target);
    if (topChanged) ui.top.value = animateToValue(target.top, config.transition)
    if (leftChanged) ui.left.value = animateToValue(target.left, config.transition)
    if (rightChanged) ui.right.value = animateToValue(target.right, config.transition)
    if (bottomChanged) ui.bottom.value = animateToValue(target.bottom, config.transition)
  }, []);

  const getTargetFromLayout = (event: LayoutChangeEvent, debugId?: string) => {
    'worklet';

    const layout = event.nativeEvent.layout;

    
    const nextWidth = Math.round(layout.width);
    const nextHeight = Math.round(layout.height);
    const nextLeft = Math.round(layout.x);
    const nextTop = Math.round(layout.y);
    const nextRight = nextLeft + nextWidth;
    const nextBottom = nextTop + nextHeight;
    
    console.log('TRANSITION STYLE', debugId, [nextWidth, nextHeight, nextLeft, nextTop])
    return {
      left: nextLeft,
      top: nextTop,
      right: nextRight,
      bottom: nextBottom,
    };
  }

  const onInitialLayout = (event: LayoutChangeEvent) => {
    const isInitialized = !!lastValues.current.__hasChanged;
    if (isInitialized) return;

    const target = getTargetFromLayout(event, 'onInitialLayout');
    updateValue(target);
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
    onInitialLayout,
    onLayout,
    ui,
  }
}

const useAnchorStyle = (props: any) => {
  const anchorValues = React.useRef<Record<string, number>>({});
  anchorValues.current = {};

  const positionStyle : any[] = [];
  const withoutPositionStyle : any[] = [];
  props.style.map((style: any) => {
    const isAnimatedStyle = style.viewDescriptors;
    if (isAnimatedStyle) {
      withoutPositionStyle.push(style);
      return
    }
    
    const withPositionStyle: Record<string, any> = {};
    const withoutPosStyle : Record<string, any> = {};
    const positionAttrs = new Set([
      'position', 'top', 'left', 'right', 'bottom',
      'transform', 'margin', 'marginTop', 'marginBottom', 
      'marginLeft','marginRight', 'marginHorizontal', 'marginVertical'
    ]);

    if (typeof style.top === 'number') anchorValues.current.top = style.top;
    if (typeof style.left === 'number') anchorValues.current.left = style.left;
    if (typeof style.right === 'number') anchorValues.current.right = style.right;
    if (typeof style.bottom === 'number') anchorValues.current.bottom = style.bottom;

    Object.entries(style).forEach(([attr, value]) => {
      const isPos = positionAttrs.has(attr);
      if (isPos) {
        withPositionStyle[attr] = value;
      } else {
        withoutPosStyle[attr] = value; 
      }
    });

    withoutPositionStyle.push(withoutPosStyle);
    positionStyle.push(withPositionStyle);
  });

  const sharedAnchor = {
    left: useSharedValue(0),
    right: useSharedValue(0),
    top: useSharedValue(0),
    bottom: useSharedValue(0),
  };

  React.useLayoutEffect(() => {
    sharedAnchor.bottom.value = anchorValues.current.bottom ?? 'unset'
    sharedAnchor.left.value = anchorValues.current.left ?? 'unset';
    sharedAnchor.right.value = anchorValues.current.right ?? 'unset';
    sharedAnchor.top.value = anchorValues.current.top ?? 'unset';
  })

  return {
    ui: sharedAnchor,
    positionStyle,
    withoutPositionStyle,
  }
}
