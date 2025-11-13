'use strict';

var expoFont = require('expo-font');
var React9 = require('react');
var reactNative = require('react-native');
var reactNativeGestureHandler = require('react-native-gesture-handler');
var Animated = require('react-native-reanimated');
var reactNativeWorklets = require('react-native-worklets');
var expoScreenOrientation = require('expo-screen-orientation');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React9__default = /*#__PURE__*/_interopDefault(React9);
var Animated__default = /*#__PURE__*/_interopDefault(Animated);

// src/surface.tsx
var ANIMATE_PRESENCE_PROPS_KEY = "__AnimatePresenceProps__";
var getAnimatedPresenceProps = (props) => {
  const animtePresencProps = props[ANIMATE_PRESENCE_PROPS_KEY] || {};
  return animtePresencProps;
};
var AnimatePresenceContext = React9__default.default.createContext(null);
var AnimatePresence = (props) => {
  console.log("ANIMATE PRESENCE ENTER");
  const mode = props.mode || "sync";
  const propagate = props.propagate || false;
  const parentPresence = React9__default.default.useContext(AnimatePresenceContext);
  const [store, setStore] = React9__default.default.useState(() => ({
    isInitial: true,
    renderedChildKeys: /* @__PURE__ */ new Set(),
    enteredKeys: /* @__PURE__ */ new Set(),
    keysBeforeExit: /* @__PURE__ */ new Set(),
    // These indexes are used to track exiting elements indexes
    // These are used to maintain exiting element placemenets. 
    exitedIndexes: [],
    contextByKey: /* @__PURE__ */ new Map(),
    animatingKeys: /* @__PURE__ */ new Set()
  }));
  const rerender = () => setStore((p) => ({ ...p }));
  store.renderedChildKeys.clear();
  console.log("ANIMATING KEYS", Array.from(store.animatingKeys));
  const childrenArr = (
    // @ts-expect-error
    props.children?.length > -1 ? props.children : [props.children]
  );
  const children = childrenArr.filter((c) => !!c).map((child, index, arr) => {
    const isLast = arr.length - 1 === index;
    if (!child.key) return child;
    const removeExitingChild = () => {
      if (context.isPresent) {
        return;
      }
      const isAnimatingExit = store.animatingKeys.has(child.key);
      if (!isAnimatingExit) {
        store.contextByKey.delete(child.key);
        store.exitedIndexes.push(context.index);
        store.exitedIndexes.sort();
        rerender();
      }
    };
    const context = {
      key: child.key,
      isInitial: store.isInitial,
      index,
      isLast,
      element: child,
      get entered() {
        const hasEntered = store.enteredKeys.has(child.key);
        return hasEntered;
      },
      get entering() {
        const isPresent = context.isPresent;
        const isAnimatingEnter = store.animatingKeys.has(child.key);
        const hasEntered = context.entered;
        return isPresent && isAnimatingEnter && !hasEntered;
      },
      get isPresent() {
        if (propagate && !parentPresence?.isPresent) {
          return false;
        }
        const isRenderedNormally = store.renderedChildKeys.has(child.key);
        return isRenderedNormally;
      },
      lifecycle: {
        onRender() {
          if (context.isPresent) {
            Promise.resolve().then(() => {
              removeExitingChild();
            });
          }
        },
        onAnimationStart() {
          store.animatingKeys.add(child.key);
        },
        onAnimationEnd() {
          store.animatingKeys.delete(child.key);
          if (context.isPresent) {
            store.enteredKeys.add(child.key);
          } else {
            removeExitingChild();
          }
        }
      }
    };
    store.renderedChildKeys.add(child.key);
    store.contextByKey.set(child.key, context);
    return /* @__PURE__ */ React9__default.default.createElement(AnimatePresenceContext.Provider, { key: child.key, value: { ...context } }, child);
  });
  const exitingChildrenKeys = /* @__PURE__ */ new Set();
  store.contextByKey.forEach((context) => {
    const child = context.element;
    if (!(typeof child === "object")) return;
    if (!("key" in child)) return;
    const childKey = child.key;
    const childStillInTree = store.renderedChildKeys.has(childKey);
    if (childStillInTree) return;
    console.log("EXITING ELEMENT", childKey);
    exitingChildrenKeys.add(childKey);
    const animatedExitingElement = /* @__PURE__ */ React9__default.default.createElement(
      AnimatePresenceContext.Provider,
      {
        key: childKey,
        value: { ...context }
      },
      child
    );
    if (context.isLast) {
      children.push(animatedExitingElement);
    } else {
      const exitedIndexesBefore = store.exitedIndexes.filter((removedIdx) => context.index > removedIdx);
      children.splice(context.index - exitedIndexesBefore.length, 0, animatedExitingElement);
    }
  });
  const hasExitingElements = exitingChildrenKeys.size > 0;
  console.log("hasExitingElements", Array.from(exitingChildrenKeys));
  if (!hasExitingElements) {
    console.log("SETUP keysBeforeExit", Array.from(store.renderedChildKeys));
    store.keysBeforeExit = new Set(Array.from(store.renderedChildKeys));
  } else {
    children.forEach((child, index) => {
      if (!child?.key) return;
      const isPresentBeforeAnyExit = store.keysBeforeExit.has(child.key);
      if (mode === "wait" && !isPresentBeforeAnyExit) {
        console.log("REMOVED", child.key);
        children[index] = /* @__PURE__ */ React9__default.default.createElement(React9__default.default.Fragment, null);
      }
    });
  }
  console.log("ANIMATE PRESENCE AFTER");
  store.isInitial = false;
  store.exitedIndexes = [];
  return children;
};

// src/lib/anyConfig.ts
var VariantFactoryKey = "__InternalAnyConfig__";
var attribute = (config) => {
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
var surfaceContext = React9__default.default.createContext(null);
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
  const animatedComponent = Animated__default.default[componentName] || Animated__default.default.createAnimatedComponent(comp);
  animatedComponentByComponent.set(comp, animatedComponent);
  return animatedComponent;
};
var Natural = (value, callback) => Animated.withTiming(
  value,
  {
    duration: 300,
    easing: Animated.Easing.bezier(0.25, 0.1, 0.25, 1),
    reduceMotion: Animated.ReduceMotion.System
  },
  callback
);
function useDynamicSharedValues() {
  const ref = React9__default.default.useRef({}).current;
  React9__default.default.useEffect(() => {
    return () => {
      Object.values(ref).forEach((value) => {
        Animated.cancelAnimation(value.shared);
      });
    };
  }, []);
  React9__default.default.useEffect(() => {
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
        shared: Animated.makeMutable(initial),
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
  const [state] = React9__default.default.useState(() => ({
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
      const isAnimating = state.pendingTransitions.length > 0;
      if (!isAnimating) {
        presence?.lifecycle?.onAnimationStart?.();
      }
      const promiseCtl = createControlledPromise();
      const delay = compiledStyle.transitionDelay || 0;
      sharedValues.set(key, Animated.withDelay(delay, Natural(next, () => {
        reactNativeWorklets.scheduleOnRN(() => promiseCtl.complete());
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
  React9__default.default.useEffect(() => {
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
  const animatedStyle = Animated.useAnimatedStyle(() => {
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
reactNative.StyleSheet.create({
  base: {
    transform: defaultTransformStyle
  }
}).base;
var useRerenderRef = (initialValue) => {
  const [state, rerender] = React9__default.default.useState(() => ({ current: initialValue() }));
  return {
    current: state.current,
    rerender: () => rerender((prev) => ({ ...prev }))
  };
};

// src/lib/useComponentOverrides.tsx
var InteractionStateContext = React9__default.default.createContext(null);
var InteractionStateProvider = (props) => {
  const parentContext = React9__default.default.useContext(InteractionStateContext) || {};
  return /* @__PURE__ */ React9__default.default.createElement(
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
  const parentContext = React9__default.default.useContext(InteractionStateContext) || {};
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
        componentProps.gesture = reactNativeGestureHandler.Gesture.Simultaneous(...gestures);
      }
    },
    getEnabledGestures: () => {
      if (!current.activateGesture) return [];
      return [
        reactNativeGestureHandler.Gesture.Hover().runOnJS(true).shouldCancelWhenOutside(true).onBegin(() => {
          current.isHovering = true;
          rerender();
        }).onFinalize(() => {
          current.isHovering = false;
          rerender();
        }),
        reactNativeGestureHandler.Gesture.Pan().runOnJS(true).shouldCancelWhenOutside(true).onBegin(() => {
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
var OrientationContext = React9.createContext(null);
var OrientationProvider = ({ children }) => {
  const [orientation, setOrientation] = React9.useState(null);
  React9.useEffect(() => {
    let isMounted = true;
    const getOrientation = async () => {
      const currentOrientation = await expoScreenOrientation.getOrientationAsync();
      if (isMounted) {
        setOrientation(currentOrientation);
      }
    };
    const subscription = expoScreenOrientation.addOrientationChangeListener(({ orientationInfo }) => {
      if (isMounted) {
        setOrientation(orientationInfo.orientation);
      }
    });
    getOrientation();
    return () => {
      isMounted = false;
      expoScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);
  return /* @__PURE__ */ React9__default.default.createElement(OrientationContext.Provider, { value: orientation }, children);
};
var useDeviceOrientation = () => {
  const orientation = React9.useContext(OrientationContext);
  expoScreenOrientation.Orientation.LANDSCAPE_LEFT;
  expoScreenOrientation.Orientation.LANDSCAPE_RIGHT;
  expoScreenOrientation.Orientation.PORTRAIT_DOWN;
  expoScreenOrientation.Orientation.PORTRAIT_UP;
  const isLandscape = orientation === expoScreenOrientation.Orientation.LANDSCAPE_LEFT || orientation === expoScreenOrientation.Orientation.LANDSCAPE_RIGHT;
  if (isLandscape) return "landscape";
  const isPortrait = orientation === expoScreenOrientation.Orientation.PORTRAIT_DOWN || orientation === expoScreenOrientation.Orientation.PORTRAIT_UP || orientation === expoScreenOrientation.Orientation.UNKNOWN;
  if (isPortrait) return "portrait";
  return "portrait";
};
var DimensionsContext = React9__default.default.createContext(null);
var ScreenDimensionProvider = (props) => {
  const dimensions = useScreenDimensions();
  return /* @__PURE__ */ React9__default.default.createElement(DimensionsContext.Provider, { value: dimensions }, props.children);
};
var useScreenDimensions = () => {
  const dimensionCtx = React9__default.default.useContext(DimensionsContext);
  if (dimensionCtx) {
    return dimensionCtx;
  }
  const dimensions = reactNative.useWindowDimensions();
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
  const isMobile = reactNative.Platform.OS === "ios" || reactNative.Platform.OS === "android";
  if (isMobile) return "mobile";
  const isDesktop = typeof window !== "undefined" && window.__TAURI__;
  if (isDesktop) return "desktop";
  const isWeb = reactNative.Platform.OS === "web";
  if (isWeb) return "web";
  return "web";
};
var createBooleanBuilder = (state) => {
  const builder = (currentBoolean, initial = false) => {
    const isPlatform = (platform) => {
      return platform === "mobile" ? reactNative.Platform.OS === "ios" || reactNative.Platform.OS === "android" : platform === "desktop" ? reactNative.Platform.OS === "web" && typeof window !== "undefined" && !("ontouchstart" in window) : reactNative.Platform.OS === platform;
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

// src/lib/properties.ts
var Position = {
  "static": { position: "static" },
  "relative": { position: "relative" },
  "absolute": { position: "absolute" },
  "fixed": { position: "fixed" },
  "sticky": { position: "sticky" }
};
var FlexDirection = {
  "row": { flexDirection: "row" },
  "row-reverse": { flexDirection: "row-reverse" },
  "column": { flexDirection: "column" },
  "column-reverse": { flexDirection: "column-reverse" }
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
var createViewBase = (rawTheme) => {
  const attrs = {
    any: attribute
  };
  const theme = getTypedTheme(rawTheme);
  return {
    variants: {
      position: Position,
      zIndex: attrs.any({ attribute: "zIndex", number: true }),
      z: attrs.any({ attribute: "zIndex", number: true }),
      absoluteFill: {
        true: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }
      },
      absolute: { true: Position.absolute },
      fixed: { true: Position.fixed },
      sticky: { true: Position.sticky },
      relative: { true: Position.relative },
      static: { true: Position.static },
      top: attrs.any({ attribute: "top", number: true, tokens: theme.size }),
      bottom: attrs.any({
        attribute: "bottom",
        number: true,
        tokens: theme.size
      }),
      left: attrs.any({ attribute: "left", number: true, tokens: theme.size }),
      right: attrs.any({
        attribute: "right",
        number: true,
        tokens: theme.size
      }),
      start: attrs.any({
        attribute: "start",
        number: true,
        tokens: theme.size
      }),
      end: attrs.any({ attribute: "end", number: true, tokens: theme.size }),
      // Padding
      padding: attrs.any({
        attribute: "padding",
        number: true,
        tokens: theme.size
      }),
      paddingHorizontal: attrs.any({
        attribute: "paddingHorizontal",
        number: true,
        tokens: theme.size
      }),
      paddingVertical: attrs.any({
        attribute: "paddingVertical",
        number: true,
        tokens: theme.size
      }),
      paddingTop: attrs.any({
        attribute: "paddingTop",
        number: true,
        tokens: theme.size
      }),
      paddingBottom: attrs.any({
        attribute: "paddingBottom",
        number: true,
        tokens: theme.size
      }),
      paddingLeft: attrs.any({
        attribute: "paddingLeft",
        number: true,
        tokens: theme.size
      }),
      paddingRight: attrs.any({
        attribute: "paddingRight",
        number: true,
        tokens: theme.size
      }),
      p: attrs.any({ attribute: "padding", number: true, tokens: theme.size }),
      px: attrs.any({
        attribute: "paddingHorizontal",
        number: true,
        tokens: theme.size
      }),
      py: attrs.any({
        attribute: "paddingVertical",
        number: true,
        tokens: theme.size
      }),
      pt: attrs.any({
        attribute: "paddingTop",
        number: true,
        tokens: theme.size
      }),
      pb: attrs.any({
        attribute: "paddingBottom",
        number: true,
        tokens: theme.size
      }),
      pl: attrs.any({
        attribute: "paddingLeft",
        number: true,
        tokens: theme.size
      }),
      pr: attrs.any({
        attribute: "paddingRight",
        number: true,
        tokens: theme.size
      }),
      paddingBlock: attrs.any({
        attribute: "paddingBlockStart",
        number: true,
        tokens: theme.size
      }),
      paddingBlockStart: attrs.any({
        attribute: "paddingBlockStart",
        number: true,
        tokens: theme.size
      }),
      paddingBlockEnd: attrs.any({
        attribute: "paddingBlockEnd",
        number: true,
        tokens: theme.size
      }),
      paddingInline: attrs.any({
        attribute: "paddingInline",
        number: true,
        tokens: theme.size
      }),
      paddingInlineStart: attrs.any({
        attribute: "paddingInlineStart",
        number: true,
        tokens: theme.size
      }),
      paddingInlineEnd: attrs.any({
        attribute: "paddingInlineEnd",
        number: true,
        tokens: theme.size
      }),
      paddingStart: attrs.any({
        attribute: "paddingStart",
        number: true,
        tokens: theme.size
      }),
      paddingEnd: attrs.any({
        attribute: "paddingEnd",
        number: true,
        tokens: theme.size
      }),
      inset: attrs.any({
        attribute: "inset",
        number: true,
        tokens: theme.size
      }),
      insetBlock: attrs.any({
        attribute: "insetBlockStart",
        number: true,
        tokens: theme.size
      }),
      insetBlockStart: attrs.any({
        attribute: "insetBlockStart",
        number: true,
        tokens: theme.size
      }),
      insetBlockEnd: attrs.any({
        attribute: "insetBlockEnd",
        number: true,
        tokens: theme.size
      }),
      insetInline: attrs.any({
        attribute: "insetInline",
        number: true,
        tokens: theme.size
      }),
      insetInlineStart: attrs.any({
        attribute: "insetInlineStart",
        number: true,
        tokens: theme.size
      }),
      insetInlineEnd: attrs.any({
        attribute: "insetInlineEnd",
        number: true,
        tokens: theme.size
      }),
      // Margin
      margin: attrs.any({
        attribute: "margin",
        number: true,
        tokens: theme.size
      }),
      marginBottom: attrs.any({
        attribute: "marginBottom",
        number: true,
        tokens: theme.size
      }),
      marginLeft: attrs.any({
        attribute: "marginLeft",
        number: true,
        tokens: theme.size
      }),
      marginRight: attrs.any({
        attribute: "marginRight",
        number: true,
        tokens: theme.size
      }),
      marginTop: attrs.any({
        attribute: "marginTop",
        number: true,
        tokens: theme.size
      }),
      marginHorizontal: attrs.any({
        attribute: "marginHorizontal",
        number: true,
        tokens: theme.size
      }),
      marginVertical: attrs.any({
        attribute: "marginVertical",
        number: true,
        tokens: theme.size
      }),
      m: attrs.any({ attribute: "margin", number: true, tokens: theme.size }),
      mx: attrs.any({
        attribute: "marginHorizontal",
        number: true,
        tokens: theme.size
      }),
      my: attrs.any({
        attribute: "marginVertical",
        number: true,
        tokens: theme.size
      }),
      mt: attrs.any({
        attribute: "marginTop",
        number: true,
        tokens: theme.size
      }),
      mb: attrs.any({
        attribute: "marginBottom",
        number: true,
        tokens: theme.size
      }),
      ml: attrs.any({
        attribute: "marginLeft",
        number: true,
        tokens: theme.size
      }),
      mr: attrs.any({
        attribute: "marginRight",
        number: true,
        tokens: theme.size
      }),
      marginBlock: attrs.any({
        attribute: "marginBlock",
        number: true,
        tokens: theme.size
      }),
      marginBlockStart: attrs.any({
        attribute: "marginBlockStart",
        number: true,
        tokens: theme.size
      }),
      marginBlockEnd: attrs.any({
        attribute: "marginBlockEnd",
        number: true,
        tokens: theme.size
      }),
      marginInline: attrs.any({
        attribute: "marginInline",
        number: true,
        tokens: theme.size
      }),
      marginInlineStart: attrs.any({
        attribute: "marginInlineStart",
        number: true,
        tokens: theme.size
      }),
      marginInlineEnd: attrs.any({
        attribute: "marginInlineEnd",
        number: true,
        tokens: theme.size
      }),
      marginStart: attrs.any({
        attribute: "marginStart",
        number: true,
        tokens: theme.size
      }),
      marginEnd: attrs.any({
        attribute: "marginEnd",
        number: true,
        tokens: theme.size
      }),
      // Layout
      sizeX: attrs.any({
        attributes: ["width", "maxWidth", "minWidth"],
        number: true,
        percentage: true,
        tokens: theme.size
      }),
      sizeY: attrs.any({
        attributes: ["height", "maxHeight", "minHeight"],
        number: true,
        percentage: true,
        tokens: theme.size
      }),
      sizeXY: attrs.any({
        attributes: [
          "width",
          "maxWidth",
          "minWidth",
          "height",
          "maxHeight",
          "minHeight"
        ],
        number: true,
        percentage: true,
        tokens: theme.size
      }),
      width: attrs.any({
        attribute: "width",
        number: true,
        percentage: true,
        tokens: theme.size
      }),
      height: attrs.any({
        attribute: "height",
        number: true,
        percentage: true,
        tokens: theme.size
      }),
      minWidth: attrs.any({
        attribute: "minWidth",
        number: true,
        percentage: true,
        tokens: theme.size
      }),
      minHeight: attrs.any({
        attribute: "minHeight",
        number: true,
        percentage: true,
        tokens: theme.size
      }),
      maxWidth: attrs.any({
        attribute: "maxWidth",
        number: true,
        percentage: true,
        tokens: theme.size
      }),
      maxHeight: attrs.any({
        attribute: "maxHeight",
        number: true,
        percentage: true,
        tokens: theme.size
      }),
      // Transforms
      rotate: attrs.any({
        custom: transform,
        attribute: "rotate",
        number: true,
        angle: true
      }),
      rotateX: attrs.any({
        custom: transform,
        attribute: "rotateX",
        number: true,
        angle: true
      }),
      rotateY: attrs.any({
        custom: transform,
        attribute: "rotateY",
        number: true,
        angle: true
      }),
      rotateZ: attrs.any({
        custom: transform,
        attribute: "rotateZ",
        number: true,
        angle: true
      }),
      x: attrs.any({
        custom: transform,
        attribute: "translateX",
        number: true,
        tokens: theme.size
      }),
      y: attrs.any({
        custom: transform,
        attribute: "translateY",
        number: true,
        tokens: theme.size
      }),
      translateX: attrs.any({
        custom: transform,
        attribute: "translateX",
        number: true,
        tokens: theme.size
      }),
      translateY: attrs.any({
        custom: transform,
        attribute: "translateY",
        number: true,
        tokens: theme.size
      }),
      scale: attrs.any({ custom: transform, attribute: "scale", number: true }),
      scaleX: attrs.any({
        custom: transform,
        attribute: "scaleX",
        number: true
      }),
      scaleY: attrs.any({
        custom: transform,
        attribute: "scaleY",
        number: true
      }),
      skewX: attrs.any({ custom: transform, attribute: "skewX", number: true }),
      skewY: attrs.any({ custom: transform, attribute: "skewY", number: true }),
      perspective: attrs.any({ attribute: "perspective", number: true }),
      perspectiveOrigin: attrs.any({
        attribute: "perspectiveOrigin",
        string: true
      }),
      transformOrigin: attrs.any({
        attribute: "transformOrigin",
        string: true
      }),
      // Flex
      flex: attrs.any({ attribute: "flex", number: true }),
      flexDirection: {
        row: { flexDirection: "row" },
        column: { flexDirection: "column" },
        "row-reverse": { flexDirection: "row-reverse" },
        "column-reverse": { flexDirection: "column-reverse" }
      },
      alignItems: {
        "flex-start": { alignItems: "flex-start" },
        "flex-end": { alignItems: "flex-end" },
        center: { alignItems: "center" },
        stretch: { alignItems: "stretch" },
        baseline: { alignItems: "baseline" }
      },
      itemsStart: { true: { alignItems: "flex-start" } },
      itemsEnd: { true: { alignItems: "flex-end" } },
      itemsCenter: { true: { alignItems: "center" } },
      itemsStretch: { true: { alignItems: "stretch" } },
      itemsBaseline: { true: { alignItems: "baseline" } },
      justifyContent: {
        "flex-start": { justifyContent: "flex-start" },
        "flex-end": { justifyContent: "flex-end" },
        center: { justifyContent: "center" },
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
        center: { alignContent: "center" },
        stretch: { alignContent: "stretch" },
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
        auto: { alignSelf: "auto" },
        "flex-start": { alignSelf: "flex-start" },
        "flex-end": { alignSelf: "flex-end" },
        center: { alignSelf: "center" },
        stretch: { alignSelf: "stretch" },
        baseline: { alignSelf: "baseline" }
      },
      selfAuto: { true: { alignSelf: "auto" } },
      selfStart: { true: { alignSelf: "flex-start" } },
      selfEnd: { true: { alignSelf: "flex-end" } },
      selfCenter: { true: { alignSelf: "center" } },
      selfStretch: { true: { alignSelf: "stretch" } },
      selfBaseline: { true: { alignSelf: "baseline" } },
      flexWrap: {
        true: { flexWrap: "wrap" },
        wrap: { flexWrap: "wrap" },
        nowrap: { flexWrap: "nowrap" },
        "wrap-reverse": { flexWrap: "wrap-reverse" }
      },
      wrap: { true: { flexWrap: "wrap" } },
      nowrap: { true: { flexWrap: "nowrap" } },
      wrapReverse: { true: { flexWrap: "wrap-reverse" } },
      flexGrow: attrs.any({ attribute: "flexGrow", number: true }),
      flexShrink: attrs.any({ attribute: "flexShrink", number: true }),
      flexBasis: attrs.any({ attribute: "flexBasis", number: true }),
      gap: attrs.any({
        attribute: "gap",
        number: true,
        percentage: true,
        tokens: theme.size
      }),
      // Grid Item
      row: attrs.any({ attribute: "row", number: true, string: true }),
      column: attrs.any({ attribute: "column", number: true, string: true }),
      rowSpan: attrs.any({ attribute: "rowSpan", number: true, string: true }),
      columnSpan: attrs.any({
        attribute: "columnSpan",
        number: true,
        string: true
      }),
      rowStart: attrs.any({
        attribute: "rowStart",
        number: true,
        string: true
      }),
      columnStart: attrs.any({
        attribute: "columnStart",
        number: true,
        string: true
      }),
      rowEnd: attrs.any({ attribute: "rowEnd", number: true, string: true }),
      columnEnd: attrs.any({
        attribute: "columnEnd",
        number: true,
        string: true
      }),
      area: attrs.any({ attribute: "area", string: true }),
      order: attrs.any({ attribute: "order", number: true, string: true }),
      // Background
      backgroundAttachment: attrs.any({
        attribute: "backgroundAttachment",
        string: true
      }),
      backgroundBlendMode: attrs.any({
        attribute: "backgroundBlendMode",
        string: true
      }),
      backgroundClip: attrs.any({ attribute: "backgroundClip", string: true }),
      backgroundColor: attrs.any({
        attribute: "backgroundColor",
        color: true,
        tokens: theme.colors
      }),
      bg: attrs.any({
        attribute: "backgroundColor",
        color: true,
        tokens: theme.colors
      }),
      backgroundOrigin: attrs.any({
        attribute: "backgroundOrigin",
        string: true
      }),
      backgroundPosition: attrs.any({
        attribute: "backgroundPosition",
        string: true
      }),
      backgroundSize: attrs.any({ attribute: "backgroundSize", string: true }),
      backgroundImage: attrs.any({
        attribute: "backgroundImage",
        string: true
      }),
      backgroundRepeat: {
        repeat: { backgroundRepeat: "repeat" },
        "repeat-x": { backgroundRepeat: "repeat-x" },
        "repeat-y": { backgroundRepeat: "repeat-y" },
        "no-repeat": { backgroundRepeat: "no-repeat" },
        space: { backgroundRepeat: "space" }
      },
      // Border
      borderRadius: attrs.any({
        attribute: "borderRadius",
        number: true,
        tokens: theme.size
      }),
      borderTopLeftRadius: attrs.any({
        attribute: "borderTopLeftRadius",
        number: true,
        tokens: theme.size
      }),
      borderTopRightRadius: attrs.any({
        attribute: "borderTopRightRadius",
        number: true,
        tokens: theme.size
      }),
      borderBottomLeftRadius: attrs.any({
        attribute: "borderBottomLeftRadius",
        number: true,
        tokens: theme.size
      }),
      borderBottomRightRadius: attrs.any({
        attribute: "borderBottomRightRadius",
        number: true,
        tokens: theme.size
      }),
      borderStartStartRadius: attrs.any({
        attribute: "borderStartStartRadius",
        number: true,
        tokens: theme.size
      }),
      borderStartEndRadius: attrs.any({
        attribute: "borderStartEndRadius",
        number: true,
        tokens: theme.size
      }),
      borderEndStartRadius: attrs.any({
        attribute: "borderEndStartRadius",
        number: true,
        tokens: theme.size
      }),
      borderEndEndRadius: attrs.any({
        attribute: "borderEndEndRadius",
        number: true,
        tokens: theme.size
      }),
      borderTopStartRadius: attrs.any({
        attribute: "borderTopStartRadius",
        number: true,
        tokens: theme.size
      }),
      borderTopEndRadius: attrs.any({
        attribute: "borderTopEndRadius",
        number: true,
        tokens: theme.size
      }),
      borderBottomStartRadius: attrs.any({
        attribute: "borderBottomStartRadius",
        number: true,
        tokens: theme.size
      }),
      borderBottomEndRadius: attrs.any({
        attribute: "borderBottomEndRadius",
        number: true,
        tokens: theme.size
      }),
      borderColor: attrs.any({
        attribute: "borderColor",
        color: true,
        tokens: theme.colors
      }),
      borderTopColor: attrs.any({
        attribute: "borderTopColor",
        color: true,
        tokens: theme.colors
      }),
      borderRightColor: attrs.any({
        attribute: "borderRightColor",
        color: true,
        tokens: theme.colors
      }),
      borderBottomColor: attrs.any({
        attribute: "borderBottomColor",
        color: true,
        tokens: theme.colors
      }),
      borderLeftColor: attrs.any({
        attribute: "borderLeftColor",
        color: true,
        tokens: theme.colors
      }),
      borderStartColor: attrs.any({
        attribute: "borderStartColor",
        color: true,
        tokens: theme.colors
      }),
      borderEndColor: attrs.any({
        attribute: "borderEndColor",
        color: true,
        tokens: theme.colors
      }),
      borderBlockColor: attrs.any({
        attribute: "borderBlockColor",
        color: true,
        tokens: theme.colors
      }),
      borderBlockStartColor: attrs.any({
        attribute: "borderBlockStartColor",
        color: true,
        tokens: theme.colors
      }),
      borderBlockEndColor: attrs.any({
        attribute: "borderBlockEndColor",
        color: true,
        tokens: theme.colors
      }),
      borderWidth: attrs.any({
        attribute: "borderWidth",
        number: true,
        tokens: theme.size
      }),
      borderTopWidth: attrs.any({
        attribute: "borderTopWidth",
        number: true,
        tokens: theme.size
      }),
      borderRightWidth: attrs.any({
        attribute: "borderRightWidth",
        number: true,
        tokens: theme.size
      }),
      borderBottomWidth: attrs.any({
        attribute: "borderBottomWidth",
        number: true,
        tokens: theme.size
      }),
      borderLeftWidth: attrs.any({
        attribute: "borderLeftWidth",
        number: true,
        tokens: theme.size
      }),
      borderStartWidth: attrs.any({
        attribute: "borderStartWidth",
        number: true,
        tokens: theme.size
      }),
      borderEndWidth: attrs.any({
        attribute: "borderEndWidth",
        number: true,
        tokens: theme.size
      }),
      borderBlockWidth: attrs.any({
        attribute: "borderBlockWidth",
        number: true,
        tokens: theme.size
      }),
      borderBlockStartWidth: attrs.any({
        attribute: "borderBlockStartWidth",
        number: true,
        tokens: theme.size
      }),
      borderBlockEndWidth: attrs.any({
        attribute: "borderBlockEndWidth",
        number: true,
        tokens: theme.size
      }),
      borderCurve: {
        circular: { borderCurve: "circular" },
        continuous: { borderCurve: "continuous" }
      },
      borderStyle: {
        solid: { borderStyle: "solid" },
        dashed: { borderStyle: "dashed" },
        dotted: { borderStyle: "dotted" }
      },
      outline: attrs.any({ attribute: "outline", string: true }),
      outlineColor: attrs.any({
        attribute: "outlineColor",
        color: true,
        tokens: theme.colors
      }),
      outlineWidth: attrs.any({
        attribute: "outlineWidth",
        number: true,
        tokens: theme.size
      }),
      outlineOffset: attrs.any({
        attribute: "outlineOffset",
        number: true,
        tokens: theme.size
      }),
      outlineStyle: {
        solid: { outlineStyle: "solid" },
        dashed: { outlineStyle: "dashed" },
        dotted: { outlineStyle: "dotted" }
      },
      // Misc
      aspectRatio: attrs.any({ attribute: "aspectRatio", number: true }),
      opacity: attrs.any({ attribute: "opacity", number: true }),
      boxSizing: ContentSizing,
      borderBox: { true: ContentSizing.borderBox },
      contentBox: { true: ContentSizing.contentBox },
      cursor: Cursor,
      overflow: {
        visible: { overflow: "visible" },
        hidden: { overflow: "hidden" },
        scroll: { overflow: "scroll" }
      },
      overflowVisible: { true: { overflow: "visible" } },
      overflowHidden: { true: { overflow: "hidden" } },
      overflowScroll: { true: { overflow: "scroll" } },
      overflowX: {
        visible: { overflowX: "visible" },
        hidden: { overflowX: "hidden" },
        scroll: { overflowX: "scroll" }
      },
      overflowXVisible: { true: { overflowX: "visible" } },
      overflowXHidden: { true: { overflowX: "hidden" } },
      overflowXScroll: { true: { overflowX: "scroll" } },
      overflowY: {
        visible: { overflowY: "visible" },
        hidden: { overflowY: "hidden" },
        scroll: { overflowY: "scroll" }
      },
      overflowYVisible: { true: { overflowY: "visible" } },
      overflowYHidden: { true: { overflowY: "hidden" } },
      overflowYScroll: { true: { overflowY: "scroll" } },
      display: {
        none: { display: "none" },
        flex: { display: "flex" }
      },
      visibility: {
        visible: { visibility: "visible" },
        hidden: { visibility: "hidden" },
        collapse: { visibility: "collapse" }
      },
      visibilityVisible: { true: { visibility: "visible" } },
      visibilityHidden: { true: { visibility: "hidden" } },
      visibilityCollapse: { true: { visibility: "collapse" } },
      backdropFilter: attrs.any({ attribute: "backdropFilter", string: true }),
      backfaceVisibility: {
        hidden: { backfaceVisibility: "hidden" },
        visible: { backfaceVisibility: "visible" }
      },
      elevation: attrs.any({ attribute: "elevation", number: true }),
      boxShadow: attrs.any({ attribute: "boxShadow", string: true }),
      overscrollBehavior: {
        auto: { overscrollBehavior: "auto" },
        contain: { overscrollBehavior: "contain" },
        none: { overscrollBehavior: "none" }
      },
      userSelect: {
        none: { userSelect: "none" },
        text: { userSelect: "text" },
        all: { userSelect: "all" },
        auto: { userSelect: "auto" }
      },
      willChange: attrs.any({ attribute: "willChange", string: true }),
      pointerEvents: {
        auto: { pointerEvents: "auto" },
        none: { pointerEvents: "none" },
        "box-none": { pointerEvents: "box-none" },
        "box-only": { pointerEvents: "box-only" }
      },
      direction: {
        ltr: { direction: "ltr" },
        rtl: { direction: "rtl" },
        inherit: { direction: "inherit" }
      },
      mixBlendMode: {
        normal: { mixBlendMode: "normal" },
        multiply: { mixBlendMode: "multiply" },
        screen: { mixBlendMode: "screen" },
        overlay: { mixBlendMode: "overlay" },
        darken: { mixBlendMode: "darken" },
        lighten: { mixBlendMode: "lighten" },
        "color-dodge": { mixBlendMode: "color" },
        "color-burn": { mixBlendMode: "color" },
        "hard-light": { mixBlendMode: "hard-light" },
        "soft-light": { mixBlendMode: "soft-light" },
        difference: { mixBlendMode: "difference" },
        exclusion: { mixBlendMode: "exclusion" },
        hue: { mixBlendMode: "hue" },
        saturation: { mixBlendMode: "saturation" },
        color: { mixBlendMode: "color" },
        luminosity: { mixBlendMode: "luminosity" }
      },
      clip: attrs.any({ attribute: "clip", string: true }),
      filter: attrs.any({ attribute: "filter", string: true }),
      isolation: {
        auto: { isolation: "auto" },
        isolate: { isolation: "isolate" }
      },
      overscrollBehaviorX: {
        auto: { overscrollBehaviorX: "auto" },
        contain: { overscrollBehaviorX: "contain" },
        none: { overscrollBehaviorX: "none" }
      },
      overscrollBehaviorY: {
        auto: { overscrollBehaviorY: "auto" },
        contain: { overscrollBehaviorY: "contain" },
        none: { overscrollBehaviorY: "none" }
      },
      rotation: attrs.any({ attribute: "rotation", string: true }),
      // Animations & Transition
      transitionProperty: attrs.any({
        attribute: "transitionProperty",
        multiple: true,
        string: true
      }),
      transitionDuration: attrs.any({
        attribute: "transitionDuration",
        multiple: true,
        number: true
      }),
      transitionTimingFunction: attrs.any({
        attribute: "transitionTimingFunction",
        multiple: true,
        string: true
      }),
      transitionDelay: attrs.any({
        attribute: "transitionDelay",
        multiple: true,
        number: true
      }),
      transitionBehavior: {
        allowDiscrete: { transitionBehavior: "allow-discrete" },
        normal: { transitionBehavior: "normal" }
      },
      animationName: attrs.any({ attribute: "animationName", any: true }),
      animationDuration: attrs.any({
        attribute: "animationDuration",
        multiple: true,
        number: true,
        time: true
      }),
      animationDelay: attrs.any({
        attribute: "animationDelay",
        multiple: true,
        number: true,
        time: true
      }),
      animationTimingFunction: attrs.any({
        attribute: "animationTimingFunction",
        multiple: true,
        tokens: {
          linear: "linear",
          ease: "ease",
          easeIn: "ease-in",
          easeOut: "ease-out",
          easeInOut: "ease-in-out",
          stepStart: "step-start",
          stepEnd: "step-end"
        }
      }),
      animationDirection: attrs.any({
        attribute: "animationDirection",
        multiple: true,
        tokens: {
          normal: "normal",
          reverse: "reverse",
          alternate: "alternate",
          alternateReverse: "alternate-reverse"
        }
      }),
      animationIterationCount: attrs.any({
        attribute: "animationIterationCount",
        multiple: true,
        number: true,
        tokens: {
          infinity: "infinite"
        }
      }),
      animationFillMode: attrs.any({
        attribute: "animationFillMode",
        multiple: true,
        tokens: {
          forwards: "forwards",
          backwards: "backwards",
          both: "both",
          none: "none"
        }
      }),
      animationPlayState: attrs.any({
        attribute: "animationPlayState",
        multiple: true,
        tokens: {
          running: "running",
          paused: "paused"
        }
      })
    }
  };
};

// src/createTextBase.tsx
var createTextBase = (rawTheme) => {
  const theme = getTypedTheme(rawTheme);
  const attrs = {
    any: attribute
  };
  return {
    variants: {
      fontFamily: attrs.any({ attribute: "fontFamily", fonts: true, tokens: theme.fonts }),
      fontSize: attrs.any({ attribute: "fontSize", number: true, tokens: theme.size }),
      lineHeight: attrs.any({ attribute: "lineHeight", number: true, tokens: theme.size }),
      color: attrs.any({ attribute: "color", color: true, tokens: theme.colors }),
      textAlignVertical: attrs.any({ attribute: "textAlignVertical", string: true, tokens: ["auto", "top", "bottom", "center"] }),
      textAlign: attrs.any({ attribute: "textAlign", string: true, tokens: ["auto", "left", "center", "right", "justify"] }),
      textDecorationStyle: attrs.any({ attribute: "textDecorationStyle", string: true, tokens: ["none", "double", "dashed", "dotted", "solid"] }),
      textDecorationLine: attrs.any({ attribute: "textDecorationLine", string: true, tokens: ["none", "line-through", "underline", "underline line-through"] }),
      textDecorationColor: attrs.any({ attribute: "textDecorationColor", color: true, tokens: theme.colors }),
      opacity: attrs.any({ attribute: "opacity", number: true }),
      cursor: Cursor
    }
  };
};

// src/surface.tsx
var getTypedTheme = (theme) => {
  const colors = theme.colors;
  const breakpoints = theme.colors;
  const fontSizes = theme.colors;
  const size = theme.colors;
  const fonts = theme.colors;
  return {
    colors,
    breakpoints,
    fontSizes,
    size,
    fonts
  };
};
var createTheme = (theme) => {
  return theme;
};
var createSurfaced2 = () => {
  const useFonts = () => {
    const theme = useSurfaceTheme();
    const fontsWithFlattenPaths = withFontsFamilyKeys(
      getCompiledTokens(theme.fonts, { fonts: true })
    );
    const [loaded, error] = expoFont.useFonts(fontsWithFlattenPaths);
    return {
      loaded,
      error,
      fonts: fontsWithFlattenPaths
    };
  };
  const useSurfaceTheme = () => {
    const context = React9__default.default.useContext(surfaceContext);
    return context;
  };
  const ThemeProvider = (props) => {
    return /* @__PURE__ */ React9__default.default.createElement(ScreenDimensionProvider, null, /* @__PURE__ */ React9__default.default.createElement(OrientationProvider, null, /* @__PURE__ */ React9__default.default.createElement(surfaceContext.Provider, { value: props.theme }, props.children)));
  };
  const configByComponent = /* @__PURE__ */ new Map();
  const attrs = {
    any: attribute,
    boolean: booleanStyle
  };
  const surfaced = (Component) => {
    const createStylsheetManager = (styleFactory) => {
      const stylesheetsMap = /* @__PURE__ */ new Map();
      const getMergedStyleConfig = (ctx) => {
        const currentConfig = styleFactory(ctx);
        const parentsurfaceConfig = configByComponent.get(Component);
        const { styleConfig: parentConfig } = parentsurfaceConfig?.styleManager.getStylesheetForTheme(ctx.theme) || {};
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
        const { merged, current } = getMergedStyleConfig({
          theme,
          attrs
        });
        const { dynamic, variants, transition, ...base } = merged;
        const hasBaseStylesheet = Object.keys(base).length > 0;
        const baseStylesheet = reactNative.StyleSheet.create({ variant: base });
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
              anyConfig.attributes.forEach((attribute2) => {
                style[attribute2] = anyConfigValue;
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
                  variant: reactNative.StyleSheet.create({ variant: computedStyle }).variant
                },
                { raw: {} }
              );
            }
            return Object.assign(
              {
                variant: reactNative.StyleSheet.create({ variant: computedStyle }).variant
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
            return opts.raw ? stylesheets[stylesheetKey].raw : stylesheets[stylesheetKey].variant;
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
          return /* @__PURE__ */ React9__default.default.createElement(Component, { as: Component2, ...props });
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
          const presence = React9__default.default.useContext(AnimatePresenceContext);
          const styles = styleManager.getStylesheetForTheme(theme);
          const compRef = React9__default.default.useRef(null);
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
            /* @__PURE__ */ React9__default.default.createElement(
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
              componentProps.gesture && ((props2) => /* @__PURE__ */ React9__default.default.createElement(reactNativeGestureHandler.GestureDetector, { gesture: componentProps.gesture, ...props2 })),
              props.stateId && ((props2) => /* @__PURE__ */ React9__default.default.createElement(
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
          __types: {
            Props: {}
          },
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
    __types: {
      ThemeValue: {}
    },
    useTheme: useSurfaceTheme,
    useFonts,
    useOrientation: useDeviceOrientation,
    useMediaQuery,
    Provider: ThemeProvider,
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
    createView: () => {
      return surfaced(reactNative.View).with((ctx) => {
        const variants = createViewBase(ctx.theme);
        return variants;
      });
    },
    createText: () => {
      return surfaced(reactNative.Text).with((ctx) => {
        const variants = createTextBase(ctx.theme);
        return variants;
      });
    }
  });
};

exports.ANIMATE_PRESENCE_PROPS_KEY = ANIMATE_PRESENCE_PROPS_KEY;
exports.AnimatePresence = AnimatePresence;
exports.AnimatePresenceContext = AnimatePresenceContext;
exports.ContentSizing = ContentSizing;
exports.Cursor = Cursor;
exports.FlexDirection = FlexDirection;
exports.Interaction = Interaction;
exports.Position = Position;
exports.ScreenDimensionProvider = ScreenDimensionProvider;
exports.createSurfaced = createSurfaced2;
exports.createTextBase = createTextBase;
exports.createTheme = createTheme;
exports.createViewBase = createViewBase;
exports.getAnimatedPresenceProps = getAnimatedPresenceProps;
exports.getTypedTheme = getTypedTheme;
exports.useScreenDimensions = useScreenDimensions;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map