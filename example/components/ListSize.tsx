import React from "react";
import { View, Text } from '@/uikit';
import { Gesture } from "react-native-gesture-handler";

export const Scene: React.FC<{}> = (props) => {
  const [ count, setCount ] = React.useState(2);


  return (
    <View
      display='flex'
      flexDirection='row'
      gap={30}
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      gesture={Gesture.Tap().runOnJS(true).onBegin(() => {
        setCount((prev) => {
          const possibleValues = [1,2,].filter(i => i !== prev);
          const next = possibleValues[Math.floor(Math.random() * possibleValues.length)];
          return next;
        });
      })}
    >
    <AnimatedList 
      count={count}
    />
    </View>
  )
}

const AnimatedList : React.FC<{ count: number }> = (props) => {

  return (
    <View display='flex' flexDirection='column' flex={1} itemsCenter>
      <View
        debugId="debug"
        display='flex'
        flexDirection='row'
        backgroundColor="green"
        gap="size4"
        padding="size4"
        transition={{ 
          height: true,
          width: true,
          children: true,
        }}
      >
        {Array.from({ length: props.count }).map((_, i) => (
          <View
            key={i}
            debugId={`debug-${i}`}
            transition={{ 
              opacity: true,
              // position: true,
            }}            
            overrides={(state) => {
              return [
                // state.initial && { opacity: 1 },
                state.exiting && { opacity: 0, detach: true },
              ];
            }}
          >
            <View
              height={100}
              width={100}
              overflowVisible
              justifyCenter
              itemsCenter
              
              backgroundColor="blue"
            >
              <Text fontFamily='Inter.ExtraBold' fontSize={33} color="white">{i}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}