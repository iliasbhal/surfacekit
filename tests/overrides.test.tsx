import React from 'react';
import * as RNTesting from '@testing-library/react-native';
import { View } from 'react-native';
import { createSurfaced } from '../src';
import * as themes from './themes';

type TestTheme = typeof themes[keyof typeof themes];
const surfaced = createSurfaced<TestTheme>();

describe('Surface Overrides', () => {
  const Flex = surfaced(View).with((tokens) => ({
    variants: {
      magic: {
        true: {
          backgroundColor: 'red',
        }
      },
      paddingTop: surfaced.any({ 
        attribute: 'paddingTop',
        number: true, 
        percentage: true,
        tokens: tokens.spacing,
      }),
      width: surfaced.any({ 
        attribute: 'width',
        number: true, 
        percentage: true,
        tokens: tokens.spacing,
      }),
      height: surfaced.any({ 
        attribute: 'height',
        number: true, 
        percentage: true,
        tokens: tokens.spacing,
      }),
    },
  }));

  it('can override variant using provided override', () => {
    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Flex 
          width={100} 
          height={"space3"}
          with={{ width: 'space3' }}
        />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree.props.style).toEqual({
      width: themes.lightTheme.spacing.space3,
      height: themes.lightTheme.spacing.space3
    });
  })

  it('can override variant using provided override (mapped to falsy)', () => {
    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Flex 
          width={100} 
          height={"space3"}
          with={{ width: 'space0' }}
        />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree.props.style).toEqual({
      width: 0,
      height: themes.lightTheme.spacing.space3
    });
  })


  it('can override style using provided style', () => {
    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Flex 
          width={100} 
          height={"space3"}
          with={{ style:{ width: 50 } }}
        />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree.props.style).toEqual([{
      width: 100,
      height: themes.lightTheme.spacing.space3
    }, {
      width: 50,
    }]);
  })

  it('can override props using an object', () => {
    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Flex 
          width={100} 
          height={"space3"}
          with={{ style: { paddingTop: 10 } }}
        />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree.props.style).toEqual([{
      width: 100,
      height: themes.lightTheme.spacing.space3
    }, {
      paddingTop: 10,
    }]);
  })

  it('can override props using an array', () => {
    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Flex 
          width={100} 
          height={"space3"}
          with={[
            { style: { paddingTop: 10 } },
            { height: 33 },
            { paddingTop: 33 },
          ]}
        />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree.props.style).toEqual([{
      width: 100,
      height: 33,
      paddingTop: 33,
    }, {
      paddingTop: 10,
    }]);
  })

  it('can override props using the override prop', () => {
    const Flex = surfaced(View).with((tokens) => ({
      variants: {
        magic: {
          true: {
            backgroundColor: 'red',
          }
        },
        width: surfaced.any({ 
          attribute: 'width',
          number: true, 
          percentage: true,
          tokens: tokens.spacing,
        }),
        height: surfaced.any({ 
          attribute: 'height',
          number: true, 
          percentage: true,
          tokens: tokens.spacing,
        }),
      },
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Flex 
          width={100} 
          height={"space3"}
          
          overrides={(Props) => [
            <Props magic  width="space0" />,
            false && <Props height="space33" />,
            // <Props magic={false} />,
            { style: { paddingTop: 10 } },
          ]}
        />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree.props.style).toEqual([{
      backgroundColor: 'red',
      width: 0,
      height: 6,
      // height: themes.lightTheme.spacing.space33,
    }, {
      paddingTop: 10,
    }]);
  })

  it('can override props using the override prop', () => {
    const Flex = surfaced(View).with((tokens) => ({
      variants: {
        magic: {
          true: {
            backgroundColor: 'red',
          }
        },
        width: surfaced.any({ 
          attribute: 'width',
          number: true, 
          percentage: true,
          tokens: tokens.spacing,
        }),
        height: surfaced.any({ 
          attribute: 'height',
          number: true, 
          percentage: true,
          tokens: tokens.spacing,
        }),
      },
    }));
    
    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Flex 
          width={100} 
          height={"space3"}
          
          overrides={(Props) => [
            <Props magic width="space0" />,
            <Props magic={false} />,
          ]}
        />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree.props.style).toEqual({
      height: themes.lightTheme.spacing.space3,
      width: 0,
    });
  });

  it('can override props using the override prop', () => {
    const Flex = surfaced(View).with((tokens) => ({
      variants: {
        colored: {
          'hot': {
            backgroundColor: 'red',
            borderColor: 'red',
            borderTopWidth: 10,
          },
          'cold': {
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderBottomWidth: 20,
          },
        },
      },
    }));
    
    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Flex 
          
          overrides={(Props) => [
            <Props colored="hot" />,
            <Props colored="cold" />,
          ]}
        />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree.props.style).toEqual({
      backgroundColor: 'blue',
      borderColor: 'blue',
      borderBottomWidth: 20,
    });
  })

  it.only('correctly transforms with overrides', () => {
    const transform = (style: any, key: any, value: any) => {
      if (!style.transform) style.transform = [];
      style.transform.push({ [key]: value });
    };

    const Flex = surfaced(View).with((tokens) => ({
      variants: {
        rotateZ: surfaced.any({ custom: transform, attribute: 'rotateZ', number: true, angle: true }),
        translateX: surfaced.any({ custom: transform, attribute: 'translateX', number: true }),
        scale: surfaced.any({ custom: transform, attribute: 'scale', number: true, }),
        skewX: surfaced.any({ custom: transform, attribute: 'skewX', number: true, }),
      },
    }));
    
    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Flex 
          rotateZ={'20deg'}
          overrides={(Props) => [
            <Props rotateZ={'25deg'} translateX={100} />,
            <Props scale={2} />,
            <Props rotateZ={'360deg'} skewX={10} />,
          ]}
        />
      </surfaced.Provider>
    );

    const tree = component.toJSON();
    const lastTransofrm = tree.props.style.findLast((s: any) => s.transform);
    expect(lastTransofrm.transform).toEqual([
      { rotateZ: '360deg' },
      { translateX: 100 },
      { scale: 2 },
      { skewX: 10 },
    ]);
  })
})

