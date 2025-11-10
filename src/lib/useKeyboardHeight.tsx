import { KeyboardController, useKeyboardHandler, useKeyboardState } from 'react-native-keyboard-controller';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

export { KeyboardProvider } from 'react-native-keyboard-controller';

export const useKeyboard = () => {
  const keyboardHeight = useSharedValue(0);

  const keyboardState = useKeyboardState();

  useKeyboardHandler(
    {
      onMove: event => {
        'worklet';
        keyboardHeight.value = Math.max(event.height, 0);
      },
    },
    []
  );
  return {
    animatedHeight: keyboardHeight,
    state: keyboardState,
    controller: KeyboardController,
  };
};

export const KeyboardOffsetView = () => {
  const keyboard = useKeyboard();
  
  const animatedStyle= useAnimatedStyle(() => {
    return {
      width: '100%',
      height: keyboard.animatedHeight.value
    }
  });

  return (
    <Animated.View  style={animatedStyle} />
  );
};
