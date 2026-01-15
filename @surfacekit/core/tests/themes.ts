import { Inter_300Light, Inter_500Medium } from '@expo-google-fonts/inter';
import * as tokens from './tokens';

// Main theme object that combines all tokens
export const lightTheme = {
  fonts: {
    paragraph: {
      default: Inter_300Light,
      medium: Inter_500Medium,
    },
  },

  colors: tokens.colors,
  spacing: tokens.spacing,
  borderRadius: tokens.borderRadius,
  fontSize: tokens.fontSize,
  fontWeight: tokens.fontWeight,
  lineHeight: tokens.lineHeight,
  // shadows: tokens.shadows,
  zIndex: tokens.zIndex,
  opacity: tokens.opacity,
  borderWidth: tokens.borderWidth,
  breakpoints: tokens.breakpoints,
  animation: tokens.animation,
  surfaces: {
    surface0: tokens.colors.gray[950],
    surface1: tokens.colors.gray[900],
    surface2: tokens.colors.gray[800],
    surface3: tokens.colors.gray[700],
    surface4: tokens.colors.gray[600],
    surface5: tokens.colors.gray[500],
  },
  textColors: {
    primary: tokens.colors.gray[900],
    secondary: tokens.colors.gray[700],
    tertiary: tokens.colors.gray[500],
    quaternary: tokens.colors.gray[400],
    disabled: tokens.colors.gray[300],
    inverse: tokens.colors.white,
    brand: tokens.colors.blue[600],
    success: tokens.colors.green[600],
    warning: tokens.colors.yellow[600],
    error: tokens.colors.red[600],
  },
  borderColors: {
    primary: tokens.colors.gray[200],
    secondary: tokens.colors.gray[300],
    tertiary: tokens.colors.gray[400],
    brand: tokens.colors.blue[300],
    success: tokens.colors.green[300],
    warning: tokens.colors.yellow[300],
    error: tokens.colors.red[300],
  },
}
