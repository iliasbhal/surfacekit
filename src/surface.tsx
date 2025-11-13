import { useFonts as useExpoFonts } from "expo-font";
import React, { JSXElementConstructor, PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureDetector, GestureType } from "react-native-gesture-handler";
import {
  AnimatedProps,
  BaseAnimationBuilder,
} from "react-native-reanimated";
import { AnimatePresenceContext } from "./AnimatePresence";
import {
  AnyConfig,
  attribute,
  booleanStyle,
  VariantFactoryKey,
} from "./lib/anyConfig";
import {
  getCompiledTokens,
  pathToFontFamily,
  withFontsFamilyKeys,
} from "./lib/compilePaths";
import { conditionalWrap } from "./lib/ConditionalWrap";
import { surfaceContext } from "./lib/context";
import { deepAssign } from "./lib/deepAssign";
import { getAnimatedComp } from "./lib/getAnimatedComponent";
import { TransitionProp, useAnimatedStylesheet } from "./lib/useAnimatedStyle";
import {
  Interaction,
  InteractionState,
  useComponentOverrides,
} from "./lib/useComponentOverrides";
import { OrientationProvider, useDeviceOrientation } from "./lib/useDeviceOrientation";
import { useMediaQuery } from "./lib/useMediaQuery";
import { ScreenDimensionProvider } from "./ScreenDimension";
import { createViewBase } from "./createViewBase";
import { createTextBase } from "./createTextBase";

export {
  Interaction,
} from "./lib/useComponentOverrides";

export interface SurfaceTheme extends Record<string, any> {
  fonts: Record<string, Record<string, any>>
  breakpoints: Record<string, any>
  fontSizes: Record<string, any>
  size: Record<string, any>
  colors: { [key: string]: any }
}

export const getTypedTheme = <T extends SurfaceTheme>(theme: T) => {
  const colors = theme.colors as T['colors'];
  const breakpoints = theme.colors as T['breakpoints'];
  const fontSizes = theme.colors as T['fontSizes'];
  const size = theme.colors as T['size'];
  const fonts = theme.colors as T['fonts'];
  return {
    colors,
    breakpoints,
    fontSizes,
    size,
    fonts,
  };
};

export const createTheme = <T extends SurfaceTheme>(theme: T) : T => {
  return theme;
}

export const createSurfaced = <ThemeValue extends SurfaceTheme>() => {
  const useFonts = () => {
    const theme = useSurfaceTheme();
    const fontsWithFlattenPaths = withFontsFamilyKeys(
      getCompiledTokens(theme.fonts, { fonts: true }),
    );

    // console.log('fontsWithFlattenPaths',fontsWithFlattenPaths);

    const [loaded, error] = useExpoFonts(fontsWithFlattenPaths);

    // console.log('font loaded', loaded,error, fontsWithFlattenPaths);

    return {
      loaded,
      error,
      fonts: fontsWithFlattenPaths,
    };
  };

  const useSurfaceTheme = () => {
    const context = React.useContext<ThemeValue>(surfaceContext);
    return context;
  };

  const ThemeProvider: React.FC<PropsWithChildren<{ theme: ThemeValue }>> = (
    props,
  ) => {
    return (
      <ScreenDimensionProvider>
        <OrientationProvider>
          <surfaceContext.Provider value={props.theme}>
            {props.children}
          </surfaceContext.Provider>
        </OrientationProvider>
      </ScreenDimensionProvider>
    );
  };

  type CompElement<Props extends object = {}> =
    | JSXElementConstructor<Props>
    | JSXElementConstructor<AnimatedProps<Props>>;
  type StylableComponent = CompElement<{ style?: any }>;
  type StyleFor<Component extends StylableComponent> =
    Partial<React.ComponentProps<Component>["style"]>;
  type Variants<Comp extends StylableComponent> = Record<
    string,
    Record<string, StyleFor<Comp>> | Record<string, StyleFor<Comp>>[]
  >;
  type Dynamic<Comp extends StylableComponent> = (
    props: React.ComponentProps<Comp>,
  ) => React.ComponentProps<Comp>["style"];
  type Transition<Comp extends StylableComponent> = {
    duration?: number;
    delay?: number;
  };

  type Animation<Comp extends StylableComponent> = {
    duration?: number;
    delay?: number;
  };

  type WithStyle<Comp extends StylableComponent> = StyleFor<Comp> & {
    variants?: Variants<Comp>;
    dynamic?: Dynamic<Comp>;
    transition?: Transition<Comp>;
    animation?: Animation<Comp>;
  };

  const configByComponent = new Map<any, any>();

  const attrs = {
    any: attribute,
    boolean: booleanStyle,
  }

  type StyleBuilderContext = {
    theme: ThemeValue;
    attrs: typeof attrs;
  }

  const surfaced = <T extends StylableComponent>(Component: T) => {

    const createStylsheetManager = (
      styleFactory: (ctx: StyleBuilderContext) => WithStyle<T>,
    ) => {
      type StoreStyles = ReturnType<typeof createContext>;

      const stylesheetsMap = new Map<ThemeValue, StoreStyles>();

      const getMergedStyleConfig = (ctx: StyleBuilderContext): ReturnType<typeof styleFactory> => {



        const currentConfig = styleFactory(ctx);

        const parentsurfaceConfig = configByComponent.get(Component)
        const { styleConfig: parentConfig } =
          parentsurfaceConfig?.styleManager.getStylesheetForTheme(ctx.theme) || {};

        const merged = {
          ...parentConfig,
          ...currentConfig,

          variants: deepAssign(
            {},
            parentConfig?.variants,
            currentConfig.variants,
          ),

          dynamic: !parentConfig?.dynamic
            ? currentConfig.dynamic
            : !currentConfig.dynamic
              ? undefined
              : (props: any) => {
                  return {
                    ...parentConfig?.dynamic?.(props),
                    ...currentConfig.dynamic?.(props),
                  };
                },
        };

        return {
          merged,
          current: currentConfig,
        };
      };

      const createContext = (theme: ThemeValue) => {
        const { merged, current } = getMergedStyleConfig({
          theme,
          attrs,
        });

        const { dynamic, variants, transition, ...base } = merged;

        const hasBaseStylesheet = Object.keys(base).length > 0;
        const baseStylesheet = StyleSheet.create({ variant: base });

        const compiled = {
          variants: variants,
          dynamic: dynamic,
          transition: transition,
        };

        const variantIndexByName: Record<string, number> = {};

        const currentVariants = Object.entries(current.variants || {});
        currentVariants.forEach(([variantName, variantStyles], index) => {
          variantIndexByName[variantName] = 1;
        });

        Object.entries(compiled.variants || {}).forEach(
          ([variantName, variantStyles], index) => {
            if (!variantIndexByName[variantName]) {
              variantIndexByName[variantName] =
                1 + index + currentVariants.length;
            }
          },
        );

        type VariantConfig = {
          custom?: (computedStyle: any, style: any) => void;
          key: string;
          variant: string;
          active: string;
          style: any;
          config: AnyConfig<string>;
        };

        const variantHandler = {
          context: {
            flattenedTokens: new Map<any, any>(),
            cache: new Map<any, StyleFor<any>>(),
            stylesheets: {} as Record<
              string,
              // StyleSheet.NamedStyles<{ variant: string } | {}>
              any
            >,

            overridden: [] as boolean[],
            variants: [] as VariantConfig[],
            visitedVariants: new Set<string>(),
          },
          getCompiledTokens(anyConfig: AnyConfig<string>) {
            const tokens = anyConfig.tokens || {};
            const alreadyCompiled =
              variantHandler.context.flattenedTokens.get(tokens);
            if (alreadyCompiled) {
              return alreadyCompiled;
            }

            const compiledTokens = getCompiledTokens(tokens, anyConfig as any);
            variantHandler.context.flattenedTokens.set(tokens, compiledTokens);
            return compiledTokens;
          },
          getDynamicVariant(anyConfig: any, value: any) {
            if (!anyConfig) return;

            const { cache } = variantHandler.context;
            const compiledTokens = variantHandler.getCompiledTokens(anyConfig);
            const anyConfigValue = compiledTokens?.[value] ?? value;

            if (anyConfig.multiple && Array.isArray(anyConfigValue)) {
              return {
                [anyConfig.attribute]: anyConfigValue.map(
                  (provided) => compiledTokens?.[provided] || provided,
                ),
              };
            }

            if (anyConfig.fonts) {
              return {
                fontFamily: pathToFontFamily(value),
              };
            }

            if (anyConfig.attribute) {
              return {
                [anyConfig.attribute]: anyConfigValue,
              };
            }

            if (anyConfig.attributes) {
              const style = {} as Record<string, any>;
              anyConfig.attributes.forEach((attribute: string) => {
                style[attribute] = anyConfigValue;
              });
              // console.log('anyConfig.attributes',anyConfig.attributes, style);
              return style;
            }

            if (anyConfig.compute) {
              const cached = cache.get(anyConfigValue);
              if (cached) return cached;

              const computed = anyConfig.compute?.(anyConfigValue);
              cache.set(anyConfigValue, computed);
              return computed;
            }
          },
          visit(props: Record<string, any>, prop: string) {
            const variantConfig = compiled.variants[prop];
            if (!variantConfig)
              return {
                valid: false,
                style: undefined,
              };

            const providedValue = props[prop];
            const anyConfig = variantConfig[VariantFactoryKey];
            const variantStyles =
              variantConfig[providedValue] ??
              variantHandler.getDynamicVariant(anyConfig, providedValue);

            const lastIndex = variantHandler.context.variants.length - 1;
            const prevConfig = variantHandler.context.variants[lastIndex];
            const currentKey = `${prop}-${providedValue}`;
            const variantKey = prevConfig
              ? `${prevConfig.key}-${currentKey}`
              : currentKey;

            variantHandler.context.variants.push({
              custom: anyConfig?.custom,
              key: variantKey,
              variant: prop,
              active: providedValue,
              style: variantStyles,
              config: anyConfig,
            });

            return {
              valid: true,
              style: variantStyles,
            };
          },
          start() {
            variantHandler.context.variants = [];
            variantHandler.context.overridden = [];
          },
          getVariantKey(variants: VariantConfig[]) {
            let orderedVariantKey = "";

            variants.forEach((config, i) => {
              const currentKey = `${config.variant}(${config.active})`;
              if (orderedVariantKey) {
                orderedVariantKey = `${orderedVariantKey} | ${currentKey}`;
              } else {
                orderedVariantKey = currentKey;
              }
            });

            return orderedVariantKey;
          },
          getVariantsStylesheet(variants: VariantConfig[]) {
            const computedStyle = {} as Record<string, any>;
            let hasAddedStyle = false;

            const overridenVariantIndexes = new Set<number>();
            const visitedVariants = new Set<string>();
            for (let i = variants.length - 1; i >= 0; i--) {
              const variantConfig = variants[i];
              if (visitedVariants.has(variantConfig.variant)) {
                overridenVariantIndexes.add(i);
              }

              visitedVariants.add(variantConfig.variant);
            }

            variants.forEach((config, i) => {
              if (!config.style) return;

              const isOverriden = overridenVariantIndexes.has(i);
              if (isOverriden) return;

              if (config.custom) {
                config.custom(computedStyle, config);
              } else {
                Object.assign(computedStyle, config.style);
              }

              hasAddedStyle = true;
            });

            if (!hasBaseStylesheet && !hasAddedStyle) {
              return Object.assign(
                {
                  variant: StyleSheet.create({ variant: computedStyle })
                    .variant,
                },
                { raw: {} },
              );
            }

            return Object.assign(
              {
                variant: StyleSheet.create({ variant: computedStyle }).variant,
              },
              { raw: computedStyle },
            );
          },
          getOrCreateVariantStylesheet() {
            const { stylesheets, variants } = variantHandler.context;
            const orderedVariants = Object.values(variants).sort((a, b) => {
              const aIndex = variantIndexByName[a.variant];
              const bIndex = variantIndexByName[b.variant];
              return aIndex - bIndex;
            });

            const orderedVariantKey =
              variantHandler.getVariantKey(orderedVariants);
            const orderedVariantStylesheet = stylesheets[orderedVariantKey];
            if (orderedVariantStylesheet) {
              return orderedVariantStylesheet;
            }

            const computedStyle =
              variantHandler.getVariantsStylesheet(orderedVariants);
            stylesheets[orderedVariantKey] = computedStyle;
            return stylesheets[orderedVariantKey];
          },

          getStylesheet(opts: { raw?: boolean } = {}) {
            const { stylesheets, variants } = variantHandler.context;

            const lastIndex = variants.length - 1;
            const stylesheetKey = variants?.[lastIndex]?.key || "__BASE__";

            const stylesheet = stylesheets[stylesheetKey];
            if (!stylesheet) {
              const stylesheet = variantHandler.getOrCreateVariantStylesheet();
              stylesheets[stylesheetKey] = stylesheet;
            }

            return opts.raw
              ? stylesheets[stylesheetKey].raw
              : stylesheets[stylesheetKey].variant;
          },
        };

        return {
          dynamic: compiled.dynamic,
          variantHandler,
          styleConfig: merged,
          baseStylesheet: baseStylesheet.variant,
        };
      };

      const getStylesheetForTheme = (theme: ThemeValue) => {
        const alreadyCreated = stylesheetsMap.get(theme);
        if (alreadyCreated) {
          return alreadyCreated;
        }

        const stored = createContext(theme);
        stylesheetsMap.set(theme, stored);
        return stored;
      };

      return {
        getStylesheetForTheme,
      };
    };

    return {
      as: (Component2: any) => {
        return (props: React.ComponentProps<typeof Component> & React.ComponentProps<typeof Component2>) => {
          return <Component as={Component2} {...props} />
        }
      },
      with: <Factory extends (ctx: { theme: ThemeValue; attrs: typeof attrs; }) => WithStyle<T>>(styleFactory: Factory) => {
        const styleManager = createStylsheetManager(styleFactory);

        const surfaceConfig = configByComponent.get(Component);

        type VariantStyle = ReturnType<Factory>;

        type MaybeBoolean<T> = T extends "true" | "false" ? boolean : T;

        type AcceptedValues<
          Variants extends Record<string, any>,
          K extends keyof Variants,
        > = Variants[K] extends any[]
          ?
              | MaybeBoolean<keyof Variants[K][number]>
              | MaybeBoolean<keyof Variants[K][number]>[]
          : Variants[K] extends Record<string, any>
            ? MaybeBoolean<keyof Variants[K]>
            : Variants[K];

        type VariantProps<SurfaceStyle extends WithStyle<T>> = {
          [key in keyof SurfaceStyle["variants"]]?: AcceptedValues<NonNullable<SurfaceStyle["variants"]>, key>;
        }

        type SurfaceCustomProps = {
            as?: CompElement,
            gesture?: GestureType;
            transition?: TransitionProp;
            animation?: {
              keyframes: any;
              duration: number;
            };
            entering?: BaseAnimationBuilder;
            exiting?: BaseAnimationBuilder;

            stateId?: string;
            overrides?: (state: InteractionState) => any;
        }

        type SurfaceProps<SurfaceStyle extends WithStyle<T>> = React.ComponentProps<T> 
          & VariantProps<SurfaceStyle>

        const getRootComponent = (comp: CompElement): CompElement => {
          const surfaceConfig = configByComponent.get(comp);
          const RootComp = surfaceConfig?.root || comp;
          return RootComp;
        };

        const component = <Props extends SurfaceProps<VariantStyle & { AAAA: true}> & SurfaceCustomProps>(props: Props & (Props extends { as: any} ? React.ComponentProps<Props['as']> : {})) => {
          const debug = (...args: any[]) => props.debug && console.log(...args);

          const theme = useSurfaceTheme();
          const presence = React.useContext(AnimatePresenceContext);
          const styles = styleManager.getStylesheetForTheme(theme);
          const compRef = React.useRef<T>(null);

          // if there is a `stateId` in props, we will setup
          // the gestures and focus props by default. This is to simplify
          // avoid implementing a more complex tracking of what has to needs to be setup.
          // Most probably, if there is a stateId, it means that those gestures a
          // re going to be used.
          const overridesHanlder = useComponentOverrides(props);

          const styleProp = [styles.baseStylesheet];

          const customStylesFunctions: (() => void)[] = [];
          const nextProps = {} as Record<string, any>;

          let transformAcc: any = null;

          const trackTransform = (style: any) => {
            if (style.transform) {
              // console.log('TRANSFORM', style.transform);
              if (!transformAcc) transformAcc = [];
              transformAcc.push(...style.transform);
            }
          };

          const applyVariantStyles = (providedProps: any) => {
            for (const prop in providedProps) {
              const result = styles.variantHandler.visit(providedProps, prop);
              if (result.valid) continue;

              // if it's not a variant we should add it to the nextProps
              // basicaly a copy/paste of the prop to the nextProps
              nextProps[prop] = providedProps[prop];
            }

            // we need to ensure that style prop is added
            if (!providedProps.style) return;

            customStylesFunctions.push(() => {
              if (providedProps.style[0]) {
                providedProps.style.forEach((style: any) => {
                  styleProp.push(style);
                  trackTransform(style);
                });
              } else {
                styleProp.push(providedProps.style);
                trackTransform(providedProps.style);
              }
            });
          };

          const applySingleOverride = (override: any) => {
            // console.log('VISIT OVERRIDE', RootComp, override);
            const isComponentOverride = override?.props;
            if (isComponentOverride) {
              return applySingleOverride(override.props);
            }

            if (typeof override === "object") {
              return applyVariantStyles(override);
            }
          };

          const applyOverrides = (overrides: any) => {
            if (typeof overrides === "function") {
              const overrideContext =
                overridesHanlder.getOverrideContext(presence);
              const result = overrides(overrideContext);
              if (!result) return;
              // console.log('APPLY OVERRIDES', result);
              return applyOverrides(result);
            }

            if (Array.isArray(overrides)) {
              return overrides.forEach((override) => {
                return applySingleOverride(override);
              });
            }

            if (typeof overrides === "object") {
              return applySingleOverride(overrides);
            }
          };

          styles.variantHandler.start();

          applyVariantStyles(props);
          const variantStyle = styles.variantHandler.getStylesheet();
          if (styles.dynamic) {
            const dynamic = styles.dynamic(props);
            styleProp.push(dynamic);
            trackTransform(dynamic);
          }


          if (nextProps.as) {
            delete nextProps.as;
          }

          if (variantStyle) {
            styleProp.push(variantStyle);
            trackTransform(variantStyle);
          }

          if ("overrides" in nextProps) {
            const overrides = nextProps.overrides as any;
            delete nextProps.overrides;
            styles.variantHandler.start();
            applyOverrides(overrides);
            const variantStyle = styles.variantHandler.getStylesheet();
            if (variantStyle) {
              styleProp.push(variantStyle);
              trackTransform(variantStyle);
            }
          }

          if ("stateId" in nextProps) {
            delete nextProps.stateId;
          }

          if (transformAcc) {
            styleProp.push({
              transform: Object.entries(
                transformAcc.reduce((acc: any, curr: any) => {
                  const propName = Object.keys(curr)[0];
                  acc[propName] = curr[propName];
                  return acc;
                }, {}),
              ).map(([key, value]) => ({
                [key]: value,
              })),
            });
          }

          const componentProps: any = {
            ...nextProps,
            style: styleProp,
          };

          // We implement the animated hook if the overrides is defined.
          // Just in case we have an animation in the overrides but no transition or anything in the default props.
          // We should also make it animated if there is style prop because there can be a animatedStyle provided there
          const hasAnimatedHook =
            nextProps.style ||
            nextProps.transition ||
            nextProps.animation ||
            props.overrides;
          if (hasAnimatedHook) {
            useAnimatedStylesheet(componentProps, presence);
          }

          customStylesFunctions.forEach((fn) => fn());

          overridesHanlder.applyFocusProps(componentProps);
          overridesHanlder.handleOverrides(componentProps);
          overridesHanlder.applyGestures(componentProps);

          const isAnimated = !!(hasAnimatedHook || props.entering || props.exiting || props.as);
          const rootComponent = getRootComponent(props.as || Component);
          const ComponentToRender = isAnimated ? getAnimatedComp(rootComponent) : rootComponent;


          presence?.lifecycle?.onRender?.();
          return conditionalWrap(
            <ComponentToRender 
              {...componentProps} 
              ref={(ref: any) => {
                compRef.current = ref;
                if (props.ref) {
                  if (typeof props.ref === 'function') {
                    props.ref(ref);
                  } else {
                    props.ref.current = ref;
                  }
                }
              }} 
            />,
            [
              componentProps.gesture &&
                ((props) => (
                  <GestureDetector gesture={componentProps.gesture} {...props}/>
                )),
              props.stateId &&
                ((props) => (
                  <Interaction.Provider
                    stateId={props.stateId}
                    state={overridesHanlder.getOverrideContext(presence)}
                    {...props}
                  />
                )),
            ],
          );
        };

        configByComponent.set(component, {
          root: surfaceConfig?.root || Component,
          parent: Component,
          styleFactory,
          styleManager,
        });

        return Object.assign(component, {
          __types: {
            Props: {} as VariantStyle,
          },

          useVariant: (variant: string, value: any) => {
            const theme = useSurfaceTheme();

            const styles = styleManager.getStylesheetForTheme(theme);
            styles.variantHandler.start();
            styles.variantHandler.visit({ [variant]: value }, variant);
            return styles.variantHandler.getStylesheet({ raw: true });
          },
      
        });
      },
    };
  };

  return Object.assign(surfaced, {
    __types: {
      ThemeValue: {} as ThemeValue,
    },

    useTheme: useSurfaceTheme,
    useFonts: useFonts,
    useOrientation: useDeviceOrientation,
    useMediaQuery: useMediaQuery,
    Provider: ThemeProvider,

    useVariantStyle: (component: StylableComponent, variant: string, value: any) => {
      const theme = useSurfaceTheme();

      const surfaceConfig = configByComponent.get(component);
      if (!surfaceConfig) return {};

      const styleManager = surfaceConfig?.styleManager.getStylesheetForTheme(theme);
      const styles = styleManager.getStylesheetForTheme(theme);
      styles.variantHandler.start();
      styles.variantHandler.visit({ [variant]: value }, variant);
      const stylesheet = styles.variantHandler.getStylesheet({ raw: true });
      return stylesheet
    },
    createView: () => {
      return surfaced(View).with(ctx => {
        const variants =  createViewBase(ctx.theme) ;
        return variants;
      });
    },
    createText: () => {
      return surfaced(Text).with(ctx => {
        const variants =  createTextBase(ctx.theme) ;
        return variants;
      });
    }
  });

};


