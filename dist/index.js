import { useFonts } from 'expo-font';
import React9, { createContext, useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, useWindowDimensions, Platform } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, cancelAnimation, makeMutable, withDelay, withTiming, ReduceMotion, Easing } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { Orientation, addOrientationChangeListener, removeOrientationChangeListener, getOrientationAsync } from 'expo-screen-orientation';
import { KeyboardProvider } from 'react-native-keyboard-controller';

// src/surface.tsx
var AnimatePresenceContext = React9.createContext(null);

// src/lib/anyConfig.ts
var VariantFactoryKey = "__InternalAnyConfig__";
var anyStyle = () => (config) => {
  return {
    [VariantFactoryKey]: config
  };
};
var booleanStyle = (style) => {
  return {
    true: style
  };
};

// src/lib/compilePaths.ts
var getCompiledTokens = (tokensObject, config) => {
  const compiledTokens = {};
  const compileRecursive = (tokensObject2, path) => {
    for (const key in tokensObject2) {
      const compiledKey = !path ? `${key}` : `${path}.${key}`;
      if (typeof tokensObject2[key] === "object") {
        compileRecursive(tokensObject2[key], compiledKey);
      } else {
        const value = tokensObject2[key];
        compiledTokens[compiledKey] = value;
        if (typeof value === "number" && !config.fonts) {
          compiledTokens[`-${compiledKey}`] = -value;
        }
      }
    }
  };
  compileRecursive(tokensObject);
  return compiledTokens;
};
var pathToFontFamily = (path) => {
  return path.replaceAll(".", "_");
};
var withFontsFamilyKeys = (fontsObject) => {
  const fontObjectFixed = {};
  for (const key in fontsObject) {
    const fontFamily = pathToFontFamily(key);
    fontObjectFixed[fontFamily] = fontsObject[key];
  }
  return fontObjectFixed;
};

// src/lib/ConditionalWrap.tsx
var conditionalWrap = (content, wrappers) => {
  let result = content;
  for (const wrapper of wrappers) {
    if (!wrapper) continue;
    result = wrapper({ children: result });
  }
  return result;
};
var surfaceContext = React9.createContext(null);
surfaceContext.Provider;

// src/lib/deepAssign.ts
function deepAssign(target, ...sources) {
  if (!sources.length) return target;
  for (const source of sources) {
    if (!source) continue;
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (isObject(source[key])) {
          if (!target[key]) {
            target[key] = {};
          }
          deepAssign(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      });
    }
  }
  return target;
}
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
var animatedComponentByComponent = /* @__PURE__ */ new WeakMap();
var getAnimatedComp = (comp) => {
  const componentName = comp.displayName;
  if (animatedComponentByComponent.has(comp)) {
    return animatedComponentByComponent.get(comp);
  }
  const animatedComponent = Animated[componentName] || Animated.createAnimatedComponent(comp);
  animatedComponentByComponent.set(comp, animatedComponent);
  return animatedComponent;
};
var Natural = (value, callback) => withTiming(
  value,
  {
    duration: 300,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    reduceMotion: ReduceMotion.System
  },
  callback
);
function useDynamicSharedValues() {
  const ref = React9.useRef({}).current;
  React9.useEffect(() => {
    return () => {
      Object.values(ref).forEach((value) => {
        cancelAnimation(value.shared);
      });
    };
  }, []);
  React9.useEffect(() => {
  });
  const order = [];
  return {
    ref,
    get: (name) => {
      return ref[name].shared?.value;
    },
    has: (name) => {
      return ref[name].shared !== void 0;
    },
    target(name, next) {
      ref[name].previous = ref[name].next;
      ref[name].next = next;
      const hasChanged = ref[name].previous !== ref[name].next;
      return hasChanged;
    },
    init: (name, initial) => {
      if (ref[name]?.shared) return false;
      ref[name] = {
        shared: makeMutable(initial),
        previous: initial,
        next: initial,
        value: null
      };
      return true;
    },
    set: (name, next) => {
      if (!ref[name].shared) return;
      order.push(name);
      ref[name].shared.value = next;
    },
    forEach(callback) {
      return order.forEach((name) => {
        callback(name, ref[name].shared);
      });
    }
  };
}

// src/lib/ControlledPromise.ts
var createControlledPromise = () => {
  let complete = null;
  let reject = null;
  let status = "pending";
  const promise = new Promise((resolve, reject2) => {
    complete = (value) => {
      status = "fulfilled";
      resolve(value);
    };
  });
  return {
    promise,
    complete,
    reject,
    get status() {
      return status;
    }
  };
};

// src/lib/useAnimatedStyle.ts
var defaultTransforms = {
  rotate: "0deg",
  rotateX: "0deg",
  rotateY: "0deg",
  rotateZ: "0deg",
  translateX: 0,
  translateY: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  skew: "0deg",
  skewX: "0deg",
  skewY: "0deg",
  perspective: 1e3
};
var defaultTransformStyle = Object.entries(defaultTransforms).map(
  ([prop, value]) => ({ [prop]: value })
);
var styleDefaults = {
  opacity: 1,
  padding: 0,
  paddingHorizontal: 0,
  paddingVertical: 0,
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  margin: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginHorizontal: 0,
  marginVertical: 0,
  borderRadius: 0,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0
};
var useAnimatedStylesheet = (componentProps, presence) => {
  const [state] = React9.useState(() => ({
    pendingTransitions: [],
    animationEffects: /* @__PURE__ */ new Map()
    // completedAnimations: new Set<string>(),
  }));
  const transition = componentProps.transition || {};
  componentProps.animation;
  delete componentProps.transition;
  delete componentProps.animation;
  const styleProp = componentProps.style;
  const sharedValues = useDynamicSharedValues();
  const animationKeys = Object.keys(transition || {});
  const remainingAnimatedProperties = new Set(animationKeys);
  const compiledStyle = Object.assign({}, ...styleProp);
  const animateProperty = (key, initial, next) => {
    remainingAnimatedProperties.delete(key);
    sharedValues.init(key, initial);
    state.animationEffects.set(key, () => {
      const isAnimating = state.pendingTransitions.size > 0;
      if (!isAnimating) {
        presence?.lifecycle?.onAnimationStart?.();
      }
      const promiseCtl = createControlledPromise();
      const delay = compiledStyle.transitionDelay || 0;
      sharedValues.set(key, withDelay(delay, Natural(next, () => {
        scheduleOnRN(() => promiseCtl.complete());
      })));
      state.pendingTransitions.push(promiseCtl.promise);
      const totalAnimationsCount = state.pendingTransitions.length;
      Promise.all(state.pendingTransitions).then(() => {
        const animationChanged = totalAnimationsCount !== state.pendingTransitions.length;
        if (animationChanged) return;
        presence?.lifecycle?.onAnimationEnd?.();
      });
    });
  };
  React9.useEffect(() => {
    Array.from(state.animationEffects.values()).forEach((effect) => {
      effect();
    });
    state.animationEffects.clear();
  });
  for (const propName in compiledStyle) {
    if (propName === "transform") {
      compiledStyle.transform?.forEach((transform2) => {
        const transformName = Object.keys(transform2)[0];
        const transformValue = transform2[transformName];
        const isAnimated = transition[transformName];
        if (!isAnimated) return;
        animateProperty(transformName, transformValue, transformValue);
      });
    } else {
      const isAnimated = transition[propName];
      if (!isAnimated) continue;
      const initial = compiledStyle[propName];
      const next = compiledStyle[propName];
      animateProperty(propName, initial, next);
    }
  }
  const sortedProps = Array.from(remainingAnimatedProperties).sort((a, b) => {
    const isScaleA = a.includes("scale");
    const isScaleB = b.includes("scale");
    const isTranslateA = a.includes("translate");
    const isTranslateB = b.includes("translate");
    if (isScaleA && isTranslateB) return 1;
    if (isTranslateA && isScaleB) return -1;
    return 0;
  });
  sortedProps.forEach((prop) => {
    const initial = defaultTransforms[prop] ?? styleDefaults[prop];
    if (initial !== void 0) {
      animateProperty(prop, initial, initial);
    }
  });
  const styles = {};
  sharedValues.forEach((propName, sharedValue) => {
    styles[propName] = sharedValue;
  });
  const animatedStyle = useAnimatedStyle(() => {
    const style = {};
    for (const key in styles) {
      const sharedValue = styles[key];
      const isTransform = key in defaultTransforms;
      if (isTransform) {
        if (!style.transform) {
          style.transform = [];
        }
        return style.transform.push({
          [key]: sharedValue.value
        });
      }
      style[key] = sharedValue.value;
    }
    return style;
  });
  styleProp.push(animatedStyle);
};
StyleSheet.create({
  base: {
    transform: defaultTransformStyle
  }
}).base;
var useRerenderRef = (initialValue) => {
  const [state, rerender] = React9.useState(() => ({ current: initialValue() }));
  return {
    current: state.current,
    rerender: () => rerender((prev) => ({ ...prev }))
  };
};

// src/lib/useComponentOverrides.tsx
var InteractionStateContext = React9.createContext(null);
var InteractionStateProvider = (props) => {
  const parentContext = React9.useContext(InteractionStateContext) || {};
  return /* @__PURE__ */ React9.createElement(
    InteractionStateContext.Provider,
    {
      value: {
        ...parentContext,
        [props.stateId]: props.state
      }
    },
    props.children
  );
};
var useInteractionStateContext = (config) => {
  const parentContext = React9.useContext(InteractionStateContext) || {};
  const state = parentContext[config.stateId];
  return state;
};
var InteractionStateInline = (props) => {
  const state = useInteractionStateContext({ stateId: props.stateId });
  return props.children(state);
};
var Interaction = Object.assign(
  {},
  {
    Provider: InteractionStateProvider,
    Inline: InteractionStateInline
  }
);
var useComponentOverrides = (props) => {
  const defaultActive = props.stateId ? true : false;
  const { current, rerender } = useRerenderRef(() => ({
    activateGesture: false,
    activateFocus: false,
    isInitial: true,
    isExiting: false,
    isHovering: false,
    isPressed: false,
    isFocused: false,
    getOverrideContext: (presence) => {
      return {
        get entered() {
          return presence?.entered;
        },
        get entering() {
          return presence?.entering;
        },
        get initial() {
          const isFirstRender = current.isInitial;
          if (isFirstRender) {
            current.isInitial = false;
            rerender();
          }
          if (!presence) return false;
          return isFirstRender;
        },
        get exiting() {
          return !presence?.isPresent;
        },
        get hovered() {
          current.activateGesture = true;
          return current.isHovering;
        },
        get pressed() {
          current.activateGesture = true;
          return current.isPressed;
        },
        get focused() {
          current.activateFocus = true;
          return current.isFocused;
        },
        get focusWithin() {
          current.activateFocus = true;
          return current.isFocused;
        }
      };
    },
    handleOverrides: (componentProps) => {
    },
    applyFocusProps: (props2) => {
      if (!current.activateFocus) return null;
      const prevOnFocus = props2.onFocus;
      props2.onFocus = () => {
        if (!current.isFocused) {
          prevOnFocus?.();
        }
        current.isFocused = true;
        rerender();
      };
      const prevOnBlur = props2.onBlur;
      props2.onBlur = () => {
        if (current.isFocused) {
          prevOnBlur?.();
        }
        current.isFocused = false;
        rerender();
      };
    },
    applyGestures: (componentProps) => {
      const gestures = [];
      const styleGestures = current.getEnabledGestures();
      if (styleGestures.length > 0) {
        gestures.push(...styleGestures);
      }
      const gestureProp = "gesture" in componentProps && componentProps.gesture;
      if (gestureProp) {
        gestures.push(gestureProp);
      }
      if (gestures.length > 0) {
        componentProps.gesture = Gesture.Simultaneous(...gestures);
      }
    },
    getEnabledGestures: () => {
      if (!current.activateGesture) return [];
      return [
        Gesture.Hover().runOnJS(true).shouldCancelWhenOutside(true).onBegin(() => {
          current.isHovering = true;
          rerender();
        }).onFinalize(() => {
          current.isHovering = false;
          rerender();
        }),
        Gesture.Pan().runOnJS(true).shouldCancelWhenOutside(true).onBegin(() => {
          current.isPressed = true;
          rerender();
        }).onFinalize(() => {
          current.isPressed = false;
          rerender();
        })
      ];
    }
  }));
  current.activateGesture = defaultActive;
  current.activateFocus = defaultActive;
  return current;
};
var OrientationContext = createContext(null);
var OrientationProvider = ({ children }) => {
  const [orientation, setOrientation] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const getOrientation = async () => {
      const currentOrientation = await getOrientationAsync();
      if (isMounted) {
        setOrientation(currentOrientation);
      }
    };
    const subscription = addOrientationChangeListener(({ orientationInfo }) => {
      if (isMounted) {
        setOrientation(orientationInfo.orientation);
      }
    });
    getOrientation();
    return () => {
      isMounted = false;
      removeOrientationChangeListener(subscription);
    };
  }, []);
  return /* @__PURE__ */ React.createElement(OrientationContext.Provider, { value: orientation }, children);
};
var useDeviceOrientation = () => {
  const orientation = useContext(OrientationContext);
  Orientation.LANDSCAPE_LEFT;
  Orientation.LANDSCAPE_RIGHT;
  Orientation.PORTRAIT_DOWN;
  Orientation.PORTRAIT_UP;
  const isLandscape = orientation === Orientation.LANDSCAPE_LEFT || orientation === Orientation.LANDSCAPE_RIGHT;
  if (isLandscape) return "landscape";
  const isPortrait = orientation === Orientation.PORTRAIT_DOWN || orientation === Orientation.PORTRAIT_UP || orientation === Orientation.UNKNOWN;
  if (isPortrait) return "portrait";
  return "portrait";
};
var DimensionsContext = React9.createContext(null);
var ScreenDimensionProvider = (props) => {
  const dimensions = useScreenDimensions();
  return /* @__PURE__ */ React9.createElement(DimensionsContext.Provider, { value: dimensions }, props.children);
};
var useScreenDimensions = () => {
  const dimensionCtx = React9.useContext(DimensionsContext);
  if (dimensionCtx) {
    return dimensionCtx;
  }
  const dimensions = useWindowDimensions();
  return dimensions;
};
var useMediaQuery = (mediaBuild) => {
  const dimensions = useScreenDimensions();
  const orientation = useDeviceOrientation();
  const builder = createBooleanBuilder({
    dimension: dimensions,
    orientation
  });
  const result = mediaBuild(builder);
  return result.value;
};
var getPlatform = () => {
  const isMobile = Platform.OS === "ios" || Platform.OS === "android";
  if (isMobile) return "mobile";
  const isDesktop = typeof window !== "undefined" && window.__TAURI__;
  if (isDesktop) return "desktop";
  const isWeb = Platform.OS === "web";
  if (isWeb) return "web";
  return "web";
};
var createBooleanBuilder = (state) => {
  const builder = (currentBoolean, initial = false) => {
    const isPlatform = (platform) => {
      return platform === "mobile" ? Platform.OS === "ios" || Platform.OS === "android" : platform === "desktop" ? Platform.OS === "web" && typeof window !== "undefined" && !("ontouchstart" in window) : Platform.OS === platform;
    };
    const isEqual = (value1, value2) => {
      return value1 === value2;
    };
    const isLargerThan = (value1, value2) => {
      return value1 > value2;
    };
    const isSmallerThan = (value1, value2) => {
      return value1 < value2;
    };
    const isBetween = (value1, value2, value3) => {
      return value1 >= value2 && value1 <= value3;
    };
    const compare = (mode, value1, value2) => {
      if (mode === "or" && initial) {
        return !!value2;
      }
      const result = mode === "and" ? !!(value1 && value2) : !!(value1 || value2);
      return result;
    };
    const isEqualBuilder = (current, mode) => (value) => {
      const nextBoolean = compare(mode, currentBoolean, isEqual(current, value));
      return builder(nextBoolean);
    };
    const isLargerThanBuilder = (current, mode) => (value) => {
      const nextBoolean = compare(mode, currentBoolean, isLargerThan(current, value));
      return builder(nextBoolean);
    };
    const isSmallerThanBuilder = (current, mode) => (value) => {
      const nextBoolean = compare(mode, currentBoolean, isSmallerThan(current, value));
      return builder(nextBoolean);
    };
    const isBetweenBuilder = (current, mode) => (min, max) => {
      const nextBoolean = compare(mode, currentBoolean, isBetween(current, min, max));
      return builder(nextBoolean);
    };
    const orientationBuilder = (current, mode) => (orientation) => {
      const nextBoolean = compare(mode, currentBoolean, orientation === "portrait" ? state.dimension.height > state.dimension.width : state.dimension.width > state.dimension.height);
      return builder(nextBoolean);
    };
    const platformBuilder = (current, mode) => (platform) => {
      const nextBoolean = compare(mode, currentBoolean, isPlatform(platform));
      return builder(nextBoolean);
    };
    const And = {
      platform: platformBuilder(getPlatform(), "and"),
      orientation: orientationBuilder(state.orientation, "and"),
      width: {
        is: isEqualBuilder(state.dimension.width, "and"),
        largerThan: isLargerThanBuilder(state.dimension.width, "and"),
        smallerThan: isSmallerThanBuilder(state.dimension.width, "and"),
        between: isBetweenBuilder(state.dimension.width, "and")
      },
      height: {
        is: isEqualBuilder(state.dimension.height, "and"),
        largerThan: isLargerThanBuilder(state.dimension.height, "and"),
        smallerThan: isSmallerThanBuilder(state.dimension.height, "and"),
        between: isBetweenBuilder(state.dimension.height, "and")
      }
    };
    const Or = {
      platform: platformBuilder(getPlatform(), "or"),
      orientation: orientationBuilder(state.orientation, "or"),
      width: {
        is: isEqualBuilder(state.dimension.width, "or"),
        largerThan: isLargerThanBuilder(state.dimension.width, "or"),
        smallerThan: isSmallerThanBuilder(state.dimension.width, "or"),
        between: isBetweenBuilder(state.dimension.width, "or")
      },
      height: {
        is: isEqualBuilder(state.dimension.height, "or"),
        largerThan: isLargerThanBuilder(state.dimension.height, "or"),
        smallerThan: isSmallerThanBuilder(state.dimension.height, "or"),
        between: isBetweenBuilder(state.dimension.height, "or")
      }
    };
    return {
      value: currentBoolean,
      ...And,
      and: Object.assign((...booleans) => {
        const nextBoolean = booleans.every((boolean) => boolean.value);
        return builder(nextBoolean);
      }, And),
      or: Object.assign((...booleans) => {
        const nextBoolean = booleans.some((boolean) => boolean.value);
        return builder(nextBoolean);
      }, Or)
    };
  };
  return builder(true, true);
};

// src/surface.tsx
var createTheme = (theme) => {
  return theme;
};
var createSurfaced = () => {
  const surfaceAny = anyStyle();
  const useFonts$1 = () => {
    const theme = useSurfaceTheme();
    const fontsWithFlattenPaths = withFontsFamilyKeys(
      getCompiledTokens(theme.fonts, { fonts: true })
    );
    const [loaded, error] = useFonts(fontsWithFlattenPaths);
    return {
      loaded,
      error,
      fonts: fontsWithFlattenPaths
    };
  };
  const useSurfaceTheme = () => {
    const context = React9.useContext(surfaceContext);
    return context;
  };
  const ThemeProvider = (props) => {
    return /* @__PURE__ */ React9.createElement(ScreenDimensionProvider, null, /* @__PURE__ */ React9.createElement(OrientationProvider, null, /* @__PURE__ */ React9.createElement(KeyboardProvider, null, /* @__PURE__ */ React9.createElement(surfaceContext.Provider, { value: props.theme }, props.children))));
  };
  const configByComponent = /* @__PURE__ */ new Map();
  const surfaced = (Component) => {
    const createStylsheetManager = (styleFactory) => {
      const stylesheetsMap = /* @__PURE__ */ new Map();
      const getMergedStyleConfig = (theme) => {
        const currentConfig = styleFactory(theme);
        const parentsurfaceConfig = configByComponent.get(Component);
        const { styleConfig: parentConfig } = parentsurfaceConfig?.styleManager.getStylesheetForTheme(theme) || {};
        const merged = {
          ...parentConfig,
          ...currentConfig,
          variants: deepAssign(
            {},
            parentConfig?.variants,
            currentConfig.variants
          ),
          dynamic: !parentConfig?.dynamic ? currentConfig.dynamic : !currentConfig.dynamic ? void 0 : (props) => {
            return {
              ...parentConfig?.dynamic?.(props),
              ...currentConfig.dynamic?.(props)
            };
          }
        };
        return {
          merged,
          current: currentConfig
        };
      };
      const createContext2 = (theme) => {
        const { merged, current } = getMergedStyleConfig(theme);
        const { dynamic, variants, transition, ...base } = merged;
        const hasBaseStylesheet = Object.keys(base).length > 0;
        const baseStylesheet = StyleSheet.create({ variant: base });
        const compiled = {
          variants,
          dynamic};
        const variantIndexByName = {};
        const currentVariants = Object.entries(current.variants || {});
        currentVariants.forEach(([variantName, variantStyles], index) => {
          variantIndexByName[variantName] = 1;
        });
        Object.entries(compiled.variants || {}).forEach(
          ([variantName, variantStyles], index) => {
            if (!variantIndexByName[variantName]) {
              variantIndexByName[variantName] = 1 + index + currentVariants.length;
            }
          }
        );
        const variantHandler = {
          context: {
            flattenedTokens: /* @__PURE__ */ new Map(),
            cache: /* @__PURE__ */ new Map(),
            stylesheets: {},
            overridden: [],
            variants: [],
            visitedVariants: /* @__PURE__ */ new Set()
          },
          getCompiledTokens(anyConfig) {
            const tokens = anyConfig.tokens || {};
            const alreadyCompiled = variantHandler.context.flattenedTokens.get(tokens);
            if (alreadyCompiled) {
              return alreadyCompiled;
            }
            const compiledTokens = getCompiledTokens(tokens, anyConfig);
            variantHandler.context.flattenedTokens.set(tokens, compiledTokens);
            return compiledTokens;
          },
          getDynamicVariant(anyConfig, value) {
            if (!anyConfig) return;
            const { cache } = variantHandler.context;
            const compiledTokens = variantHandler.getCompiledTokens(anyConfig);
            const anyConfigValue = compiledTokens?.[value] ?? value;
            if (anyConfig.multiple && Array.isArray(anyConfigValue)) {
              return {
                [anyConfig.attribute]: anyConfigValue.map(
                  (provided) => compiledTokens?.[provided] || provided
                )
              };
            }
            if (anyConfig.fonts) {
              return {
                fontFamily: pathToFontFamily(value)
              };
            }
            if (anyConfig.attribute) {
              return {
                [anyConfig.attribute]: anyConfigValue
              };
            }
            if (anyConfig.attributes) {
              const style = {};
              anyConfig.attributes.forEach((attribute) => {
                style[attribute] = anyConfigValue;
              });
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
          visit(props, prop) {
            const variantConfig = compiled.variants[prop];
            if (!variantConfig)
              return {
                valid: false,
                style: void 0
              };
            const providedValue = props[prop];
            const anyConfig = variantConfig[VariantFactoryKey];
            const variantStyles = variantConfig[providedValue] ?? variantHandler.getDynamicVariant(anyConfig, providedValue);
            const lastIndex = variantHandler.context.variants.length - 1;
            const prevConfig = variantHandler.context.variants[lastIndex];
            const currentKey = `${prop}-${providedValue}`;
            const variantKey = prevConfig ? `${prevConfig.key}-${currentKey}` : currentKey;
            variantHandler.context.variants.push({
              custom: anyConfig?.custom,
              key: variantKey,
              variant: prop,
              active: providedValue,
              style: variantStyles,
              config: anyConfig
            });
            return {
              valid: true,
              style: variantStyles
            };
          },
          start() {
            variantHandler.context.variants = [];
            variantHandler.context.overridden = [];
          },
          getVariantKey(variants2) {
            let orderedVariantKey = "";
            variants2.forEach((config, i) => {
              const currentKey = `${config.variant}(${config.active})`;
              if (orderedVariantKey) {
                orderedVariantKey = `${orderedVariantKey} | ${currentKey}`;
              } else {
                orderedVariantKey = currentKey;
              }
            });
            return orderedVariantKey;
          },
          getVariantsStylesheet(variants2) {
            const computedStyle = {};
            let hasAddedStyle = false;
            const overridenVariantIndexes = /* @__PURE__ */ new Set();
            const visitedVariants = /* @__PURE__ */ new Set();
            for (let i = variants2.length - 1; i >= 0; i--) {
              const variantConfig = variants2[i];
              if (visitedVariants.has(variantConfig.variant)) {
                overridenVariantIndexes.add(i);
              }
              visitedVariants.add(variantConfig.variant);
            }
            variants2.forEach((config, i) => {
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
                  variant: StyleSheet.create({ variant: computedStyle }).variant
                },
                { raw: {} }
              );
            }
            return Object.assign(
              {
                variant: StyleSheet.create({ variant: computedStyle }).variant
              },
              { raw: computedStyle }
            );
          },
          getOrCreateVariantStylesheet() {
            const { stylesheets, variants: variants2 } = variantHandler.context;
            const orderedVariants = Object.values(variants2).sort((a, b) => {
              const aIndex = variantIndexByName[a.variant];
              const bIndex = variantIndexByName[b.variant];
              return aIndex - bIndex;
            });
            const orderedVariantKey = variantHandler.getVariantKey(orderedVariants);
            const orderedVariantStylesheet = stylesheets[orderedVariantKey];
            if (orderedVariantStylesheet) {
              return orderedVariantStylesheet;
            }
            const computedStyle = variantHandler.getVariantsStylesheet(orderedVariants);
            stylesheets[orderedVariantKey] = computedStyle;
            return stylesheets[orderedVariantKey];
          },
          getStylesheet(opts = {}) {
            const { stylesheets, variants: variants2 } = variantHandler.context;
            const lastIndex = variants2.length - 1;
            const stylesheetKey = variants2?.[lastIndex]?.key || "__BASE__";
            const stylesheet = stylesheets[stylesheetKey];
            if (!stylesheet) {
              const stylesheet2 = variantHandler.getOrCreateVariantStylesheet();
              stylesheets[stylesheetKey] = stylesheet2;
            }
            return opts.raw ? (
              // @ts-expect-error
              stylesheets[stylesheetKey].raw
            ) : (
              // @ts-expect-error
              stylesheets[stylesheetKey].variant
            );
          }
        };
        return {
          dynamic: compiled.dynamic,
          variantHandler,
          styleConfig: merged,
          baseStylesheet: baseStylesheet.variant
        };
      };
      const getStylesheetForTheme = (theme) => {
        const alreadyCreated = stylesheetsMap.get(theme);
        if (alreadyCreated) {
          return alreadyCreated;
        }
        const stored = createContext2(theme);
        stylesheetsMap.set(theme, stored);
        return stored;
      };
      return {
        getStylesheetForTheme
      };
    };
    return {
      as: (Component2) => {
        return (props) => {
          return /* @__PURE__ */ React9.createElement(Component, { as: Component2, ...props });
        };
      },
      with: (styleFactory) => {
        const styleManager = createStylsheetManager(styleFactory);
        const surfaceConfig = configByComponent.get(Component);
        const getRootComponent = (comp) => {
          const surfaceConfig2 = configByComponent.get(comp);
          const RootComp = surfaceConfig2?.root || comp;
          return RootComp;
        };
        const component = (props) => {
          const theme = useSurfaceTheme();
          const presence = React9.useContext(AnimatePresenceContext);
          const styles = styleManager.getStylesheetForTheme(theme);
          const compRef = React9.useRef(null);
          const overridesHanlder = useComponentOverrides(props);
          const styleProp = [styles.baseStylesheet];
          const customStylesFunctions = [];
          const nextProps = {};
          let transformAcc = null;
          const trackTransform = (style) => {
            if (style.transform) {
              if (!transformAcc) transformAcc = [];
              transformAcc.push(...style.transform);
            }
          };
          const applyVariantStyles = (providedProps) => {
            for (const prop in providedProps) {
              const result = styles.variantHandler.visit(providedProps, prop);
              if (result.valid) continue;
              nextProps[prop] = providedProps[prop];
            }
            if (!providedProps.style) return;
            customStylesFunctions.push(() => {
              if (providedProps.style[0]) {
                providedProps.style.forEach((style) => {
                  styleProp.push(style);
                  trackTransform(style);
                });
              } else {
                styleProp.push(providedProps.style);
                trackTransform(providedProps.style);
              }
            });
          };
          const applySingleOverride = (override) => {
            const isComponentOverride = override?.props;
            if (isComponentOverride) {
              return applySingleOverride(override.props);
            }
            if (typeof override === "object") {
              return applyVariantStyles(override);
            }
          };
          const applyOverrides = (overrides) => {
            if (typeof overrides === "function") {
              const overrideContext = overridesHanlder.getOverrideContext(presence);
              const result = overrides(overrideContext);
              if (!result) return;
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
            const overrides = nextProps.overrides;
            delete nextProps.overrides;
            styles.variantHandler.start();
            applyOverrides(overrides);
            const variantStyle2 = styles.variantHandler.getStylesheet();
            if (variantStyle2) {
              styleProp.push(variantStyle2);
              trackTransform(variantStyle2);
            }
          }
          if ("stateId" in nextProps) {
            delete nextProps.stateId;
          }
          if (transformAcc) {
            styleProp.push({
              transform: Object.entries(
                transformAcc.reduce((acc, curr) => {
                  const propName = Object.keys(curr)[0];
                  acc[propName] = curr[propName];
                  return acc;
                }, {})
              ).map(([key, value]) => ({
                [key]: value
              }))
            });
          }
          const componentProps = {
            ...nextProps,
            style: styleProp
          };
          const hasAnimatedHook = nextProps.style || nextProps.transition || nextProps.animation || props.overrides;
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
            /* @__PURE__ */ React9.createElement(
              ComponentToRender,
              {
                ...componentProps,
                ref: (ref) => {
                  compRef.current = ref;
                  if (props.ref) {
                    if (typeof props.ref === "function") {
                      props.ref(ref);
                    } else {
                      props.ref.current = ref;
                    }
                  }
                }
              }
            ),
            [
              componentProps.gesture && ((props2) => /* @__PURE__ */ React9.createElement(GestureDetector, { gesture: componentProps.gesture, ...props2 })),
              props.stateId && ((props2) => /* @__PURE__ */ React9.createElement(
                Interaction.Provider,
                {
                  stateId: props2.stateId,
                  state: overridesHanlder.getOverrideContext(presence),
                  ...props2
                }
              ))
            ]
          );
        };
        configByComponent.set(component, {
          root: surfaceConfig?.root || Component,
          parent: Component,
          styleFactory,
          styleManager
        });
        return Object.assign(component, {
          useVariant: (variant, value) => {
            const theme = useSurfaceTheme();
            const styles = styleManager.getStylesheetForTheme(theme);
            styles.variantHandler.start();
            styles.variantHandler.visit({ [variant]: value }, variant);
            return styles.variantHandler.getStylesheet({ raw: true });
          }
        });
      }
    };
  };
  return Object.assign(surfaced, {
    useTheme: useSurfaceTheme,
    useFonts: useFonts$1,
    useOrientation: useDeviceOrientation,
    useVariantStyle: (component, variant, value) => {
      const theme = useSurfaceTheme();
      const surfaceConfig = configByComponent.get(component);
      if (!surfaceConfig) return {};
      const styleManager = surfaceConfig?.styleManager.getStylesheetForTheme(theme);
      const styles = styleManager.getStylesheetForTheme(theme);
      styles.variantHandler.start();
      styles.variantHandler.visit({ [variant]: value }, variant);
      const stylesheet = styles.variantHandler.getStylesheet({ raw: true });
      return stylesheet;
    },
    useMediaQuery,
    Provider: ThemeProvider,
    any: surfaceAny,
    boolean: booleanStyle
  });
};

// src/lib/properties.ts
var Position = {
  "static": { position: "static" },
  "relative": { position: "relative" },
  "absolute": { position: "absolute" },
  "fixed": { position: "fixed" },
  "sticky": { position: "sticky" }
};
var ContentSizing = {
  borderBox: { boxSizing: "border-box" },
  contentBox: { boxSizing: "content-box" }
};
var Cursor = {
  "auto": { cursor: "auto" },
  "default": { cursor: "default" },
  "none": { cursor: "none" },
  "context-menu": { cursor: "context-menu" },
  "help": { cursor: "help" },
  "pointer": { cursor: "pointer" },
  "progress": { cursor: "progress" },
  "wait": { cursor: "wait" },
  "cell": { cursor: "cell" },
  "zoom-in": { cursor: "zoom-in" },
  "zoom-out": { cursor: "zoom-out" },
  "grab": { cursor: "grab" },
  "grabbing": { cursor: "grabbing" },
  "ew-resize": { cursor: "ew-resize" },
  "ns-resize": { cursor: "ns-resize" },
  "nesw-resize": { cursor: "nesw-resize" },
  "nwse-resize": { cursor: "nwse-resize" },
  "col-resize": { cursor: "col-resize" },
  "row-resize": { cursor: "row-resize" },
  "all-scroll": { cursor: "all-scroll" },
  "copy": { cursor: "copy" },
  "move": { cursor: "move" },
  "no-drop": { cursor: "no-drop" },
  "text": { cursor: "text" },
  "crosshair": { cursor: "crosshair" },
  "unset": { cursor: "unset" },
  "revert": { cursor: "revert" },
  "inherit": { cursor: "inherit" },
  "initial": { cursor: "initial" },
  "revert-layer": { cursor: "revert-layer" },
  "auto-fill": { cursor: "auto-fill" },
  "auto-fit": { cursor: "auto-fit" },
  "-moz-grab": { cursor: "-moz-grab" },
  "-moz-grabbing": { cursor: "-moz-grabbing" },
  "-webkit-grab": { cursor: "-webkit-grab" },
  "-webkit-grabbing": { cursor: "-webkit-grabbing" },
  "-webkit-zoom-in": { cursor: "-webkit-zoom-in" },
  "-webkit-zoom-out": { cursor: "-webkit-zoom-out" },
  "e-resize": { cursor: "e-resize" },
  "n-resize": { cursor: "n-resize" },
  "ne-resize": { cursor: "ne-resize" },
  "nw-resize": { cursor: "nw-resize" },
  "s-resize": { cursor: "s-resize" },
  "se-resize": { cursor: "se-resize" },
  "sw-resize": { cursor: "sw-resize" },
  "w-resize": { cursor: "w-resize" },
  "-moz-initial": { cursor: "-moz-initial" },
  "-webkit-initial": { cursor: "-webkit-initial" },
  "vertical-text": { cursor: "vertical-text" },
  "alias": { cursor: "alias" },
  "not-allowed": { cursor: "not-allowed" }
};

// src/createViewBase.tsx
var transform = (style, config) => {
  const key = config.variant;
  const value = config.active;
  if (!style.transform) style.transform = [];
  const transformName = config.config.attribute || key;
  style.transform.push({
    [transformName]: value
  });
};
var createViewBase = (surfaced) => surfaced(View).with((tokens) => ({
  variants: {
    position: Position,
    zIndex: surfaced.any({ attribute: "zIndex", number: true }),
    z: surfaced.any({ attribute: "zIndex", number: true }),
    absoluteFill: { true: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } },
    absolute: { true: Position.absolute },
    fixed: { true: Position.fixed },
    sticky: { true: Position.sticky },
    relative: { true: Position.relative },
    static: { true: Position.static },
    top: surfaced.any({ attribute: "top", number: true, tokens: tokens.size }),
    bottom: surfaced.any({ attribute: "bottom", number: true, tokens: tokens.size }),
    left: surfaced.any({ attribute: "left", number: true, tokens: tokens.size }),
    right: surfaced.any({ attribute: "right", number: true, tokens: tokens.size }),
    start: surfaced.any({ attribute: "start", number: true, tokens: tokens.size }),
    end: surfaced.any({ attribute: "end", number: true, tokens: tokens.size }),
    // Padding
    padding: surfaced.any({ attribute: "padding", number: true, tokens: tokens.size }),
    paddingHorizontal: surfaced.any({ attribute: "paddingHorizontal", number: true, tokens: tokens.size }),
    paddingVertical: surfaced.any({ attribute: "paddingVertical", number: true, tokens: tokens.size }),
    paddingTop: surfaced.any({ attribute: "paddingTop", number: true, tokens: tokens.size }),
    paddingBottom: surfaced.any({ attribute: "paddingBottom", number: true, tokens: tokens.size }),
    paddingLeft: surfaced.any({ attribute: "paddingLeft", number: true, tokens: tokens.size }),
    paddingRight: surfaced.any({ attribute: "paddingRight", number: true, tokens: tokens.size }),
    p: surfaced.any({ attribute: "padding", number: true, tokens: tokens.size }),
    px: surfaced.any({ attribute: "paddingHorizontal", number: true, tokens: tokens.size }),
    py: surfaced.any({ attribute: "paddingVertical", number: true, tokens: tokens.size }),
    pt: surfaced.any({ attribute: "paddingTop", number: true, tokens: tokens.size }),
    pb: surfaced.any({ attribute: "paddingBottom", number: true, tokens: tokens.size }),
    pl: surfaced.any({ attribute: "paddingLeft", number: true, tokens: tokens.size }),
    pr: surfaced.any({ attribute: "paddingRight", number: true, tokens: tokens.size }),
    paddingBlock: surfaced.any({ attribute: "paddingBlockStart", number: true, tokens: tokens.size }),
    paddingBlockStart: surfaced.any({ attribute: "paddingBlockStart", number: true, tokens: tokens.size }),
    paddingBlockEnd: surfaced.any({ attribute: "paddingBlockEnd", number: true, tokens: tokens.size }),
    paddingInline: surfaced.any({ attribute: "paddingInline", number: true, tokens: tokens.size }),
    paddingInlineStart: surfaced.any({ attribute: "paddingInlineStart", number: true, tokens: tokens.size }),
    paddingInlineEnd: surfaced.any({ attribute: "paddingInlineEnd", number: true, tokens: tokens.size }),
    paddingStart: surfaced.any({ attribute: "paddingStart", number: true, tokens: tokens.size }),
    paddingEnd: surfaced.any({ attribute: "paddingEnd", number: true, tokens: tokens.size }),
    inset: surfaced.any({ attribute: "inset", number: true, tokens: tokens.size }),
    insetBlock: surfaced.any({ attribute: "insetBlockStart", number: true, tokens: tokens.size }),
    insetBlockStart: surfaced.any({ attribute: "insetBlockStart", number: true, tokens: tokens.size }),
    insetBlockEnd: surfaced.any({ attribute: "insetBlockEnd", number: true, tokens: tokens.size }),
    insetInline: surfaced.any({ attribute: "insetInline", number: true, tokens: tokens.size }),
    insetInlineStart: surfaced.any({ attribute: "insetInlineStart", number: true, tokens: tokens.size }),
    insetInlineEnd: surfaced.any({ attribute: "insetInlineEnd", number: true, tokens: tokens.size }),
    // Margin
    margin: surfaced.any({ attribute: "margin", number: true, tokens: tokens.size }),
    marginBottom: surfaced.any({ attribute: "marginBottom", number: true, tokens: tokens.size }),
    marginLeft: surfaced.any({ attribute: "marginLeft", number: true, tokens: tokens.size }),
    marginRight: surfaced.any({ attribute: "marginRight", number: true, tokens: tokens.size }),
    marginTop: surfaced.any({ attribute: "marginTop", number: true, tokens: tokens.size }),
    marginHorizontal: surfaced.any({ attribute: "marginHorizontal", number: true, tokens: tokens.size }),
    marginVertical: surfaced.any({ attribute: "marginVertical", number: true, tokens: tokens.size }),
    m: surfaced.any({ attribute: "margin", number: true, tokens: tokens.size }),
    mx: surfaced.any({ attribute: "marginHorizontal", number: true, tokens: tokens.size }),
    my: surfaced.any({ attribute: "marginVertical", number: true, tokens: tokens.size }),
    mt: surfaced.any({ attribute: "marginTop", number: true, tokens: tokens.size }),
    mb: surfaced.any({ attribute: "marginBottom", number: true, tokens: tokens.size }),
    ml: surfaced.any({ attribute: "marginLeft", number: true, tokens: tokens.size }),
    mr: surfaced.any({ attribute: "marginRight", number: true, tokens: tokens.size }),
    marginBlock: surfaced.any({ attribute: "marginBlock", number: true, tokens: tokens.size }),
    marginBlockStart: surfaced.any({ attribute: "marginBlockStart", number: true, tokens: tokens.size }),
    marginBlockEnd: surfaced.any({ attribute: "marginBlockEnd", number: true, tokens: tokens.size }),
    marginInline: surfaced.any({ attribute: "marginInline", number: true, tokens: tokens.size }),
    marginInlineStart: surfaced.any({ attribute: "marginInlineStart", number: true, tokens: tokens.size }),
    marginInlineEnd: surfaced.any({ attribute: "marginInlineEnd", number: true, tokens: tokens.size }),
    marginStart: surfaced.any({ attribute: "marginStart", number: true, tokens: tokens.size }),
    marginEnd: surfaced.any({ attribute: "marginEnd", number: true, tokens: tokens.size }),
    // Layout
    sizeX: surfaced.any({ attributes: ["width", "maxWidth", "minWidth"], number: true, percentage: true, tokens: tokens.size }),
    sizeY: surfaced.any({ attributes: ["height", "maxHeight", "minHeight"], number: true, percentage: true, tokens: tokens.size }),
    sizeXY: surfaced.any({ attributes: ["width", "maxWidth", "minWidth", "height", "maxHeight", "minHeight"], number: true, percentage: true, tokens: tokens.size }),
    width: surfaced.any({ attribute: "width", number: true, percentage: true, tokens: tokens.size }),
    height: surfaced.any({ attribute: "height", number: true, percentage: true, tokens: tokens.size }),
    minWidth: surfaced.any({ attribute: "minWidth", number: true, percentage: true, tokens: tokens.size }),
    minHeight: surfaced.any({ attribute: "minHeight", number: true, percentage: true, tokens: tokens.size }),
    maxWidth: surfaced.any({ attribute: "maxWidth", number: true, percentage: true, tokens: tokens.size }),
    maxHeight: surfaced.any({ attribute: "maxHeight", number: true, percentage: true, tokens: tokens.size }),
    // Transforms
    rotate: surfaced.any({ custom: transform, attribute: "rotate", number: true, angle: true }),
    rotateX: surfaced.any({ custom: transform, attribute: "rotateX", number: true, angle: true }),
    rotateY: surfaced.any({ custom: transform, attribute: "rotateY", number: true, angle: true }),
    rotateZ: surfaced.any({ custom: transform, attribute: "rotateZ", number: true, angle: true }),
    x: surfaced.any({ custom: transform, attribute: "translateX", number: true, tokens: tokens.size }),
    y: surfaced.any({ custom: transform, attribute: "translateY", number: true, tokens: tokens.size }),
    translateX: surfaced.any({ custom: transform, attribute: "translateX", number: true, tokens: tokens.size }),
    translateY: surfaced.any({ custom: transform, attribute: "translateY", number: true, tokens: tokens.size }),
    scale: surfaced.any({ custom: transform, attribute: "scale", number: true }),
    scaleX: surfaced.any({ custom: transform, attribute: "scaleX", number: true }),
    scaleY: surfaced.any({ custom: transform, attribute: "scaleY", number: true }),
    skewX: surfaced.any({ custom: transform, attribute: "skewX", number: true }),
    skewY: surfaced.any({ custom: transform, attribute: "skewY", number: true }),
    perspective: surfaced.any({ attribute: "perspective", number: true }),
    perspectiveOrigin: surfaced.any({ attribute: "perspectiveOrigin", string: true }),
    transformOrigin: surfaced.any({ attribute: "transformOrigin", string: true }),
    // Flex
    flex: surfaced.any({ attribute: "flex", number: true }),
    flexDirection: {
      "row": { flexDirection: "row" },
      "column": { flexDirection: "column" },
      "row-reverse": { flexDirection: "row-reverse" },
      "column-reverse": { flexDirection: "column-reverse" }
    },
    alignItems: {
      "flex-start": { alignItems: "flex-start" },
      "flex-end": { alignItems: "flex-end" },
      "center": { alignItems: "center" },
      "stretch": { alignItems: "stretch" },
      "baseline": { alignItems: "baseline" }
    },
    itemsStart: { true: { alignItems: "flex-start" } },
    itemsEnd: { true: { alignItems: "flex-end" } },
    itemsCenter: { true: { alignItems: "center" } },
    itemsStretch: { true: { alignItems: "stretch" } },
    itemsBaseline: { true: { alignItems: "baseline" } },
    justifyContent: {
      "flex-start": { justifyContent: "flex-start" },
      "flex-end": { justifyContent: "flex-end" },
      "center": { justifyContent: "center" },
      "space-between": { justifyContent: "space-between" },
      "space-around": { justifyContent: "space-around" },
      "space-evenly": { justifyContent: "space-evenly" }
    },
    justifyStart: { true: { justifyContent: "flex-start" } },
    justifyEnd: { true: { justifyContent: "flex-end" } },
    justifyCenter: { true: { justifyContent: "center" } },
    justifyBetween: { true: { justifyContent: "space-between" } },
    justifyAround: { true: { justifyContent: "space-around" } },
    justifyEvenly: { true: { justifyContent: "space-evenly" } },
    alignContent: {
      "flex-start": { alignContent: "flex-start" },
      "flex-end": { alignContent: "flex-end" },
      "center": { alignContent: "center" },
      "stretch": { alignContent: "stretch" },
      "space-between": { alignContent: "space-between" },
      "space-around": { alignContent: "space-around" },
      "space-evenly": { alignContent: "space-evenly" }
    },
    contentStart: { true: { alignContent: "flex-start" } },
    contentEnd: { true: { alignContent: "flex-end" } },
    contentCenter: { true: { alignContent: "center" } },
    contentStretch: { true: { alignContent: "stretch" } },
    contentBetween: { true: { alignContent: "space-between" } },
    contentAround: { true: { alignContent: "space-around" } },
    contentEvenly: { true: { alignContent: "space-evenly" } },
    alignSelf: {
      "auto": { alignSelf: "auto" },
      "flex-start": { alignSelf: "flex-start" },
      "flex-end": { alignSelf: "flex-end" },
      "center": { alignSelf: "center" },
      "stretch": { alignSelf: "stretch" },
      "baseline": { alignSelf: "baseline" }
    },
    selfAuto: { true: { alignSelf: "auto" } },
    selfStart: { true: { alignSelf: "flex-start" } },
    selfEnd: { true: { alignSelf: "flex-end" } },
    selfCenter: { true: { alignSelf: "center" } },
    selfStretch: { true: { alignSelf: "stretch" } },
    selfBaseline: { true: { alignSelf: "baseline" } },
    flexWrap: {
      true: { flexWrap: "wrap" },
      "wrap": { flexWrap: "wrap" },
      "nowrap": { flexWrap: "nowrap" },
      "wrap-reverse": { flexWrap: "wrap-reverse" }
    },
    wrap: { true: { flexWrap: "wrap" } },
    nowrap: { true: { flexWrap: "nowrap" } },
    wrapReverse: { true: { flexWrap: "wrap-reverse" } },
    flexGrow: surfaced.any({ attribute: "flexGrow", number: true }),
    flexShrink: surfaced.any({ attribute: "flexShrink", number: true }),
    flexBasis: surfaced.any({ attribute: "flexBasis", number: true }),
    gap: surfaced.any({ attribute: "gap", number: true, percentage: true, tokens: tokens.size }),
    // Grid Item
    row: surfaced.any({ attribute: "row", number: true, string: true }),
    column: surfaced.any({ attribute: "column", number: true, string: true }),
    rowSpan: surfaced.any({ attribute: "rowSpan", number: true, string: true }),
    columnSpan: surfaced.any({ attribute: "columnSpan", number: true, string: true }),
    rowStart: surfaced.any({ attribute: "rowStart", number: true, string: true }),
    columnStart: surfaced.any({ attribute: "columnStart", number: true, string: true }),
    rowEnd: surfaced.any({ attribute: "rowEnd", number: true, string: true }),
    columnEnd: surfaced.any({ attribute: "columnEnd", number: true, string: true }),
    area: surfaced.any({ attribute: "area", string: true }),
    order: surfaced.any({ attribute: "order", number: true, string: true }),
    // Background
    backgroundAttachment: surfaced.any({ attribute: "backgroundAttachment", string: true }),
    backgroundBlendMode: surfaced.any({ attribute: "backgroundBlendMode", string: true }),
    backgroundClip: surfaced.any({ attribute: "backgroundClip", string: true }),
    backgroundColor: surfaced.any({ attribute: "backgroundColor", color: true, tokens: tokens.colors }),
    bg: surfaced.any({ attribute: "backgroundColor", color: true, tokens: tokens.colors }),
    backgroundOrigin: surfaced.any({ attribute: "backgroundOrigin", string: true }),
    backgroundPosition: surfaced.any({ attribute: "backgroundPosition", string: true }),
    backgroundSize: surfaced.any({ attribute: "backgroundSize", string: true }),
    backgroundImage: surfaced.any({ attribute: "backgroundImage", string: true }),
    backgroundRepeat: {
      "repeat": { backgroundRepeat: "repeat" },
      "repeat-x": { backgroundRepeat: "repeat-x" },
      "repeat-y": { backgroundRepeat: "repeat-y" },
      "no-repeat": { backgroundRepeat: "no-repeat" },
      "space": { backgroundRepeat: "space" }
    },
    // Border
    borderRadius: surfaced.any({ attribute: "borderRadius", number: true, tokens: tokens.size }),
    borderTopLeftRadius: surfaced.any({ attribute: "borderTopLeftRadius", number: true, tokens: tokens.size }),
    borderTopRightRadius: surfaced.any({ attribute: "borderTopRightRadius", number: true, tokens: tokens.size }),
    borderBottomLeftRadius: surfaced.any({ attribute: "borderBottomLeftRadius", number: true, tokens: tokens.size }),
    borderBottomRightRadius: surfaced.any({ attribute: "borderBottomRightRadius", number: true, tokens: tokens.size }),
    borderStartStartRadius: surfaced.any({ attribute: "borderStartStartRadius", number: true, tokens: tokens.size }),
    borderStartEndRadius: surfaced.any({ attribute: "borderStartEndRadius", number: true, tokens: tokens.size }),
    borderEndStartRadius: surfaced.any({ attribute: "borderEndStartRadius", number: true, tokens: tokens.size }),
    borderEndEndRadius: surfaced.any({ attribute: "borderEndEndRadius", number: true, tokens: tokens.size }),
    borderTopStartRadius: surfaced.any({ attribute: "borderTopStartRadius", number: true, tokens: tokens.size }),
    borderTopEndRadius: surfaced.any({ attribute: "borderTopEndRadius", number: true, tokens: tokens.size }),
    borderBottomStartRadius: surfaced.any({ attribute: "borderBottomStartRadius", number: true, tokens: tokens.size }),
    borderBottomEndRadius: surfaced.any({ attribute: "borderBottomEndRadius", number: true, tokens: tokens.size }),
    borderColor: surfaced.any({ attribute: "borderColor", color: true, tokens: tokens.colors }),
    borderTopColor: surfaced.any({ attribute: "borderTopColor", color: true, tokens: tokens.colors }),
    borderRightColor: surfaced.any({ attribute: "borderRightColor", color: true, tokens: tokens.colors }),
    borderBottomColor: surfaced.any({ attribute: "borderBottomColor", color: true, tokens: tokens.colors }),
    borderLeftColor: surfaced.any({ attribute: "borderLeftColor", color: true, tokens: tokens.colors }),
    borderStartColor: surfaced.any({ attribute: "borderStartColor", color: true, tokens: tokens.colors }),
    borderEndColor: surfaced.any({ attribute: "borderEndColor", color: true, tokens: tokens.colors }),
    borderBlockColor: surfaced.any({ attribute: "borderBlockColor", color: true, tokens: tokens.colors }),
    borderBlockStartColor: surfaced.any({ attribute: "borderBlockStartColor", color: true, tokens: tokens.colors }),
    borderBlockEndColor: surfaced.any({ attribute: "borderBlockEndColor", color: true, tokens: tokens.colors }),
    borderWidth: surfaced.any({ attribute: "borderWidth", number: true, tokens: tokens.size }),
    borderTopWidth: surfaced.any({ attribute: "borderTopWidth", number: true, tokens: tokens.size }),
    borderRightWidth: surfaced.any({ attribute: "borderRightWidth", number: true, tokens: tokens.size }),
    borderBottomWidth: surfaced.any({ attribute: "borderBottomWidth", number: true, tokens: tokens.size }),
    borderLeftWidth: surfaced.any({ attribute: "borderLeftWidth", number: true, tokens: tokens.size }),
    borderStartWidth: surfaced.any({ attribute: "borderStartWidth", number: true, tokens: tokens.size }),
    borderEndWidth: surfaced.any({ attribute: "borderEndWidth", number: true, tokens: tokens.size }),
    borderBlockWidth: surfaced.any({ attribute: "borderBlockWidth", number: true, tokens: tokens.size }),
    borderBlockStartWidth: surfaced.any({ attribute: "borderBlockStartWidth", number: true, tokens: tokens.size }),
    borderBlockEndWidth: surfaced.any({ attribute: "borderBlockEndWidth", number: true, tokens: tokens.size }),
    borderCurve: {
      circular: { borderCurve: "circular" },
      continuous: { borderCurve: "continuous" }
    },
    borderStyle: {
      solid: { borderStyle: "solid" },
      dashed: { borderStyle: "dashed" },
      dotted: { borderStyle: "dotted" }
    },
    outline: surfaced.any({ attribute: "outline", string: true }),
    outlineColor: surfaced.any({ attribute: "outlineColor", color: true, tokens: tokens.colors }),
    outlineWidth: surfaced.any({ attribute: "outlineWidth", number: true, tokens: tokens.size }),
    outlineOffset: surfaced.any({ attribute: "outlineOffset", number: true, tokens: tokens.size }),
    outlineStyle: {
      "solid": { outlineStyle: "solid" },
      "dashed": { outlineStyle: "dashed" },
      "dotted": { outlineStyle: "dotted" }
    },
    // Misc
    aspectRatio: surfaced.any({ attribute: "aspectRatio", number: true }),
    opacity: surfaced.any({ attribute: "opacity", number: true }),
    boxSizing: ContentSizing,
    borderBox: { true: ContentSizing.borderBox },
    contentBox: { true: ContentSizing.contentBox },
    cursor: Cursor,
    overflow: {
      "visible": { overflow: "visible" },
      "hidden": { overflow: "hidden" },
      "scroll": { overflow: "scroll" }
    },
    overflowVisible: { true: { overflow: "visible" } },
    overflowHidden: { true: { overflow: "hidden" } },
    overflowScroll: { true: { overflow: "scroll" } },
    overflowX: {
      "visible": { overflowX: "visible" },
      "hidden": { overflowX: "hidden" },
      "scroll": { overflowX: "scroll" }
    },
    overflowXVisible: { true: { overflowX: "visible" } },
    overflowXHidden: { true: { overflowX: "hidden" } },
    overflowXScroll: { true: { overflowX: "scroll" } },
    overflowY: {
      "visible": { overflowY: "visible" },
      "hidden": { overflowY: "hidden" },
      "scroll": { overflowY: "scroll" }
    },
    overflowYVisible: { true: { overflowY: "visible" } },
    overflowYHidden: { true: { overflowY: "hidden" } },
    overflowYScroll: { true: { overflowY: "scroll" } },
    display: {
      "none": { display: "none" },
      "flex": { display: "flex" }
    },
    visibility: {
      "visible": { visibility: "visible" },
      "hidden": { visibility: "hidden" },
      "collapse": { visibility: "collapse" }
    },
    visibilityVisible: { true: { visibility: "visible" } },
    visibilityHidden: { true: { visibility: "hidden" } },
    visibilityCollapse: { true: { visibility: "collapse" } },
    backdropFilter: surfaced.any({ attribute: "backdropFilter", string: true }),
    backfaceVisibility: {
      hidden: { backfaceVisibility: "hidden" },
      visible: { backfaceVisibility: "visible" }
    },
    elevation: surfaced.any({ attribute: "elevation", number: true }),
    boxShadow: surfaced.any({ attribute: "boxShadow", string: true }),
    overscrollBehavior: {
      "auto": { overscrollBehavior: "auto" },
      "contain": { overscrollBehavior: "contain" },
      "none": { overscrollBehavior: "none" }
    },
    userSelect: {
      "none": { userSelect: "none" },
      "text": { userSelect: "text" },
      "all": { userSelect: "all" },
      "auto": { userSelect: "auto" }
    },
    willChange: surfaced.any({ attribute: "willChange", string: true }),
    pointerEvents: {
      "auto": { pointerEvents: "auto" },
      "none": { pointerEvents: "none" },
      "box-none": { pointerEvents: "box-none" },
      "box-only": { pointerEvents: "box-only" }
    },
    direction: {
      "ltr": { direction: "ltr" },
      "rtl": { direction: "rtl" },
      "inherit": { direction: "inherit" }
    },
    mixBlendMode: {
      "normal": { mixBlendMode: "normal" },
      "multiply": { mixBlendMode: "multiply" },
      "screen": { mixBlendMode: "screen" },
      "overlay": { mixBlendMode: "overlay" },
      "darken": { mixBlendMode: "darken" },
      "lighten": { mixBlendMode: "lighten" },
      "color-dodge": { mixBlendMode: "color" },
      "color-burn": { mixBlendMode: "color" },
      "hard-light": { mixBlendMode: "hard-light" },
      "soft-light": { mixBlendMode: "soft-light" },
      "difference": { mixBlendMode: "difference" },
      "exclusion": { mixBlendMode: "exclusion" },
      "hue": { mixBlendMode: "hue" },
      "saturation": { mixBlendMode: "saturation" },
      "color": { mixBlendMode: "color" },
      "luminosity": { mixBlendMode: "luminosity" }
    },
    clip: surfaced.any({ attribute: "clip", string: true }),
    filter: surfaced.any({ attribute: "filter", string: true }),
    isolation: {
      "auto": { isolation: "auto" },
      "isolate": { isolation: "isolate" }
    },
    overscrollBehaviorX: {
      "auto": { overscrollBehaviorX: "auto" },
      "contain": { overscrollBehaviorX: "contain" },
      "none": { overscrollBehaviorX: "none" }
    },
    overscrollBehaviorY: {
      "auto": { overscrollBehaviorY: "auto" },
      "contain": { overscrollBehaviorY: "contain" },
      "none": { overscrollBehaviorY: "none" }
    },
    rotation: surfaced.any({ attribute: "rotation", string: true }),
    // Animations & Transition
    transitionProperty: surfaced.any({ attribute: "transitionProperty", multiple: true, string: true }),
    transitionDuration: surfaced.any({ attribute: "transitionDuration", multiple: true, number: true }),
    transitionTimingFunction: surfaced.any({ attribute: "transitionTimingFunction", multiple: true, string: true }),
    transitionDelay: surfaced.any({ attribute: "transitionDelay", multiple: true, number: true }),
    transitionBehavior: {
      allowDiscrete: { transitionBehavior: "allow-discrete" },
      normal: { transitionBehavior: "normal" }
    },
    animationName: surfaced.any({ attribute: "animationName", any: true }),
    animationDuration: surfaced.any({ attribute: "animationDuration", multiple: true, number: true, time: true }),
    animationDelay: surfaced.any({ attribute: "animationDelay", multiple: true, number: true, time: true }),
    animationTimingFunction: surfaced.any({
      attribute: "animationTimingFunction",
      multiple: true,
      tokens: {
        "linear": "linear",
        "ease": "ease",
        "easeIn": "ease-in",
        "easeOut": "ease-out",
        "easeInOut": "ease-in-out",
        "stepStart": "step-start",
        "stepEnd": "step-end"
      }
    }),
    animationDirection: surfaced.any({
      attribute: "animationDirection",
      multiple: true,
      tokens: {
        normal: "normal",
        reverse: "reverse",
        alternate: "alternate",
        alternateReverse: "alternate-reverse"
      }
    }),
    animationIterationCount: surfaced.any({
      attribute: "animationIterationCount",
      multiple: true,
      number: true,
      tokens: {
        "infinity": "infinite"
      }
    }),
    animationFillMode: surfaced.any({
      attribute: "animationFillMode",
      multiple: true,
      tokens: {
        forwards: "forwards",
        backwards: "backwards",
        both: "both",
        none: "none"
      }
    }),
    animationPlayState: surfaced.any({
      attribute: "animationPlayState",
      multiple: true,
      tokens: {
        running: "running",
        paused: "paused"
      }
    })
  }
}));
var createTextBase = (surfaced) => surfaced(Text).with((tokens) => ({
  variants: {
    fontFamily: surfaced.any({ attribute: "fontFamily", fonts: true, tokens: tokens.fonts }),
    fontSize: surfaced.any({ attribute: "fontSize", number: true, tokens: tokens.size }),
    lineHeight: surfaced.any({ attribute: "lineHeight", number: true, tokens: tokens.size }),
    color: surfaced.any({ attribute: "color", color: true, tokens: tokens.colors }),
    textAlignVertical: surfaced.any({ attribute: "textAlignVertical", string: true, tokens: ["auto", "top", "bottom", "center"] }),
    textAlign: surfaced.any({ attribute: "textAlign", string: true, tokens: ["auto", "left", "center", "right", "justify"] }),
    textDecorationStyle: surfaced.any({ attribute: "textDecorationStyle", string: true, tokens: ["none", "double", "dashed", "dotted", "solid"] }),
    textDecorationLine: surfaced.any({ attribute: "textDecorationLine", string: true, tokens: ["none", "line-through", "underline", "underline line-through"] }),
    textDecorationColor: surfaced.any({ attribute: "textDecorationColor", color: true, tokens: tokens.colors }),
    opacity: surfaced.any({ attribute: "opacity", number: true }),
    cursor: Cursor
  }
}));

export { createSurfaced, createTextBase, createTheme, createViewBase };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map