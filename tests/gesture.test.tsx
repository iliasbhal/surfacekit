import React from 'react';
import * as RNTesting from '@testing-library/react-native';
import { View } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { createSurfaced } from '../src';
import * as themes from './themes';

type TestTheme = typeof themes[keyof typeof themes];
const surfaced = createSurfaced<TestTheme>();

describe('Gesture Surface', () => {
  
  it('should be able to setup onTap gestures', () => {
    const Flex = surfaced(View).with((tokens) => ({
      variants: {
        magic: {
          true: {
            backgroundColor: 'red',
          }
        },
      },
    }));

    Gesture.Exclusive
    Gesture.Simultaneous
    Gesture.Race

    const Tree = (
      <surfaced.Provider theme={themes.lightTheme}> 
      <Flex
        overrides={(Props) => [
          { whileHover: <Props magic={true} /> },
          { whilePressed: <Props magic={true} /> },
        ]}
        gesture={
          Gesture.Hover()
            .onBegin(() => { console.log('hover')})
            .onEnd(() => { console.log('hover end')})
            .onUpdate(() => { console.log('hover update')})
            .onFinalize(() => { console.log('hover finalize')})
            .onUpdate((event) => { console.log('hover change', event)})
        }
      />
              <Flex
        overrides={(Props) => [
          { whileHover: <Props magic={true} /> },
          { whilePressed: <Props magic={true} /> },
        ]}
        gesture={
          Gesture.Hover()
            .onBegin(() => { console.log('hover')})
            .onEnd(() => { console.log('hover end')})
            .onUpdate(() => { console.log('hover update')})
            .onFinalize(() => { console.log('hover finalize')})
            .onUpdate((event) => { console.log('hover change', event)})
        }
      />
              <Flex
        overrides={(Props) => [
          { whileHover: <Props magic={true} /> },
          { whilePressed: <Props magic={true} /> },
        ]}
        gesture={
          Gesture.Hover()
            .onBegin(() => { console.log('hover')})
            .onEnd(() => { console.log('hover end')})
            .onUpdate(() => { console.log('hover update')})
            .onFinalize(() => { console.log('hover finalize')})
            .onUpdate((event) => { console.log('hover change', event)})
        }
      />
    </surfaced.Provider>
    )

    const context = RNTesting.render(Tree);
    context.rerender(Tree);
    // console.log();


  });
})



// finance@insertframe.io

// Name: Ilba Software Pte. Ltd 
// Account Number: 8311118855 Routing number: 026073150 Swift/BIC: CMFGUS33
// Bank: Community Federal Savings Bank, 89-16 Jamaica Ave, Woodhaven, NY, 11421, United States


// Here are the USD account details for Ilba Software Pte. Ltd. on Wise.
// If you're sending money from a bank in the US, you can use these details to make a domestic transfer. If you're sending from somewhere else, make an international Swift transfer.

// ---
// Name: Ilba Software Pte. Ltd.

// Account number: 8311118855

// Account type: Checking
// Use when sending money from the US

// Routing number (for wire and ACH): 026073150
// Use when sending money from the US

// Swift/BIC: CMFGUS33
// Use when sending money from outside the US

// Bank name and address: Community Federal Savings Bank, 89-16 Jamaica Ave, Woodhaven, NY, 11421, United States
// ---