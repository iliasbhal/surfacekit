import { Easing, ReduceMotion, withDelay, withTiming } from "react-native-reanimated";

export const Natural = (value: number, callback?: () => void) => withTiming(
    value,
    {
      duration: 2000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
      reduceMotion: ReduceMotion.System,
    },
    callback,
  );
