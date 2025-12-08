import React, { RefObject } from 'react';
import { AnimatedRef, measure, useAnimatedRef, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useLayoutSize } from './lib/useLayoutSize';
import { LayoutChangeEvent } from 'react-native';
import { animateToValue } from './lib/defaultAnimations';

interface LayoutMeasure {
  x: number;
  y: number;
}


const useTrackPosition = (trackRef: AnimatedRef<any>, debugId?: string) => {
  const [position, setPosition] = React.useState<Partial<LayoutMeasure>>({})

  const onLayout = (event?: LayoutChangeEvent) => {
    const trackMeasure = measure(trackRef)!;
    const canCompute = !!(trackMeasure);
    if (!canCompute) return;

    const anchorMovedX = position?.x !== trackMeasure.x
    const anchorMovedY =  position?.y !== trackMeasure.y;
    const anchorLayoutChanged = anchorMovedX || anchorMovedY;
    const hasLayoutChanged = !!(anchorLayoutChanged);
    if (!hasLayoutChanged) return;

    setPosition({
      x: trackMeasure.x,
      y: trackMeasure.y,
    })
  }
  
  React.useLayoutEffect(onLayout);
  // React.useEffect(onLayout);

  return {
    onLayout,
    position,
  };
}

interface AnimateLayoutPositionProps {
  debugId?: string;
  View: any;
  transition?: boolean;
}

export const AnimateLayoutPosition : React.FC<React.PropsWithChildren<AnimateLayoutPositionProps>> = (props) => {
  const { View, transition } = props;
  
  const trackRef = useAnimatedRef<any>();
  const applyRef = useAnimatedRef<any>();
  const sizeTracker = useLayoutSize(applyRef);
  
  const isSizeMeasured = !!sizeTracker.size;
  const trackPosition = useTrackPosition(trackRef, props.debugId);
  const applyPosition = useTrackPosition(applyRef, props.debugId);

  const isTrackRendered = typeof trackPosition.position.x === 'number'
    && typeof trackPosition.position.y === 'number';



  // When first animating, we should just set the new value,
  // and then animate on subsequent updates.
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const currentTranslateRef = React.useRef({ x: 0, y: 0 });

  React.useLayoutEffect(() => {
    if (!isTrackRendered) {
      const nextX = applyPosition.position?.x ?? 0;
      const nextY = applyPosition.position?.y ?? 0;

      const isXChanged = currentTranslateRef.current.x !== nextX;
      const isYChanged = currentTranslateRef.current.y !== nextY;
      if (isXChanged || isYChanged) {
        translateX.value = nextX;
        translateY.value = nextY;
        currentTranslateRef.current.x = nextX;
        currentTranslateRef.current.y = nextY;
      }

      return
    }

    const nextX = trackPosition.position?.x ?? 0;
    const nextY = trackPosition.position?.y ?? 0;

    const isXChanged = currentTranslateRef.current.x !== nextX;
    const isYChanged = currentTranslateRef.current.y !== nextY;
    if (isXChanged || isYChanged) {
      translateX.value = animateToValue(nextX, props.transition);
      translateY.value = animateToValue(nextY, props.transition);
      currentTranslateRef.current.x = nextX;
      currentTranslateRef.current.y = nextY;
    }
  });


  const child = React.Children.only(props.children) as any;

  const positionStyle = child.props.style.map((style: any) => {
    const isAnimatedStyle = style.viewDescriptors;
    if (isAnimatedStyle) {
      return style;
    }
    
    const positionStyle: Record<string, any> = {};
    const positionAttrs = [
      'position', 'top', 'left', 'right', 'bottom',
      'transform', 'margin', 'marginTop', 'marginBottom', 
      'marginLeft','marginRight', 'marginHorizontal', 'marginVertical'
    ];

    positionAttrs.forEach(attr => {
      // Only copy if the value is defined (for margins)
      if (style[attr] !== undefined) {
        positionStyle[attr] = style[attr];
      }
    });

    return positionStyle;
  });

  const animatedPositionStyle = useAnimatedStyle(() => {
    if (!isTrackRendered) {
      return {};
    }

    return {
      left: translateX.value,
      top: translateY.value,
    }
  }, [isTrackRendered])

  // We render in two steps.
  // 1st render is to display the component normaly
  // 2nd render is to apply a version that is animated
  // we keep updating the the size of the "track" component so that the "apply" component can be positioned correctly
  // the track is not visible and is used to compute the translateXY for the animation. It's like a placeholder.
  return [
    isSizeMeasured && ( 
      <View
        key={"track"}
        ref={(ref: any) => {
          trackRef(ref);
          child.props.ref?.(ref);
        }}
        onLayout={trackPosition.onLayout}
        style={[
          ...positionStyle,
          sizeTracker.size,
          {
            opacity: 0,
            // position: 'relative',
            zIndex: -1,
            backgroundColor: 'transparent'
          }
        ]}
      />
    ),
    React.cloneElement(child, {
      key:"apply",
      ...child.props,
      ref: (ref: any) => {
        applyRef(ref);
        child.props.ref?.(ref);
      },
      onLayout: (event: LayoutChangeEvent) => {
        applyPosition?.onLayout?.(event);
        child.props.onLayout?.(event);
      },
      style: [
        { zIndex: 1 },
        ...child.props.style,
        animatedPositionStyle,
        isSizeMeasured && {
          position: 'absolute',
        }
      ]
    })
  ];
}
