import React from 'react';
import { View, Text } from '@/uikit';
import {  measure } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';

export default function ModalScreen() {
  const [ items, setItems ] = React.useState([0,1]);
  const [ count, setCount ] = React.useState(2);
  const [toggle, setToggle] = React.useState(false);

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
          const possibleValues = [1,2,].filter(i => i !== prev);
          const next = possibleValues[Math.floor(Math.random() * possibleValues.length)];
          return next;
        });

        setItems((prev) => {
          while (true) {
            const next = Array.from({ length: 3 }).map((_, i) => i).sort(() => Math.random() - 0.5)
            const hasChanged = JSON.stringify(prev) !== JSON.stringify(next);
            if (hasChanged) return next;
          }
        });

        setToggle((p) => !p)
      })}
    >
      <LayoutPlayground count={count} />
      <LayoutPlayground2 count={count} />
      <LayoutPlayground3 count={count} />
      <ReOrderPlayground items={items} />
      <TogglePlayground active={toggle} />
    </View>
  );
}

const TogglePlayground : React.FC<{ active: boolean }> = (props) => {
  return  (
    <View display='flex' flexDirection='column' flex={1} itemsCenter justifyCenter>
      <View backgroundColor='red' width={120} padding={10}>
        <View display="flex" flexDirection='row' justifyContent={props.active ? 'flex-start' : 'flex-end'} width={100}>
          <View 
            // key={props.active ? "toggle" : "toggle-inactive"}
            width={50}
            height={50}
            aaa={props}
            backgroundColor={"white"}
            transition={{
              position: true,
            }}
          />
        </View>
      </View>
    </View>
  )
}


const ReOrderPlayground : React.FC<{ items: number[] }> = (props) => {
  return (
    <View display='flex' flexDirection='column' flex={1}>
      <View
        display="flex"
        flexDirection="column"
        backgroundColor='green'
      >

        <View
          display="flex"
          // translateX={240}
          flexDirection="column"
          backgroundColor='orange'
          relative
          p={10}
          gap={10}
          height={200 + (props.items[0] * 50)}
          transition={{
            height: true,
          }}
          // height={200}
          flexWrap
          opacity={1}
          // opacity={.1}
          >
          {props.items.map((number) => (
            <View
              key={number}
              width={50}
              height={50 + (number * 50)} 
              backgroundColor="blue"
              transition={{ 
                position: true,
              }}
            >
              <Text fontFamily='Inter.Bold' fontSize={20} color="white">{number}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}


const LayoutPlayground : React.FC<{ count: number }> = (props) => {

  const [remove, setRemove] = React.useState([]);
  const [order, setOrder] = React.useState<number[]>([1,2,3,4,5,6,7]);

  return (
    <View display='flex' flexDirection='column' flex={1} itemsCenter
      gesture={Gesture.Tap().runOnJS(true).onBegin(() => {
        const next= Array.from({ length: 7 })
        .map((_, i) => i + 1)
        .sort((i) => {
          return Math.random() > 0.5 ? 1 : -1;
        });
        setOrder(next);
      })}
    >
      <View
        debugId="debug"
        display='flex'
        flexDirection='column'
        backgroundColor="green"
        width={100}
        gap="size4"
        padding="size4"
        transition={{ 
          height: true,
          width: true,
          children: true,
        }}
      >
        {order.map((i) => (
          remove.indexOf(i) === -1 && <View
            key={i}
            debugId={`debug-${i}`}
            width={'100%'}
            height={100}
            backgroundColor="blue"
            // opacity={i == 1 ? 1 : 0}
            overflowVisible
            justifyCenter
            itemsCenter
            transition={{ 
              opacity: true,
              position: true,
            }}
            gesture={Gesture.Tap().runOnJS(true).onBegin(() => {
              setRemove((prev) => [...prev, i]);
            })}            
            overrides={(state) => {
              return [
                // state.initial && { opacity: 1 },
                state.exiting && { opacity: 0, detach: true },
              ];
            }}
          >
              <Text fontFamily='Inter.ExtraBold' fontSize={33} color="white">{i}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}



const LayoutPlayground2 : React.FC<{ count: number }> = (props) => {

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
              position: true,
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


const LayoutPlayground3 : React.FC<{ count: number }> = (props) => {

  return (
    <View display='flex' flexDirection='column' flex={1} itemsCenter>
      <View
        debugId="debug"
        display='flex'
        flexDirection='column'
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
              position: true,
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
