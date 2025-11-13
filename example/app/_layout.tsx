import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

if (typeof window !== 'undefined') {
  window['BBB_REACT'] = React;
}

import { useColorScheme } from 'react-native';
import { surfaced, themes } from '@/uikit';

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <Stack />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}


const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const colorScheme = useColorScheme();
  const navigationTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <surfaced.Provider theme={themes.dark}>
      <NavigationThemeProvider value={navigationTheme}>
        {props.children}
      </NavigationThemeProvider>
    </surfaced.Provider>
  );
}


