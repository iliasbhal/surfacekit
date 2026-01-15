import React from "react";
import { View, Text } from '@/uikit';
import { Gesture } from "react-native-gesture-handler";

export const Scene: React.FC<{}> = (props) => {
  const [ isActive, setIsActive ] = React.useState(true);


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
        setIsActive((prev) => !prev);
      })}
    >
      <AnimatedList>
        <View
          key={`mode-${isActive}`}
          debugId={`debug-${isActive}`}
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
      </AnimatedList>
    </View>
  )
}

const AnimatedList : React.FC<React.PropsWithChildren<{}>> = (props) => {

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
        {props.children}
        <Square text={'-'} />
      </View>
    </View>
  )
}


let  i = 0;
const Square = (props: { text: string }) => {
  const [index] = React.useState(() => ++i);

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