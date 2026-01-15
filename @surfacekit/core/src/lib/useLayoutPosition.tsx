import React from 'react';
import { AnimatedRef, measure, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { LayoutChangeEvent } from 'react-native';

type Measurment = Exclude<ReturnType<typeof measure> | LayoutChangeEvent['nativeEvent']['layout'], null>
export const useTrackPosition = (trackRef?: AnimatedRef<any>, debugId?: string) => {
  const [position, setPosition] = React.useState<Measurment>({} as any)

  const onLayout = (event?: LayoutChangeEvent) => {
    const trackMeasure = event?.nativeEvent?.layout
    const canCompute = !!(trackMeasure);
    if (!canCompute) return;

    const anchorMovedX = position?.x !== trackMeasure.x
    const anchorMovedY =  position?.y !== trackMeasure.y;
    const anchorLayoutChanged = anchorMovedX || anchorMovedY;
    const hasLayoutChanged = !!(anchorLayoutChanged);
    if (!hasLayoutChanged) return;

    setPosition(trackMeasure);
  }

  React.useLayoutEffect(() => {
    if(!trackRef) return;

    const measured = measure(trackRef!)
    if (!measured) return;

    onLayout({
      nativeEvent: {
        layout: measured,
      },
    })
  });

  return {
    onLayout,
    position,
  };
}

export const useAnimatedPosition = (positionRef?: AnimatedRef<any>, debugId?: string) => {
  const [initialPosition, setInitialPosition] = React.useState<Measurment>({} as any);

  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const left = useSharedValue(0);
  const top = useSharedValue(0);

  const onLayout = (event?: LayoutChangeEvent) => {
    const trackMeasure = event?.nativeEvent?.layout
    const canCompute = !!(trackMeasure);
    if (!canCompute) return;

    const target = {
      width: Math.floor(trackMeasure.width),
      height: Math.floor(trackMeasure.height),
      x: Math.floor(trackMeasure.x),
      y: Math.floor(trackMeasure.y),
    }

    width.value = target.width;
    height.value = target.height;
    left.value = target.x;
    top.value = target.y;

    if (initialPosition) return;

    // console.log('RERENDER FROM TRACK POSITION', debugId);
    setInitialPosition(target);
  }

  React.useLayoutEffect(() => {
    if(!positionRef) return;

    const measured = measure(positionRef!)
    if (!measured) return;

    onLayout({
      nativeEvent: {
        layout: measured,
      },
    });
  });

  return {
    initialPosition,
    onLayout,
    animated: {
      width: width,
      height: height,
      left: left,
      top: top,
    },
  }
}