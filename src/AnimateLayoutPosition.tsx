import React, { RefObject } from 'react';
import { AnimatedRef, interpolate, measure, useAnimatedRef, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useLayoutSize } from './lib/useLayoutSize';
import { LayoutChangeEvent, findNodeHandle } from 'react-native';
import { animateToValue } from './lib/defaultAnimations';

type Measurment = Exclude<ReturnType<typeof measure>, null>
const useTrackPosition = (trackRef: AnimatedRef<any>, debugId?: string) => {
  const [position, setPosition] = React.useState<Measurment>({} as any)

  const onLayout = (event?: LayoutChangeEvent) => {
    const trackMeasure = measure(trackRef)!;
    const canCompute = !!(trackMeasure);
    if (!canCompute) return;

    const anchorMovedX = position?.x !== trackMeasure.x
    const anchorMovedY =  position?.y !== trackMeasure.y;
    const anchorLayoutChanged = anchorMovedX || anchorMovedY;
    const hasLayoutChanged = !!(anchorLayoutChanged);
    if (!hasLayoutChanged) return;

    setPosition(trackMeasure);
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

  const child = React.Children.only(props.children) as any;

  const anchor : Record<string, any> = {};
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

    if (style.position) anchor.position = style.position;
    if (style.top) anchor.top = style.top;
    if (style.left) anchor.left = style.left;
    if (style.right) anchor.right = style.right;
    if (style.bottom) anchor.bottom = style.bottom;

    positionAttrs.forEach(attr => {
      // Only copy if the value is defined (for margins)
      if (style[attr] !== undefined) {
        positionStyle[attr] = style[attr];
      }
    });

    return positionStyle;
  });

  // When first animating, we should just set the new value,
  // and then animate on subsequent updates.
  const left = useSharedValue(0);
  const top = useSharedValue(0);
  const right = useSharedValue(0);
  const bottom = useSharedValue(0);
  const currentTranslateRef = React.useRef({ x: 0, y: 0 });

  React.useLayoutEffect(() => {
    const nextPosition = !isTrackRendered 
      ? applyPosition.position
      : trackPosition.position;

    const nextLeft = nextPosition?.x ?? 0;
    const nextTop = nextPosition?.y ?? 0;
    const nextRight = nextLeft + nextPosition?.width;
    const nextBottom = nextTop + nextPosition?.height;

    const isXChanged = currentTranslateRef.current.x !== nextLeft;
    const isYChanged = currentTranslateRef.current.y !== nextTop;

    if (!isTrackRendered) {
      if (isXChanged || isYChanged) {
        left.value = nextLeft;
        top.value = nextTop;
        right.value = nextRight;
        bottom.value = nextBottom;

        currentTranslateRef.current.x = nextLeft;
        currentTranslateRef.current.y = nextTop;
      }

      return
    }

    if (isXChanged || isYChanged) {
      left.value = animateToValue(nextLeft, props.transition);
      top.value = animateToValue(nextTop, props.transition);
      right.value = animateToValue(nextRight, props.transition);
      bottom.value = animateToValue(nextBottom, props.transition);
      currentTranslateRef.current.x = nextLeft;
      currentTranslateRef.current.y = nextTop;
    }
  });

  const animatedPositionStyle = useAnimatedStyle(() => {
    if (!isTrackRendered) {
      return {};
    }

    const trackPos = trackPosition.position;
    const position : Record<string, number | 'unset'> = {};

    // We need to compute the position of the child based on the anchor and the position of the track
    // To ensure that when animating width, the anchor stays in place.

    if (anchor.right) {
      position.left = 'unset';
      position.right = (trackPos.x + trackPos.width - right.value) + anchor.right;
    } else {
      position.right = 'unset';
      position.left = left.value;
    }

    if (anchor.bottom) {
      position.top = 'unset';
      position.bottom = (trackPos.y + trackPos.height - bottom.value) + anchor.bottom;
    } else {
      position.top = top.value;
      position.bottom = 'unset';
    }

    return position;
  })


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
        // {opacity: .5},
        isSizeMeasured && {
          position: 'absolute',
        }
      ]
    })
  ];
}
