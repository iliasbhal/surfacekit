import { Easing, ReduceMotion, withDelay, withTiming } from "react-native-reanimated";

export const Natural = (value: number, callback?: () => void) => withTiming(
    value,
    {
      duration: 200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
      // easing: Easing.out(Easing.quad),
      // easing: Easing.,
      reduceMotion: ReduceMotion.System,
    },
    callback,
  );


export const animateToValue = (value: number, config: any,callback?: () => void) => {
  if (typeof config === 'boolean') {
    return Natural(value, callback);
  }

  return Natural(value, callback);
}