'use strict';

var expoFont = require('expo-font');
var reactNative = require('react-native');
var reactNativeGestureHandler = require('react-native-gesture-handler');
var Animated = require('react-native-reanimated');
var reactNativeWorklets = require('react-native-worklets');
var expoScreenOrientation = require('expo-screen-orientation');
var reactNativeKeyboardController = require('react-native-keyboard-controller');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Animated__default = /*#__PURE__*/_interopDefault(Animated);

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  __defProp(target, "default", { value: mod, enumerable: true }) ,
  mod
));

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports$1, module) {
    (function() {
      function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              info[0],
              info[1]
            );
          }
        });
      }
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable)
          return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      function warnNoop(publicInstance, callerName) {
        publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
        var warningKey = publicInstance + "." + callerName;
        didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          callerName,
          publicInstance
        ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
      }
      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function ComponentDummy() {
      }
      function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function noop() {
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        newKey = ReactElement(
          oldElement.type,
          newKey,
          oldElement.props,
          oldElement._owner,
          oldElement._debugStack,
          oldElement._debugTask
        );
        oldElement._store && (newKey._store.validated = oldElement._store.validated);
        return newKey;
      }
      function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function escape(key) {
        var escaperLookup = { "=": "=0", ":": "=2" };
        return "$" + key.replace(/[=:]/g, function(match) {
          return escaperLookup[match];
        });
      }
      function getElementKey(element, index) {
        return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
      }
      function resolveThenable(thenable) {
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
          default:
            switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
              function(fulfilledValue) {
                "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
              },
              function(error) {
                "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            )), thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenable.reason;
            }
        }
        throw thenable;
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = false;
        if (null === children) invokeCallback = true;
        else
          switch (type) {
            case "bigint":
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
                  break;
                case REACT_LAZY_TYPE:
                  return invokeCallback = children._init, mapIntoArray(
                    invokeCallback(children._payload),
                    array,
                    escapedPrefix,
                    nameSoFar,
                    callback
                  );
              }
          }
        if (invokeCallback) {
          invokeCallback = children;
          callback = callback(invokeCallback);
          var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
          isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
            return c;
          })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
            callback,
            escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
              userProvidedKeyEscapeRegex,
              "$&/"
            ) + "/") + childKey
          ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
          return 1;
        }
        invokeCallback = 0;
        childKey = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children))
          for (var i = 0; i < children.length; i++)
            nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if (i = getIteratorFn(children), "function" === typeof i)
          for (i === children.entries && (didWarnAboutMaps || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
            nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if ("object" === type) {
          if ("function" === typeof children.then)
            return mapIntoArray(
              resolveThenable(children),
              array,
              escapedPrefix,
              nameSoFar,
              callback
            );
          array = String(children);
          throw Error(
            "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return invokeCallback;
      }
      function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [], count = 0;
        mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        });
        return result;
      }
      function lazyInitializer(payload) {
        if (-1 === payload._status) {
          var ioInfo = payload._ioInfo;
          null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
          ioInfo = payload._result;
          var thenable = ioInfo();
          thenable.then(
            function(moduleObject) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 1;
                payload._result = moduleObject;
                var _ioInfo = payload._ioInfo;
                null != _ioInfo && (_ioInfo.end = performance.now());
                void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
              }
            },
            function(error) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 2;
                payload._result = error;
                var _ioInfo2 = payload._ioInfo;
                null != _ioInfo2 && (_ioInfo2.end = performance.now());
                void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            }
          );
          ioInfo = payload._ioInfo;
          if (null != ioInfo) {
            ioInfo.value = thenable;
            var displayName = thenable.displayName;
            "string" === typeof displayName && (ioInfo.name = displayName);
          }
          -1 === payload._status && (payload._status = 0, payload._result = thenable);
        }
        if (1 === payload._status)
          return ioInfo = payload._result, void 0 === ioInfo && console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
            ioInfo
          ), "default" in ioInfo || console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
            ioInfo
          ), ioInfo.default;
        throw payload._result;
      }
      function resolveDispatcher() {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
        return dispatcher;
      }
      function releaseAsyncTransition() {
        ReactSharedInternals.asyncTransitions--;
      }
      function enqueueTask(task) {
        if (null === enqueueTaskImpl)
          try {
            var requireString = ("require" + Math.random()).slice(0, 7);
            enqueueTaskImpl = (module && module[requireString]).call(
              module,
              "timers"
            ).setImmediate;
          } catch (_err) {
            enqueueTaskImpl = function(callback) {
              false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var channel = new MessageChannel();
              channel.port1.onmessage = callback;
              channel.port2.postMessage(void 0);
            };
          }
        return enqueueTaskImpl(task);
      }
      function aggregateErrors(errors) {
        return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
      }
      function popActScope(prevActQueue, prevActScopeDepth) {
        prevActScopeDepth !== actScopeDepth - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        );
        actScopeDepth = prevActScopeDepth;
      }
      function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
        var queue = ReactSharedInternals.actQueue;
        if (null !== queue)
          if (0 !== queue.length)
            try {
              flushActQueue(queue);
              enqueueTask(function() {
                return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
              });
              return;
            } catch (error) {
              ReactSharedInternals.thrownErrors.push(error);
            }
          else ReactSharedInternals.actQueue = null;
        0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
      }
      function flushActQueue(queue) {
        if (!isFlushing) {
          isFlushing = true;
          var i = 0;
          try {
            for (; i < queue.length; i++) {
              var callback = queue[i];
              do {
                ReactSharedInternals.didUsePromise = false;
                var continuation = callback(false);
                if (null !== continuation) {
                  if (ReactSharedInternals.didUsePromise) {
                    queue[i] = callback;
                    queue.splice(0, i);
                    return;
                  }
                  callback = continuation;
                } else break;
              } while (1);
            }
            queue.length = 0;
          } catch (error) {
            queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
          } finally {
            isFlushing = false;
          }
        }
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
        isMounted: function() {
          return false;
        },
        enqueueForceUpdate: function(publicInstance) {
          warnNoop(publicInstance, "forceUpdate");
        },
        enqueueReplaceState: function(publicInstance) {
          warnNoop(publicInstance, "replaceState");
        },
        enqueueSetState: function(publicInstance) {
          warnNoop(publicInstance, "setState");
        }
      }, assign = Object.assign, emptyObject = {};
      Object.freeze(emptyObject);
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function(partialState, callback) {
        if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      };
      Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      var deprecatedAPIs = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      };
      for (fnName in deprecatedAPIs)
        deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      ComponentDummy.prototype = Component.prototype;
      deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
      deprecatedAPIs.constructor = PureComponent;
      assign(deprecatedAPIs, Component.prototype);
      deprecatedAPIs.isPureReactComponent = true;
      var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        asyncTransitions: 0,
        isBatchingLegacy: false,
        didScheduleLegacyUpdate: false,
        didUsePromise: false,
        thrownErrors: [],
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
      }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      deprecatedAPIs = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
        deprecatedAPIs,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof process && "function" === typeof process.emit) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
        queueMicrotask(function() {
          return queueMicrotask(callback);
        });
      } : enqueueTask;
      deprecatedAPIs = Object.freeze({
        __proto__: null,
        c: function(size) {
          return resolveDispatcher().useMemoCache(size);
        }
      });
      var fnName = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
          mapChildren(
            children,
            function() {
              forEachFunc.apply(this, arguments);
            },
            forEachContext
          );
        },
        count: function(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        },
        toArray: function(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        },
        only: function(children) {
          if (!isValidElement(children))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return children;
        }
      };
      exports$1.Activity = REACT_ACTIVITY_TYPE;
      exports$1.Children = fnName;
      exports$1.Component = Component;
      exports$1.Fragment = REACT_FRAGMENT_TYPE;
      exports$1.Profiler = REACT_PROFILER_TYPE;
      exports$1.PureComponent = PureComponent;
      exports$1.StrictMode = REACT_STRICT_MODE_TYPE;
      exports$1.Suspense = REACT_SUSPENSE_TYPE;
      exports$1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
      exports$1.__COMPILER_RUNTIME = deprecatedAPIs;
      exports$1.act = function(callback) {
        var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
        actScopeDepth++;
        var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
        try {
          var result = callback();
        } catch (error) {
          ReactSharedInternals.thrownErrors.push(error);
        }
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        if (null !== result && "object" === typeof result && "function" === typeof result.then) {
          var thenable = result;
          queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          });
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              thenable.then(
                function(returnValue) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  if (0 === prevActScopeDepth) {
                    try {
                      flushActQueue(queue), enqueueTask(function() {
                        return recursivelyFlushAsyncActWork(
                          returnValue,
                          resolve,
                          reject
                        );
                      });
                    } catch (error$0) {
                      ReactSharedInternals.thrownErrors.push(error$0);
                    }
                    if (0 < ReactSharedInternals.thrownErrors.length) {
                      var _thrownError = aggregateErrors(
                        ReactSharedInternals.thrownErrors
                      );
                      ReactSharedInternals.thrownErrors.length = 0;
                      reject(_thrownError);
                    }
                  } else resolve(returnValue);
                },
                function(error) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                    ReactSharedInternals.thrownErrors
                  ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                }
              );
            }
          };
        }
        var returnValue$jscomp$0 = result;
        popActScope(prevActQueue, prevActScopeDepth);
        0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
          didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), ReactSharedInternals.actQueue = null);
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        return {
          then: function(resolve, reject) {
            didAwaitActCall = true;
            0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
              return recursivelyFlushAsyncActWork(
                returnValue$jscomp$0,
                resolve,
                reject
              );
            })) : resolve(returnValue$jscomp$0);
          }
        };
      };
      exports$1.cache = function(fn) {
        return function() {
          return fn.apply(null, arguments);
        };
      };
      exports$1.cacheSignal = function() {
        return null;
      };
      exports$1.captureOwnerStack = function() {
        var getCurrentStack = ReactSharedInternals.getCurrentStack;
        return null === getCurrentStack ? null : getCurrentStack();
      };
      exports$1.cloneElement = function(element, config, children) {
        if (null === element || void 0 === element)
          throw Error(
            "The argument must be a React element, but you passed " + element + "."
          );
        var props = assign({}, element.props), key = element.key, owner = element._owner;
        if (null != config) {
          var JSCompiler_inline_result;
          a: {
            if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
              config,
              "ref"
            ).get) && JSCompiler_inline_result.isReactWarning) {
              JSCompiler_inline_result = false;
              break a;
            }
            JSCompiler_inline_result = void 0 !== config.ref;
          }
          JSCompiler_inline_result && (owner = getOwner());
          hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
          for (propName in config)
            !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
        }
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
          JSCompiler_inline_result = Array(propName);
          for (var i = 0; i < propName; i++)
            JSCompiler_inline_result[i] = arguments[i + 2];
          props.children = JSCompiler_inline_result;
        }
        props = ReactElement(
          element.type,
          key,
          props,
          owner,
          element._debugStack,
          element._debugTask
        );
        for (key = 2; key < arguments.length; key++)
          validateChildKeys(arguments[key]);
        return props;
      };
      exports$1.createContext = function(defaultValue) {
        defaultValue = {
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        };
        defaultValue.Provider = defaultValue;
        defaultValue.Consumer = {
          $$typeof: REACT_CONSUMER_TYPE,
          _context: defaultValue
        };
        defaultValue._currentRenderer = null;
        defaultValue._currentRenderer2 = null;
        return defaultValue;
      };
      exports$1.createElement = function(type, config, children) {
        for (var i = 2; i < arguments.length; i++)
          validateChildKeys(arguments[i]);
        i = {};
        var key = null;
        if (null != config)
          for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)
            hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) i.children = children;
        else if (1 < childrenLength) {
          for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
            childArray[_i] = arguments[_i + 2];
          Object.freeze && Object.freeze(childArray);
          i.children = childArray;
        }
        if (type && type.defaultProps)
          for (propName in childrenLength = type.defaultProps, childrenLength)
            void 0 === i[propName] && (i[propName] = childrenLength[propName]);
        key && defineKeyPropWarningGetter(
          i,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return ReactElement(
          type,
          key,
          i,
          getOwner(),
          propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports$1.createRef = function() {
        var refObject = { current: null };
        Object.seal(refObject);
        return refObject;
      };
      exports$1.forwardRef = function(render) {
        null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : "function" !== typeof render ? console.error(
          "forwardRef requires a render function but was given %s.",
          null === render ? "null" : typeof render
        ) : 0 !== render.length && 2 !== render.length && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        );
        null != render && null != render.defaultProps && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
        Object.defineProperty(elementType, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
          }
        });
        return elementType;
      };
      exports$1.isValidElement = isValidElement;
      exports$1.lazy = function(ctor) {
        ctor = { _status: -1, _result: ctor };
        var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: ctor,
          _init: lazyInitializer
        }, ioInfo = {
          name: "lazy",
          start: -1,
          end: -1,
          value: null,
          owner: null,
          debugStack: Error("react-stack-top-frame"),
          debugTask: console.createTask ? console.createTask("lazy()") : null
        };
        ctor._ioInfo = ioInfo;
        lazyType._debugInfo = [{ awaited: ioInfo }];
        return lazyType;
      };
      exports$1.memo = function(type, compare) {
        null == type && console.error(
          "memo: The first argument must be a component. Instead received: %s",
          null === type ? "null" : typeof type
        );
        compare = {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: void 0 === compare ? null : compare
        };
        var ownName;
        Object.defineProperty(compare, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
          }
        });
        return compare;
      };
      exports$1.startTransition = function(scope) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        currentTransition._updatedFibers = /* @__PURE__ */ new Set();
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
        } catch (error) {
          reportGlobalError(error);
        } finally {
          null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), null !== prevTransition && null !== currentTransition.types && (null !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error(
            "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
          ), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      };
      exports$1.unstable_useCacheRefresh = function() {
        return resolveDispatcher().useCacheRefresh();
      };
      exports$1.use = function(usable) {
        return resolveDispatcher().use(usable);
      };
      exports$1.useActionState = function(action, initialState, permalink) {
        return resolveDispatcher().useActionState(
          action,
          initialState,
          permalink
        );
      };
      exports$1.useCallback = function(callback, deps) {
        return resolveDispatcher().useCallback(callback, deps);
      };
      exports$1.useContext = function(Context) {
        var dispatcher = resolveDispatcher();
        Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        );
        return dispatcher.useContext(Context);
      };
      exports$1.useDebugValue = function(value, formatterFn) {
        return resolveDispatcher().useDebugValue(value, formatterFn);
      };
      exports$1.useDeferredValue = function(value, initialValue) {
        return resolveDispatcher().useDeferredValue(value, initialValue);
      };
      exports$1.useEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useEffect(create, deps);
      };
      exports$1.useEffectEvent = function(callback) {
        return resolveDispatcher().useEffectEvent(callback);
      };
      exports$1.useId = function() {
        return resolveDispatcher().useId();
      };
      exports$1.useImperativeHandle = function(ref, create, deps) {
        return resolveDispatcher().useImperativeHandle(ref, create, deps);
      };
      exports$1.useInsertionEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useInsertionEffect(create, deps);
      };
      exports$1.useLayoutEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useLayoutEffect(create, deps);
      };
      exports$1.useMemo = function(create, deps) {
        return resolveDispatcher().useMemo(create, deps);
      };
      exports$1.useOptimistic = function(passthrough, reducer) {
        return resolveDispatcher().useOptimistic(passthrough, reducer);
      };
      exports$1.useReducer = function(reducer, initialArg, init) {
        return resolveDispatcher().useReducer(reducer, initialArg, init);
      };
      exports$1.useRef = function(initialValue) {
        return resolveDispatcher().useRef(initialValue);
      };
      exports$1.useState = function(initialState) {
        return resolveDispatcher().useState(initialState);
      };
      exports$1.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
        return resolveDispatcher().useSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      };
      exports$1.useTransition = function() {
        return resolveDispatcher().useTransition();
      };
      exports$1.version = "19.2.0";
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports$1, module) {
    {
      module.exports = require_react_development();
    }
  }
});

// src/surface.tsx
var import_react9 = __toESM(require_react());

// src/lib/AnimatePresence.tsx
var import_react = __toESM(require_react());
var AnimatePresenceContext = import_react.default.createContext(null);

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

// src/lib/context.ts
var import_react2 = __toESM(require_react());
var surfaceContext = import_react2.default.createContext(null);
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

// src/lib/useAnimatedStyle.ts
var import_react4 = __toESM(require_react());
var Natural = (value, callback) => Animated.withTiming(
  value,
  {
    duration: 300,
    easing: Animated.Easing.bezier(0.25, 0.1, 0.25, 1),
    reduceMotion: Animated.ReduceMotion.System
  },
  callback
);

// src/lib/useDynamicSharedValues.tsx
var import_react3 = __toESM(require_react());
function useDynamicSharedValues() {
  const ref = import_react3.default.useRef({}).current;
  import_react3.default.useEffect(() => {
    return () => {
      Object.values(ref).forEach((value) => {
        Animated.cancelAnimation(value.shared);
      });
    };
  }, []);
  import_react3.default.useEffect(() => {
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
  const [state] = import_react4.default.useState(() => ({
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
  import_react4.default.useEffect(() => {
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

// src/lib/useComponentOverrides.tsx
var import_react6 = __toESM(require_react());

// src/lib/useRerenderRef.ts
var import_react5 = __toESM(require_react());
var useRerenderRef = (initialValue) => {
  const [state, rerender] = import_react5.default.useState(() => ({ current: initialValue() }));
  return {
    current: state.current,
    rerender: () => rerender((prev) => ({ ...prev }))
  };
};

// src/lib/useComponentOverrides.tsx
var InteractionStateContext = import_react6.default.createContext(null);
var InteractionStateProvider = (props) => {
  const parentContext = import_react6.default.useContext(InteractionStateContext) || {};
  return /* @__PURE__ */ import_react6.default.createElement(
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
  const parentContext = import_react6.default.useContext(InteractionStateContext) || {};
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

// src/lib/useDeviceOrientation.tsx
var import_react7 = __toESM(require_react());
var OrientationContext = (0, import_react7.createContext)(null);
var OrientationProvider = ({ children }) => {
  const [orientation, setOrientation] = (0, import_react7.useState)(null);
  (0, import_react7.useEffect)(() => {
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
  return /* @__PURE__ */ React.createElement(OrientationContext.Provider, { value: orientation }, children);
};
var useDeviceOrientation = () => {
  const orientation = (0, import_react7.useContext)(OrientationContext);
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

// src/lib/useScreen.tsx
var import_react8 = __toESM(require_react());
var DimensionsContext = import_react8.default.createContext(null);
var ScreenDimensionProvider = (props) => {
  const dimensions = useScreenDimensions();
  return /* @__PURE__ */ import_react8.default.createElement(DimensionsContext.Provider, { value: dimensions }, props.children);
};
var useScreenDimensions = () => {
  const dimensionCtx = import_react8.default.useContext(DimensionsContext);
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

// src/surface.tsx
var createTheme = (theme) => {
  return theme;
};
var createSurfaced = () => {
  const surfaceAny = anyStyle();
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
    const context = import_react9.default.useContext(surfaceContext);
    return context;
  };
  const ThemeProvider = (props) => {
    return /* @__PURE__ */ import_react9.default.createElement(ScreenDimensionProvider, null, /* @__PURE__ */ import_react9.default.createElement(OrientationProvider, null, /* @__PURE__ */ import_react9.default.createElement(reactNativeKeyboardController.KeyboardProvider, null, /* @__PURE__ */ import_react9.default.createElement(surfaceContext.Provider, { value: props.theme }, props.children))));
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
          return /* @__PURE__ */ import_react9.default.createElement(Component, { as: Component2, ...props });
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
          const presence = import_react9.default.useContext(AnimatePresenceContext);
          const styles = styleManager.getStylesheetForTheme(theme);
          const compRef = import_react9.default.useRef(null);
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
            /* @__PURE__ */ import_react9.default.createElement(
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
              componentProps.gesture && ((props2) => /* @__PURE__ */ import_react9.default.createElement(reactNativeGestureHandler.GestureDetector, { gesture: componentProps.gesture, ...props2 })),
              props.stateId && ((props2) => /* @__PURE__ */ import_react9.default.createElement(
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
    useFonts,
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
var createViewBase = (surfaced) => surfaced(reactNative.View).with((tokens) => ({
  variants: {
    // @ts-expect-error
    position: Position,
    zIndex: surfaced.any({ attribute: "zIndex", number: true }),
    z: surfaced.any({ attribute: "zIndex", number: true }),
    absoluteFill: { true: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } },
    absolute: { true: Position.absolute },
    // @ts-expect-error
    fixed: { true: Position.fixed },
    // @ts-expect-error
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
    // backgroundRepeat: {
    //   'repeat': { backgroundRepeat: 'repeat' as const },
    //   'repeat-x': { backgroundRepeat: 'repeat-x' },
    //   'repeat-y': { backgroundRepeat: 'repeat-y' },
    //   'no-repeat': { backgroundRepeat: 'no-repeat' },
    //   'space': { backgroundRepeat: 'space' },
    // },
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
      // @ts-expect-error
      "visible": { overflowX: "visible" },
      // @ts-expect-error
      "hidden": { overflowX: "hidden" },
      // @ts-expect-error
      "scroll": { overflowX: "scroll" }
    },
    // @ts-expect-error
    overflowXVisible: { true: { overflowX: "visible" } },
    // @ts-expect-error
    overflowXHidden: { true: { overflowX: "hidden" } },
    // @ts-expect-error
    overflowXScroll: { true: { overflowX: "scroll" } },
    overflowY: {
      // @ts-expect-error
      "visible": { overflowY: "visible" },
      // @ts-expect-error
      "hidden": { overflowY: "hidden" },
      // @ts-expect-error
      "scroll": { overflowY: "scroll" }
    },
    // @ts-expect-error
    overflowYVisible: { true: { overflowY: "visible" } },
    // @ts-expect-error
    overflowYHidden: { true: { overflowY: "hidden" } },
    // @ts-expect-error
    overflowYScroll: { true: { overflowY: "scroll" } },
    display: {
      "none": { display: "none" },
      "flex": { display: "flex" }
    },
    visibility: {
      // @ts-expect-error
      "visible": { visibility: "visible" },
      // @ts-expect-error
      "hidden": { visibility: "hidden" },
      // @ts-expect-error
      "collapse": { visibility: "collapse" }
    },
    // @ts-expect-error
    visibilityVisible: { true: { visibility: "visible" } },
    // @ts-expect-error
    visibilityHidden: { true: { visibility: "hidden" } },
    // @ts-expect-error
    visibilityCollapse: { true: { visibility: "collapse" } },
    backdropFilter: surfaced.any({ attribute: "backdropFilter", string: true }),
    backfaceVisibility: {
      hidden: { backfaceVisibility: "hidden" },
      visible: { backfaceVisibility: "visible" }
    },
    elevation: surfaced.any({ attribute: "elevation", number: true }),
    boxShadow: surfaced.any({ attribute: "boxShadow", string: true }),
    overscrollBehavior: {
      // @ts-expect-error
      "auto": { overscrollBehavior: "auto" },
      // @ts-expect-error
      "contain": { overscrollBehavior: "contain" },
      // @ts-expect-error
      "none": { overscrollBehavior: "none" }
    },
    userSelect: {
      // @ts-expect-error
      "none": { userSelect: "none" },
      // @ts-expect-error
      "text": { userSelect: "text" },
      // @ts-expect-error
      "all": { userSelect: "all" },
      // @ts-expect-error
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
      // @ts-expect-error
      "auto": { overscrollBehaviorX: "auto" },
      // @ts-expect-error
      "contain": { overscrollBehaviorX: "contain" },
      // @ts-expect-error
      "none": { overscrollBehaviorX: "none" }
    },
    overscrollBehaviorY: {
      // @ts-expect-error
      "auto": { overscrollBehaviorY: "auto" },
      // @ts-expect-error
      "contain": { overscrollBehaviorY: "contain" },
      // @ts-expect-error
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
var createTextBase = (surfaced) => surfaced(reactNative.Text).with((tokens) => ({
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
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/

exports.createSurfaced = createSurfaced;
exports.createTextBase = createTextBase;
exports.createTheme = createTheme;
exports.createViewBase = createViewBase;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map