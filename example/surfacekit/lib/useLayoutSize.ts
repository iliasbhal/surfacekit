import React from "react";
import { AnimatedRef } from "react-native-reanimated";
import { measure } from 'react-native-reanimated';

export const useLayoutSize = (elementRef: AnimatedRef<any>) => {
  const [size, setSize] = React.useState<{ width: number, height: number }|null>(null);

  const onLayoutChange = (layout: { width: number, height: number }) =>{
    const hasChanged = size?.height !== layout.height
      || size?.width !== layout.width;

    if (!hasChanged) {
      return;
    }
    
    setSize(layout);
  }

  const onLayout = (event: { nativeEvent: { layout: any } }) => {
    const nextWidth = event.nativeEvent.layout.width;
    const nextHeight = event.nativeEvent.layout.height;
    onLayoutChange({
      width: nextWidth,
      height: nextHeight,
    });
  }

  React.useLayoutEffect(() => {
    const elementRect = measure(elementRef);
    if (!elementRect) return;

    onLayoutChange({
      width: elementRect?.width,
      height: elementRect.height,
    });
  })
  

  return {
    size,
    onLayout,
  }
}