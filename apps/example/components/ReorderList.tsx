import React from 'react';
import { View, Text } from '@/uikit';
import { Gesture } from 'react-native-gesture-handler';

export const Scene: React.FC<{}> = (props) => {
  const [removedItems, setRemovedItems] = React.useState<number[]>([]);
  // const [items, setItems] = React.useState<number[]>([1,2,3,4,5,6,7]);
  // const [items, setItems] = React.useState<number[]>([1,2]);


  const getReOrederedItems = () => {
    return Array.from({ length: 7 })
    .map((_, i) => i + 1)
    .sort((i) => {
      return Math.random() > 0.5 ? 1 : -1;
    })
  }
  const [items, setItems] = React.useState<number[]>([1]);

  return (
    <View
      display='flex'
      flexDirection='column'
      width="100%"
      height="100%"
      flex={1}
      itemsCenter
      justifyCenter
      gesture={
        Gesture.Tap().runOnJS(true).onEnd(() => {
          const next = getReOrederedItems();
          console.log('next',next);
          setItems(next);
        })
      }
    >
    <ReorderList 
      items={items.filter((i) => removedItems.indexOf(i) === -1)}
      onItemTap={(i) => {
        // const next = getReOrederedItems()
        // setItems(next);
        setRemovedItems((prev) => {
          return [...prev, i];
        });
      }}
    />
  </View>
  )
};

const ReorderList : React.FC<{ items: number[], onItemTap: (id: any) => void }> = (props) => {
  return (
    <View
      debugId="debug"
      display='flex'
      flexDirection='column'
      backgroundColor="green"
      width={100}
      gap="size4"
      overflowHidden
      padding="size4"
      transition={{ 
        height: true,
        width: true,
        children: true,
      }}
    >
      {props.items.map((i) => (
        <View
          key={i}
          debugId={`debug-${i}`}
          width={'100%'}
          height={75}
          backgroundColor="blue"
          // opacity={i == 1 ? 1 : 0}
          overflowVisible
          justifyCenter
          itemsCenter
          transition={{ 
            opacity: true,
            position: true,
          }}
          gesture={
            Gesture.Tap().runOnJS(true).onBegin(() => {
              props.onItemTap(i);
            })
          }            
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
  )
}