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
      gesture={Gesture.Tap().runOnJS(true).onStart(() => {
        console.log('GESTURE TAP');
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
        overflowHidden
        transition={{ 
          height: true,
          width: true,
          children: true,
        }}
      >
        <Square text={'-'} />
        {Array.from({ length: props.count }).map((_, i) => i).reverse().map((i) => (
          <View
            key={i}
            debugId={`debug-${i}`}
            transition={{ 
              opacity: true,
              position: true,
            }}            
            opacity={1}
            overrides={(state) => {
              return [
                state.initial && { 
                  opacity: 0 ,
                },
                // state. && { opacity: 0 },
                state.entering && { 
                  backgroundColor: 'blue',
                },
                state.entered && { 
                  backgroundColor: 'black',
                },
                state.exiting && { 
                  backgroundColor: 'red',
                  opacity: 0,
                  detach: true 
                },
              ];
            }}
          >

            <Square text={i.toString()} />
          </View>
        ))}
      </View>
    </View>
  )
}


let  i = 0;
const Square = (props: { text: string }) => {

  const [index] = React.useState(() => {
    return ++i
  });

  return (
    <View
      height={100}
      width={100}
      overflowVisible
      justifyCenter
      itemsCenter
      
      // backgroundColor="blue"
    >
      <Text fontFamily='Inter.ExtraBold' fontSize={33} color="white">{props.text} ({ index })</Text>
    </View>
  )
}