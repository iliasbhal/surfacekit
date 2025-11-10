import React from 'react';
import { Inter_300Light, Inter_500Medium } from '@expo-google-fonts/inter';
import * as RNTesting from '@testing-library/react-native';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { createSurfaced } from '../src';
import * as themes from './themes';

type TestTheme = typeof themes[keyof typeof themes];
const surfaced = createSurfaced<TestTheme>();

jest.mock('expo-font', () => ({
  useFonts: jest.fn().mockReturnValue([true, null]),
}))

describe('Surface', () => {
  it('throw if component is not wrapped in a ThemeProvider', () => {
    const Flex = surfaced(View).with((tokens) => ({
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    }));

    const renderWithoutContext = () => RNTesting.render(
      <Flex />
    );

    expect(renderWithoutContext).toThrow();
  })

  it('should not throw if component is wrapped in a ThemeProvider', () => {
    const Flex = surfaced(View).with(() => ({
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    }));

    const renderWithoutContext = () => RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}> 
        <Flex />
      </surfaced.Provider>
    );

    expect(renderWithoutContext).not.toThrow();
  })

  it('should populate styles using provided static styles', () => {
    const Flex = surfaced(View).with(() => ({
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}> 
        <Flex />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree.props.style).toMatchObject({
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    });
  });

  it('should have access to the current theme', () => {
    const Flex = surfaced(View).with((theme) => ({
      backgroundColor: theme.surfaces.surface0
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}> 
        <Flex />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree.props.style).toMatchObject({
      backgroundColor: themes.lightTheme.surfaces.surface0,
    });
  });

  it('can accept a theme of any shape', () => {

    type GroteskThemeShape = {
      give: { 
        me: {
          a: {
            color: (temp: 'hot' | 'cold') => string
          }
        }
      }
    };

    const theme: GroteskThemeShape = {
      give: {
        me: {
          a: {
            color: (temp) => temp === 'hot' ? 'red' : 'blue',
          }
        }
      }
    }

    const surfaced = createSurfaced<GroteskThemeShape>();
    const Flex = surfaced(View).with((tokens) => ({
      backgroundColor: tokens.give.me.a.color('hot'),
      borderColor: tokens.give.me.a.color('cold'),
    }))


    const component = RNTesting.render(
      <surfaced.Provider theme={theme}> 
        <Flex />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree.props.style).toMatchObject({
      backgroundColor: 'red',
      borderColor: 'blue',
    });
  });

  it('can define boolean variants ( only true defined )', () => {
    const Flex = surfaced(View).with((theme) => ({
      variants: {
        danger: {
          true: {
            backgroundColor: theme.colors.red[300],
          }
        },
      },
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}> 
        <Flex danger={true} />
        <Flex danger={false} />
      </surfaced.Provider>
    );
  
    const tree = component.toJSON();

    expect(tree[0].props.style).toMatchObject({
      backgroundColor: themes.lightTheme.colors.red[300],
    });

    expect(tree[1].props.style).toBeUndefined();
  });

  it('can define boolean variants ( only false defined )', () => {
    const Flex = surfaced(View).with((theme) => ({
      variants: {
        danger: {
          false: {
            backgroundColor: theme.colors.red[300],
          }
        },
      },
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}> 
        <Flex danger={true} />
        <Flex danger={false} />
      </surfaced.Provider>
    );
  
    const tree = component.toJSON();

    expect(tree[0].props.style).toBeUndefined();

    expect(tree[1].props.style).toMatchObject({
      backgroundColor: themes.lightTheme.colors.red[300],
    });
  });

  it('can define style variants', () => {
    const Flex = surfaced(View).with((theme) => ({
      variants: {
        danger: {
          true: {
            backgroundColor: theme.colors.red[300],
          }
        },
        success: {
          true: {
            backgroundColor: theme.colors.green[300],
          }
        }
      },
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}> 
        <Flex danger={true} />
        <Flex success={true} />
      </surfaced.Provider>
    );
  
    const tree = component.toJSON();

    expect(tree[0].props.style).toMatchObject({
      backgroundColor: themes.lightTheme.colors.red[300],
    });

    expect(tree[1].props.style).toMatchObject({
      backgroundColor: themes.lightTheme.colors.green[300],
    });
  })

  it('should merge variants if parent and child variant have the same name', () => {
    const Base = surfaced(View).with((theme) => ({
      variants: {
        layer1: {
          true: {
            borderRadius: 1,
            backgroundColor: 'red',
          }
        },
      },
    }));

    const Parent = surfaced(Base).with((theme) => ({
      variants: {
        layer1: {
          true: {
            borderRadius: 2,
          }
        },
      },
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Parent layer1 />
      </surfaced.Provider>
    );

    const tree = component.toJSON();


    expect(tree.props.style).toMatchObject({ 
      borderRadius: 2,
      backgroundColor: 'red' 
    });
  })

  it('should accept object style prop', () => {
    const Flex = surfaced(View).with(() => ({
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}> 
        <Flex style={{ flex: 0 }}/>
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree.props.style).toMatchObject([{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    }, {
      flex: 0,
    }]);
  })

  it('should accept array style prop', () => {
    const Flex = surfaced(View).with(() => ({
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}> 
        <Flex style={[{ flex: 0 }, { flexDirection: 'column' }]}/>
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree.props.style).toMatchObject([{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    }, {
      flex: 0,
    }, {
      flexDirection: 'column',
    }]);
  })

  it('can compose components build with surface', () => {
    const Base = surfaced(View).with((theme) => ({
      backgroundColor: theme.surfaces.surface0,
      height: 300,
      width: 300,
      variants: {
        child: {
          true: {
            borderRadius: 100,
            backgroundColor: 'transparent',
            borderWidth: 1,
          }
        },
      },
    }));

    const Wrap = surfaced(Base).with((theme) => ({
      width: 100,
      variants: {
        parent: {
          true: {
            borderRadius: 0,
            backgroundColor: theme.colors.red[300],
            borderColor: theme.colors.red[300],
          }
        },
      },
    }));

    const WrapWrap = surfaced(Wrap).with((theme) => ({
      opacity: 0.5,

      transition: {
        opacity: {},
        duration: 100
        

      },

      variants: {
        hidden: {
          true: {
            display: 'none',
          }
        },
      },
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <WrapWrap 
          parent={true}
          child={true} 

          style={{
            zIndex: 30
          }}
        />
        <WrapWrap 
          child={true} 
          parent={true}

          style={{
            zIndex: 30
          }}
        />
        <WrapWrap 
          child={true} 
          parent={true}

          style={{
            zIndex: 30
          }}
        />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree[0].props).toEqual(tree[1].props);
    expect(tree[0].props).toEqual(tree[2].props);
    expect(tree[0].props).toEqual({
      "style": [
        {
          // parent overrides child which overrides base
          "opacity": 0.5,
          "height": 300,
          "width": 100,
          "backgroundColor": themes.lightTheme.colors.red[300],
          "borderColor": themes.lightTheme.colors.red[300],
          "borderRadius": 0,
          borderWidth: 1,
        },
        {
          // custom styles
          "zIndex": 30
        }
      ]
    });
  })

  it('should follow orders of variants', () => {
    const Base = surfaced(View).with((theme) => ({
      variants: {
        layer1: {
          true: {
            borderRadius: 1,
          }
        },

        layer2: {
          true: {
            borderRadius: 2,
          }
        }
      },
    }));

    {
      const component = RNTesting.render(
        <surfaced.Provider theme={themes.lightTheme}>
          <Base layer2 layer1 />
        </surfaced.Provider>
      );
  
      const tree = component.toJSON();
  
      expect(tree.props.style).toMatchObject({ 
        borderRadius: 1 
      });
    }


    {
      const component = RNTesting.render(
        <surfaced.Provider theme={themes.lightTheme}>
          <Base layer1 layer2  />
        </surfaced.Provider>
      );
  
      const tree = component.toJSON();
  
      expect(tree.props.style).toMatchObject({ 
        borderRadius: 2 
      })
    }
  })

  it('can use variant creator to create generic variants', () => {
    const Flex = surfaced(View).with((theme) => ({
      variants: {
        width: surfaced.any({ 
          attribute: 'width',
          number: true, 
          percentage: true,
        }),
        height: surfaced.any({ 
          attribute: 'height',
          number: true, 
          percentage: true,
        }),
      },
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Flex width={100} height={"100%"}/>
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree.props.style).toMatchObject({
      width: 100,
      height: '100%' 
    })

  })

  it('can use tokens in variants', () => {
    const Flex = surfaced(View).with((tokens) => ({
      variants: {
        gap: surfaced.any({ 
          attribute: 'gap',
          number: true, 
          percentage: true, 
          tokens: tokens.spacing,
        }),
      },
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Flex gap="10%" />
        <Flex gap={10} />
        <Flex gap="space8" />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree[0].props.style).toMatchObject({ gap: '10%' });
    expect(tree[1].props.style).toMatchObject({ gap: 10 });
    expect(tree[2].props.style).toMatchObject({ gap: themes.lightTheme.spacing.space8 });
  })

  it('can use tokens in variants (mapped to falsy values)', () => {
    const Flex = surfaced(View).with((tokens) => ({
      variants: {
        gap: surfaced.any({ 
          attribute: 'gap',
          number: true, 
          percentage: true, 
          tokens: tokens.spacing,
        }),
      },
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Flex gap="space0" />
      </surfaced.Provider>
    );

    const tree = component.toJSON();
    expect(tree.props.style).toMatchObject({ gap: 0 });
  })

  it('can use tokens in variants (number = 0)', () => {
    const Flex = surfaced(View).with((tokens) => ({
      variants: {
        gap: surfaced.any({ 
          attribute: 'gap',
          number: true, 
          percentage: true, 
          tokens: tokens.spacing,
        }),
      },
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Flex gap={0} />
      </surfaced.Provider>
    );

    const tree = component.toJSON();
    expect(tree.props.style).toMatchObject({ gap: 0 });
  })

  it('can compute variant dynamically', () => {
    const Spacer = surfaced(View).with((tokens) => ({
      variants: {
        size: surfaced.any({ 
          number: true, 
          percentage: true, 
          tokens: tokens.spacing,
          compute: (value: any) => {
            return {
              padding: value / 2,
            }
          }
        }),
      },
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Spacer size={10} />
        <Spacer size="space8" />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree[0].props.style).toMatchObject({ padding: 5 });
    expect(tree[1].props.style).toMatchObject({ padding: themes.lightTheme.spacing.space8 / 2 });
  })

  it('should memoize dynamic variant', () => {
    const dynamicSpy = jest.fn().mockImplementation((value: any) => {
      return {
        padding: value / 2,
      }
    });

    const Spacer = surfaced(View).with((tokens) => ({
      variants: {
        size: surfaced.any({ 
          number: true, 
          percentage: true, 
          tokens: tokens.spacing,
          compute: dynamicSpy,
        }),
      },
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Spacer size={10} />
        <Spacer size="space8" />
        <Spacer size="space8" />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree[0].props.style).toMatchObject({ padding: 5 });
    expect(tree[1].props.style).toMatchObject({ padding: themes.lightTheme.spacing.space8 / 2 });
    expect(tree[2].props.style).toMatchObject({ padding: themes.lightTheme.spacing.space8 / 2 });
    expect(dynamicSpy).toHaveBeenCalledTimes(2);
  })

  it('should order accumulated variants by order of prop', () => {
    const Spacer = surfaced(View).with((tokens) => ({
      variants: {
        rotate: surfaced.any({ 
          accumulate: 'transform',
          attribute: 'rotate',
          number: true, 
          degree: true
        }),
        translateX: surfaced.any({
          accumulate: 'transform',
          attribute: 'translateX',
          tokens: {
            space: {
              100: '200px',
            }
          } 
        }),
      },
    }));

    {
      const component = RNTesting.render(
        <surfaced.Provider theme={themes.lightTheme}>
          <Spacer rotate={10} translateX={'space.100'} />
        </surfaced.Provider>
      );
  
      const tree = component.toJSON();
  
      expect(tree.props.style).toMatchObject({ 
        transform: [
          { rotate: 10 },
          { translateX: '200px' }
        ],
      });
    }

    {
      const component = RNTesting.render(
        <surfaced.Provider theme={themes.lightTheme}>
          <Spacer translateX={'space.100'} rotate={10} />
        </surfaced.Provider>
      );
  
      const tree = component.toJSON();
  
      expect(tree.props.style).toMatchObject({ 
        transform: [
          { translateX: '200px' },
          { rotate: 10 },
        ],
      });
    }
  })

  it('can use token in accumulated variants', () => {
    const Spacer = surfaced(View).with((tokens) => ({
      variants: {
        rotate: surfaced.any({ 
          accumulate: 'transform',
          attribute: 'rotate',
          number: true, 
          degree: true,
        }),
        translateX: surfaced.any({
          accumulate: 'transform',
          attribute: 'translateX',
          number: true,
          tokens: tokens.spacing, 
        }),
        translateY: surfaced.any({
          accumulate: 'transform',
          attribute: 'translateY',
          number: true,
          tokens: tokens.spacing, 
        }),
      },
    }));

    {
      const component = RNTesting.render(
        <surfaced.Provider theme={themes.lightTheme}>
          <Spacer translateY="space13" rotate={10} translateX={20} />
        </surfaced.Provider>
      );
  
      const tree = component.toJSON();
  
      expect(tree.props.style).toMatchObject({ 
        transform: [
          { translateY: themes.lightTheme.spacing.space13 },
          { rotate: 10 },
          { translateX: 20 }
        ],
      });
    }

    {
      const component = RNTesting.render(
        <surfaced.Provider theme={themes.lightTheme}>
          <Spacer translateX={20} translateY="space3" rotate={10} />
        </surfaced.Provider>
      );
  
      const tree = component.toJSON();
  
      expect(tree.props.style).toMatchObject({ 
        transform: [
          { translateX: 20 },
          { translateY: themes.lightTheme.spacing.space3 },
          { rotate: 10 },
        ],
      });
    }
  })

  it('can allow for multiple variants', () => {

    const Spacer = surfaced(View).with((tokens) => ({
      variants: {
        transitionProperty: surfaced.any({ 
          attribute: 'transitionProperty',
          multiple: true,
          string: true,
        }),
      },
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Spacer transitionProperty={['width', 'height']} />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree.props.style).toEqual({
      "transitionProperty":["width","height"]
    });
  });

  it('can use deeply nested variants', () => {
    const theme = {
      colorssssss: {
        give: {
          me: {
            a: {
              color: {
                hot: 'red',
                blue:  'blue',
              } 
            }
          }
        }
      }
    } as const

    const surfaced = createSurfaced<typeof theme>();
    const Flex = surfaced(View).with((tokens) => ({
      variants: {
        color: surfaced.any({
          attribute: 'color',
          tokens: tokens.colorssssss,
        }),
      }
    }))

    const component = RNTesting.render(
      <surfaced.Provider theme={theme}>
        <Flex color={'give.me.a.color.hot'} />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree.props.style).toEqual({
      "color": 'red',
    });
  });

  it('can allow for multiple variants with tokens', () => {
    const jump = {
      forwards: 'forwards',
      reverse: 'backwards',
      very: 'very-backwards',
    } as const;

    const Spacer = surfaced(View).with((palette) => ({
      variants: {
        multiple: surfaced.any({ 
          attribute: 'multiple',
          multiple: true,
          number: true,
          tokens: jump
        }),
      },
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Spacer multiple={['reverse', 100, 'very']} />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree.props.style).toEqual({
      "multiple":[
        "backwards",
        100,
        'very-backwards',
      ],
    });
  });

  it('should be able to use palette path to reference fonts', () => {
    const TextBase = surfaced(View).with((tokens) => ({
      variants: {
        fontFamily: surfaced.any({ 
          attribute: 'fontFamily',
          fonts: true, 
          tokens: tokens.fonts,
        }),
      }
    }));

    const FontHook = () => {
      const fonts = surfaced.useFonts();
      return null;
    }

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <FontHook />
        <TextBase fontFamily='paragraph.default' />
        <TextBase fontFamily='paragraph.medium' />
      </surfaced.Provider>
    );

    const tree = component.toJSON();

    expect(tree[0].props.style).toEqual({
      fontFamily: 'paragraph_default',
    });

    expect(tree[1].props.style).toEqual({
      fontFamily: 'paragraph_medium',
    });

    expect(useFonts).toHaveBeenCalledWith({
      'paragraph_default': Inter_300Light,
      'paragraph_medium': Inter_500Medium,
    });
  })

  it('can allow negative variants', () => {
    const jump = {
      forwards: 'forwards',
      reverse: 'backwards',
      very: 'very-backwards',
    } as const;

    const Spacer = surfaced(View).with((palette) => ({
      variants: {
        marginLeft: surfaced.any({ attribute: 'marginLeft', number: true, tokens: palette.spacing }),
      },
    }));

    const component = RNTesting.render(
      <surfaced.Provider theme={themes.lightTheme}>
        <Spacer marginLeft={'-space28'} />
      </surfaced.Provider>
    );

    const tree = component.toJSON();
    expect(tree.props.style).toEqual({
      marginLeft: themes.lightTheme.spacing.space28 * -1,
    });
  });
})

