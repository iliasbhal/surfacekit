import React from 'react';
import { measure } from 'react-native-reanimated';

interface MeasuredDimensions {
  real: ReturnType<typeof measure>,
  current: ReturnType<typeof measure>,
}

export const AnimateLayout : React.FC<React.PropsWithChildren> = (props) => {
  const childCount = React.Children.count(props.children);
  if (childCount !== 1) throw new Error('AnimateLayout can only have one child');


  const [] = React.useRef<ReturnType<typeof measure>>({});
  const [layout, setLayout] = React.useState<{ width: number; height: number } | null>(null);

  return React.Children.map(props.children, (child) => {


    return [
      // React.cloneElement(child, {
      //   ...child.props,
      // }),

      React.cloneElement(child, {
        ...child.props,
        onLayout: (event) => {
          const realLayout = event.nativeEvent.layout;
          child.props.onLayout?.(event);
        },
        style: [
          ...child.props.style,
          { opacity: 0 }
        ]
      }),

      React.cloneElement(child, {
        ...child.props,
        style: [
          ...child.props.style,
          { 
            opacity: 1,
            position: 'absolute',
          }
        ]
      }),
    ];
  })
};

// const isAnimatingSize = originalProps.transition?.['height'] || originalProps.transition?.['width'];
// const isLayoutAnimated = !!originalProps.children && isAnimatingSize;
// const isRenderFromOutside = useIsRenderFromOutside(originalProps);
// const isRenderingRawLayout = isLayoutAnimated && isRenderFromOutside;
// const measurments = React.useRef<ReturnType<typeof measure>[]>([]);
// const [layoutAnimationStep, setLayoutAnimationStep] = React.useState<any>(0);
// const [layoutAnimation, setLayoutAnimation] = React.useState<any>(null);
// const heightSharedValue = useSharedValue<number>(0);
// if (isLayoutAnimated) {
//   React.useLayoutEffect(() => {
//     console.log('LAYOUT EFFECT', { isRenderFromOutside, isLayoutAnimated, layoutAnimationStep })
//     if (isRenderFromOutside) {
//       const compRect = measure(compRef);
//       measurments.current.push(compRect)
//       setLayoutAnimationStep(0);
//       setLayoutAnimation(null);
//       return;
//     }
//   })

//   React.useLayoutEffect(() => {
//     if (layoutAnimationStep === 1) return;
    

//     const [beforeRect, afterRect] = measurments.current.slice(-2);
//     const heightChanged = beforeRect && afterRect && beforeRect.height !== afterRect.height;
//     if (afterRect) {

//       console.log('heightChanged',heightChanged, beforeRect, afterRect);
//       heightSharedValue.value = DefaultAnimations.Natural(afterRect.height)
//       setLayoutAnimation({
//         height: heightSharedValue.value,
//       });
//     }
//       // animateProperty('height', beforeRect.height, afterRect.height);
//     setLayoutAnimationStep(1);
//     // console.log('ON RERENDER', measurments);
//   }); 
// }

// if (isLayoutAnimated) {
//   console.log('ANIMATED HEIGHT', { isLayoutAnimated, isRenderingRawLayout, layoutAnimationStep, layoutAnimation });
//   if (!isRenderingRawLayout && layoutAnimationStep === 1) {
//     delete style.height  ;
//     style.height = layoutAnimation?.height;
//   }
// }
