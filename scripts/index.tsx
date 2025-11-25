import React from 'react';
import * as RNTesting from '@testing-library/react-native';
import { createSurfaced} from "../src";

import * as themes from './theme';
export * as themes from './theme';

type Theme = typeof themes[keyof typeof themes];

export const surfaced = createSurfaced<Theme>();
const View = (props: any) => {
  return <div {...props} />
}


const Flex = surfaced(View).with(({ theme, attrs }) => ({
  variants: {
    danger: {
      true: {
        backgroundColor: theme.colors.primary100,
      }
    },
  },
}));

const component = RNTesting.render(
  <surfaced.Provider theme={themes.dark}> 
    <Flex danger={true} />
    <Flex danger={false} />
  </surfaced.Provider>
);

const tree = component.toJSON();
console.log('tree[0].props.style',tree[0].props.style);

// expect(tree[0].props.style).toMatchObject({
//   backgroundColor: themes.dark.colors.primary100,
// });

// expect(tree[1].props.style).toBeUndefined();