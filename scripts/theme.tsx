import * as Inter from '@expo-google-fonts/inter';
import { createTheme } from "../src";

export const dark = createTheme({
  fonts: {
    Inter: {
      Light: Inter.Inter_300Light,
      Regular: Inter.Inter_400Regular,
      Medium: Inter.Inter_500Medium,
      SemiBold: Inter.Inter_600SemiBold,
      Bold: Inter.Inter_700Bold,
      ExtraBold: Inter.Inter_800ExtraBold,
      Black: Inter.Inter_900Black,
    },
  },
  breakpoints: {
    width: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
    height: {
      sm: 667,  // iPhone SE
      md: 844,  // iPhone 12/13/14
      lg: 926,  // iPhone 12/13/14 Pro Max
      xl: 1024, // iPad Mini
      '2xl': 1366, // iPad Pro
    },
  },
  fontSizes: {
    '4': 16,
    '5': 20,
    '6': 24,
    '7': 28,
    '8': 32,
    '9': 36,
    '10': 40,
    '11': 48,
    '12': 56,
    '13': 64,
  },
  colors: {
    // Primary colors
    primary50: 'rgb(229, 242, 255)',
    primary100: 'hsl(210, 100%, 90%)',
    primary200: 'hsl(210, 100%, 80%)',
    primary300: 'hsl(210, 100%, 70%)',
    primary400: 'hsl(210, 100%, 60%)',
    primary:    'hsl(210, 100%, 50%)',
    primary500: 'hsl(210, 100%, 50%)', // Base primary
    primary600: 'hsl(210, 100%, 40%)',
    primary700: 'hsl(210, 100%, 30%)',
    primary800: 'hsl(210, 100%, 20%)',
    primary900: 'hsl(210, 100%, 10%)',

    // Secondary colors
    secondary: 'hsl(270, 100%, 50%)',
    secondary50: 'hsl(270, 100%, 95%)',
    secondary100: 'hsl(270, 100%, 90%)',
    secondary200: 'hsl(270, 100%, 80%)',
    secondary300: 'hsl(270, 100%, 70%)',
    secondary400: 'hsl(270, 100%, 60%)',
    secondary500: 'hsl(270, 100%, 50%)', // Base secondary
    secondary600: 'hsl(270, 100%, 40%)',
    secondary700: 'hsl(270, 100%, 30%)',
    secondary800: 'hsl(270, 100%, 20%)',
    secondary900: 'hsl(270, 100%, 10%)',

    // Surface colors
    surfaces: {
      0: 'hsl(0, 0%, 100%)',
      50: 'hsl(0, 0.00%, 98.40%)',
      100: 'hsl(227, 44%, 96.90%)',
      200: 'hsl(0, 0%, 93%)',
      300: 'hsl(0, 0%, 88%)',
      400: 'hsl(0, 0%, 74%)',
      500: 'hsl(0, 0%, 62%)', // Base 
      600: 'hsl(0, 0%, 46%)',
      700: 'hsl(0, 0%, 38%)',
      800: 'hsl(0, 0%, 26%)',
      850: 'hsl(0, 0%, 19.5%)',
      900: 'hsl(0, 0%, 13%)',
      1000: 'hsl(0, 0%, 0%)',

      // 0: 'hsl(0, 0%, 0%)',
      // 50: 'hsl(0, 0%, 1.6%)', 
      // 100: 'hsl(0, 0%, 3.1%)',
      // 200: 'hsl(0, 0%, 7%)',
      // 300: 'hsl(0, 0%, 12%)',
      // 400: 'hsl(0, 0%, 26%)',
      // 500: 'hsl(0, 0%, 38%)', // Base
      // 600: 'hsl(0, 0%, 54%)',
      // 700: 'hsl(0, 0%, 62%)',
      // 800: 'hsl(0, 0%, 74%)',
      // 850: 'hsl(0, 0%, 80.5%)',
      // 900: 'hsl(0, 0%, 87%)',
      // 1000: 'hsl(0, 0%, 100%)',
    },

    // Additional semantic colors
    error: 'hsl(0, 84%, 50%)',
    warning: 'hsl(38, 92%, 50%)',
    success: 'hsl(160, 84%, 39%)',
    info: 'hsl(217, 91%, 60%)'
  },
  shadows: {
    1: 'aAAA'
  },
  size: {
    size0: 0,
    size1: 1,
    size2: 2,
    size3: 4,
    size4: 8,
    [`size4.5`]: 10,
    size5: 12,
    [`size5.5`]: 14,
    size6: 16,
    [`size6.5`]: 20,
    size7: 24,
    [`size7.5`]: 28,
    size8: 32,
    [`size8.5`]: 36,
    size9: 40,
    size10: 48,
    ['size10.5']: 56,
    size11: 64,
    size12: 80,
    size13: 96,
    size14: 160,
    size15: 256,
  }
} as const);



