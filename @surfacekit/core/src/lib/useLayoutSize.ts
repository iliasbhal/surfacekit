import React from "react";
import { measure, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

export const useAnimatedLayoutSize = (elementRef?: any, debugId?: string) => {
  const [initialSize, setInitialSize] = React.useState<{ width: number, height: number }|null>(null);
  
  const sizeRef = React.useRef<{ width: number, height: number }>({ width: 0, height: 0 });
  const width = useSharedValue(sizeRef.current.width);
  const height = useSharedValue(sizeRef.current.height); 

  const onLayout = (event: { nativeEvent: { layout: any } }) => {
    const nextWidth = Math.round(event.nativeEvent.layout.width);
    const nextHeight = Math.round(event.nativeEvent.layout.height);

    const hasChanged = sizeRef.current.width !== nextWidth
      || sizeRef.current.height !== nextHeight;
    if (!hasChanged) return;

    sizeRef.current.width = nextWidth;
    sizeRef.current.height = nextHeight;
    width.value = nextWidth;
    height.value = nextHeight;

    if (initialSize) return;

    setInitialSize({
      width: nextWidth,
      height: nextHeight,
    });
  }  
  
  React.useLayoutEffect(() => {
    if (!elementRef) return;

    const elementRect = measure(elementRef);
    if (!elementRect) return;

    onLayout({
      nativeEvent: {
        layout: {
          width: elementRect?.width,
          height: elementRect.height,
        }
      }
    });
  })

  const animatedSizeStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
    }
  });

  return {
    ui: {
      width,
      height,
    },
    style: [
      initialSize,
      initialSize && animatedSizeStyle
    ],
    initialSize,
    animatedSizeStyle,
    onLayout,
  }
}