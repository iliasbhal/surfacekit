import React from "react";
import {
  cancelAnimation,
  makeMutable,
  SharedValue,
} from "react-native-reanimated";

interface Store {
  shared: SharedValue<any>;
  value: any;
  previous: any;
  next: any;
}

export function useDynamicSharedValues() {
  const ref = React.useRef<Record<string, Store>>({}).current;

  React.useEffect(() => {
    return () => {
      Object.values(ref).forEach((value) => {
        cancelAnimation(value.shared);
      });
    };
  }, []);

  React.useEffect(() => {

  })

  const order: string[] = [];

  return {
    ref,
    get: (name: string) => {
      return ref[name].shared?.value;
    },
    has: (name: string) => {
      return ref[name].shared !== undefined;
    },
    target(name: string, next: any) {
      ref[name].previous = ref[name].next;
      ref[name].next = next;

      const hasChanged = ref[name].previous !== ref[name].next;
      return hasChanged;
    },
    init: (name: string, initial: any) => {
      if (ref[name]?.shared) return false;
      // console.log('styleProp - init', name, initial);
      ref[name] = {
        shared: makeMutable(initial),
        previous: initial,
        next: initial,
        value: null,
      };

      return true;
    },
    set: (name: string, next: any) => {
      // console.log('ref', name, next, ref);
      if (!ref[name].shared) return;
      order.push(name);
      ref[name].shared.value = next;
    },

    forEach(callback: (name: string, value: any) => void) {
      return order.forEach((name) => {
        callback(name, ref[name].shared);
      });
    },
  };
}
