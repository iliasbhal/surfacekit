import React, { useEffect } from 'react';
import { View, Text } from '@/uikit';
import {  measure, useAnimatedRef } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { AnimatePresence } from '@/surfacekit';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
import { LayoutChangeEvent } from 'react-native';

type MeasuredDimensions = Exclude<Partial<ReturnType<typeof measure>>, null> & Partial<{ translateX: number, translateY: number }>

export default function ModalScreen() {
  const [ items, setItems ] = React.useState([0,1,2]);
  const [ count, setCount ] = React.useState(1);

  return (
    <View
      display='flex'
      flexDirection='row'
      gap={30}
      // width="100%"
      height="100%"
      // backgroundColor="red"
      justifyContent="center"
      alignItems="center"
      gesture={Gesture.Tap().runOnJS(true).onBegin(() => {
        setCount((prev) => {
          const possibleValues = [1, 2,3,4,5].filter(i => i !== prev);
          const next = possibleValues[Math.floor(Math.random() * possibleValues.length)];
          return next;
        });

        setItems(() => {
          return Array.from({ length: 3 }).map((_, i) => i).sort(() => Math.random() - 0.5);
        })
      })}
    >
      <LayoutPlayground count={count} />
      <ReOrderPlayground items={items} />
      <TogglePlayground count={count} />
    </View>
  );
}

const useTrackLayout = () => {
  const [targetMeasure, setTargetMeasure] = React.useState<MeasuredDimensions | null>({})
  const trackRef = useAnimatedRef<any>();
  const applyRef = useAnimatedRef<any>();
  const translateXRef = React.useRef<number[]>([]);
  const translateYRef = React.useRef<number[]>([]);
  const measureRef = React.useRef<MeasuredDimensions | null>({});
  const onLayout =   () => {
    const trackMeasure = measure(trackRef)!;
    const applyMeasure = measure(applyRef)!;

    const canCompute = trackMeasure && applyMeasure;
    if (!canCompute) return;

    const anchorChangedSize = measureRef.current?.width !== trackMeasure.width 
      || measureRef.current?.height !== trackMeasure.height;

    const anchorMovedX = measureRef.current?.pageX !== trackMeasure.pageX
    const anchorMovedY =  measureRef.current?.pageY !== trackMeasure.pageY;
    const anchorMoved = anchorMovedX || anchorMovedY;
    const hasLayoutChanged = anchorChangedSize || anchorMoved;
    
    if (!hasLayoutChanged) return;
    measureRef.current = trackMeasure;

    const xDiff = trackMeasure.pageX - applyMeasure.pageX;
    translateXRef.current.push(xDiff);
    const allTranslateX = translateXRef.current.reduce((acc, curr) => acc + curr, 0);
    translateXRef.current = [allTranslateX]
    
    const yDiff = trackMeasure.pageY - applyMeasure.pageY;
    translateYRef.current.push(yDiff);
    const allTranslateY = translateYRef.current.reduce((acc, curr) => acc + curr, 0);
    translateYRef.current = [allTranslateY]

    setTargetMeasure({
      width: trackMeasure.width,
      height: trackMeasure.height,
      pageX: trackMeasure.pageX,
      pageY: trackMeasure.pageY,
      translateX: allTranslateX,
      translateY: allTranslateY,
    });
  }
  
  React.useLayoutEffect(onLayout);

  return {
    trackRef,
    applyRef,
    onTrackLayout: onLayout,
    targetMeasure,
  }
}

const TogglePlayground : React.FC<{ count: number }> = (props) => {
  
  const isEven = props.count % 2 === 0;

  return  (
    <View display='flex' flexDirection='column' flex={1}>
      <View display="flex" flexDirection='row' justifyContent={isEven ? 'flex-start' : 'flex-end'} width={200}  backgroundColor='red'>
        <AnimatePosition key="toggle">
          <View 
            width={50}
            height={50}
            margin={10}
            opacity={1}
            backgroundColor="white"
          />
        </AnimatePosition>
      </View>
    </View>
  )
}


const ReOrderPlayground : React.FC<{ items: number[] }> = (props) => {
  const layout : any = {};
  props.items.forEach((i) => {
    layout[i] = useTrackLayout();
  });

  return (
    <View display='flex' flexDirection='column' flex={1}>
      <View
        display="flex"
        flexDirection="column"
        backgroundColor='green'
        paddingTop={props.items[0] * 50}
        transition={{
          paddingTop: true,
        }}
      >

        <View
          display="flex"
          // translateX={240}
          flexDirection="column"
          backgroundColor='orange'
          relative
          p={10}
          gap={10}
          opacity={1}
          // opacity={.1}
          >
          {props.items.map((number) => (
            <AnimatePosition key={number}>
              <View width={50} height={50 + (number * 50)} backgroundColor="blue" opacity={.4}>
                <Text fontFamily='Inter.Bold' fontSize={20} color="white">{number}</Text>
              </View>
            </AnimatePosition>
          ))}
        </View>
      </View>
    </View>
  )
}


const LayoutPlayground : React.FC<{ count: number }> = (props) => {
  return (
    <View display='flex' flexDirection='column' flex={1}>
      <AnimateLayout>
        <View display='flex' flexDirection='column'>
          <AnimatePresence mode='sync' >
            {Array.from({ length: props.count }).map((_, i) => (
              <View
                key={i}
                backgroundColor="blue"
                width={100}
                height={100}
                justifyCenter
                itemsCenter
                // onLayout={onLayout}
                transition={{ 
                  opacity: true,
                  // transform: true, 
                  height: true,
                }}
                
                overrides={(state) => [
                  state.initial && { opacity: 0 },
                  state.entered && { opacity: 1 },
                  state.exiting && { opacity: 0, height: 0 },
                ]}
              >
                <Text fontFamily='Inter.ExtraBold' fontSize={33} color="white">{i}</Text>
              </View>
            ))}
          </AnimatePresence>
        </View>
      </AnimateLayout>
    </View>
  )
}

const AnimatePosition : React.FC<React.PropsWithChildren> = (props) => {
  const layout = useTrackLayout();
  
  const [size, setSize] = React.useState<{ width: number, height: number }|null>(null);
  React.useLayoutEffect(() => {
    const nodeRect = measure(layout.trackRef)!;
    setSize({
      width: nodeRect.width,
      height: nodeRect.height,
    });
  }, []);

  console.log('size',size);
  const onLayout = (event: { nativeEvent: { layout: any } }) => {
    const nextSize = {
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    };

    if (!size) {
      return setSize(nextSize);
    }

    const hasChanged = size.height !== nextSize.height 
      || size.width !== nextSize.width;

    if (hasChanged) {
      return setSize(nextSize);
    }
  }

  if (!size) {
    return (
      <React.Fragment>
        <View
          key={"track"}
          ref={layout.applyRef}
          opacity={0}
          absolute
          top={0}
          left={0}
          zIndex={1000}
          backgroundColor="black"
        />
        <View
          key={"apply"}
          ref={layout.trackRef}
          onLayout={onLayout}
          translateX={0}
          translateY={0}
          transition={{ 
            translateY: true,
            translateX: true,
          }}
        >
          {props.children}
        </View>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <View
        key={"track"}
        ref={layout.trackRef}
        onLayout={layout.onTrackLayout}
        opacity={0.5}
        relative
        backgroundColor="black"
        zIndex={1000}

        {...size}
      />
      <View
        key={"apply2"}
        ref={layout.applyRef}
        onLayout={onLayout}
        opacity={1}
        absolute
        top={0}
        left={0}
        translateX={layout.targetMeasure?.translateX}
        translateY={layout.targetMeasure?.translateY}
        transition={{ 
          translateY: true,
          translateX: true,
        }}
      >
        {props.children}
      </View>
    </React.Fragment>
  )
}

const AnimateLayout : React.FC<React.PropsWithChildren> = (props) => {
  const trackLayout = useTrackLayout();

  return (
    <View
      ref={trackLayout.applyRef}
      width={trackLayout.targetMeasure?.width}
      height={trackLayout.targetMeasure?.height}
      overflowHidden
      relative
      transition={{ 
        height: true,
        width: true,
      }}
    >
      <View
        absolute
        ref={trackLayout.trackRef}
        onLayout={trackLayout.onTrackLayout}
      >
        {props.children}
      </View>
    </View>
  )
}