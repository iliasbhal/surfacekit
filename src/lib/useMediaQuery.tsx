import { useScreenDimensions } from "./useScreen";

import { Platform } from "react-native";
import { useDeviceOrientation } from "./useDeviceOrientation";


export const useMediaQuery = <Builder extends ReturnType<typeof createBooleanBuilder>>(mediaBuild: (arg: Builder) => { value: boolean }) => {

  const dimensions = useScreenDimensions();
  const orientation = useDeviceOrientation();

  const builder =  createBooleanBuilder({ 
    dimension: dimensions, 
    orientation: orientation,
  });

  const result = mediaBuild(builder as Builder)
  return result.value;
}

type BuilderConfig = { dimension: ReturnType<typeof useScreenDimensions>, orientation: ReturnType<typeof useDeviceOrientation> };

const getPlatform = () => {
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';
  if (isMobile) return 'mobile';
  
  // @ts-expect-error
  const isDesktop = typeof window !== 'undefined' && window.__TAURI__;
  if (isDesktop) return 'desktop';

  const isWeb = Platform.OS === 'web'
  if (isWeb) return 'web';

  return 'web';
}

const createBooleanBuilder = (state: BuilderConfig) => {
  const builder = (currentBoolean: boolean, initial: boolean = false) => {

    const isPlatform = (platform: 'ios' | 'android' | 'web' | 'mobile' | 'desktop') => {
        return platform === 'mobile' 
          ? Platform.OS === 'ios' || Platform.OS === 'android'
          : platform === 'desktop'
            ? Platform.OS === 'web' && typeof window !== 'undefined' && !('ontouchstart' in window) 
            : Platform.OS === platform;
    }

    const isEqual = (value1: number, value2: number) => {
      return value1 === value2;
    }

    const isLargerThan = (value1: number, value2: number) => {
      return value1 > value2;
    }

    const isSmallerThan = (value1: number, value2: number) => {
      return value1 < value2;
    }
    
    const isBetween = (value1: number, value2: number, value3: number) => {
      return value1 >= value2 && value1 <= value3;
    }

    const compare = (mode: 'and' | 'or', value1: boolean, value2: boolean) => {
      if (mode === 'or' && initial) {
        return !!value2;
      }

      const result = mode === 'and' 
        ? !!(value1 && value2)
        : !!(value1 || value2);

      return result;
    }

    const isEqualBuilder = (current: number, mode: 'and' | 'or') => (value: number) => {
      const nextBoolean = compare(mode, currentBoolean, isEqual(current, value));
      return builder(nextBoolean);
    };

    const isLargerThanBuilder = (current: number, mode: 'and' | 'or') => (value: number) => {
      const nextBoolean = compare(mode, currentBoolean, isLargerThan(current, value));
      return builder(nextBoolean);
    };

    const isSmallerThanBuilder = (current: number, mode: 'and' | 'or') => (value: number) => {
      const nextBoolean = compare(mode, currentBoolean, isSmallerThan(current, value));
      return builder(nextBoolean);
    };

    const isBetweenBuilder = (current: number, mode: 'and' | 'or') => (min: number, max: number) => {

      const nextBoolean = compare(mode, currentBoolean, isBetween(current, min, max));
      return builder(nextBoolean);
    };

    const orientationBuilder = (current: 'portrait' | 'landscape', mode: 'and' | 'or') => (orientation: 'portrait' | 'landscape') => {
      const nextBoolean = compare(mode, currentBoolean, orientation === 'portrait'
        ? state.dimension.height > state.dimension.width
        : state.dimension.width > state.dimension.height);
      return builder(nextBoolean);
    };

    const platformBuilder = (current: 'web' | 'mobile' | 'desktop', mode: 'and' | 'or') => (platform: 'ios' | 'android' | 'web' | 'mobile' | 'desktop') => {
      const nextBoolean = compare(mode, currentBoolean, isPlatform(platform));
      return builder(nextBoolean);
    };

    const And = {
      platform: platformBuilder(getPlatform(), 'and'),
      orientation: orientationBuilder(state.orientation, 'and'),
      width: {
        is: isEqualBuilder(state.dimension.width, 'and'),
        largerThan: isLargerThanBuilder(state.dimension.width, 'and'),
        smallerThan: isSmallerThanBuilder(state.dimension.width, 'and'),
        between: isBetweenBuilder(state.dimension.width, 'and'),
      },
      height: {
        is: isEqualBuilder(state.dimension.height, 'and'),
        largerThan: isLargerThanBuilder(state.dimension.height, 'and'),
        smallerThan: isSmallerThanBuilder(state.dimension.height, 'and'),
        between: isBetweenBuilder(state.dimension.height, 'and'),
      }
    };

    const Or = {
      platform: platformBuilder(getPlatform(), 'or'),
      orientation: orientationBuilder(state.orientation, 'or'),
      width: {
        is: isEqualBuilder(state.dimension.width, 'or'),
        largerThan: isLargerThanBuilder(state.dimension.width, 'or'),
        smallerThan: isSmallerThanBuilder(state.dimension.width, 'or'),
        between: isBetweenBuilder(state.dimension.width, 'or'),
      },
      height: {
        is: isEqualBuilder(state.dimension.height, 'or'),
        largerThan: isLargerThanBuilder(state.dimension.height, 'or'),
        smallerThan: isSmallerThanBuilder(state.dimension.height, 'or'),
        between: isBetweenBuilder(state.dimension.height, 'or'),
      }
    }

    return {
      value: currentBoolean,
      ...And,
      and: Object.assign((...booleans: { value: boolean }[]) => {
        const nextBoolean = booleans.every(boolean => boolean.value);
        return builder(nextBoolean);
      }, And),
      or: Object.assign((...booleans: { value: boolean }[]) => {
        const nextBoolean = booleans.some(boolean => boolean.value);
        return builder(nextBoolean);
      }, Or),
    };
  }

  return builder(true, true);
};