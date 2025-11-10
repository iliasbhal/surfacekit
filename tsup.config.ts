import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  external: [
    "react-native",
    "expo-font",
    "expo-screen-orientation",
    "react-native-gesture-handler",
    "react-native-keyboard-controller",
    "react-native-reanimated",
    "react-native-worklets",
  ],
  esbuildOptions(options) {
    options.platform = 'browser'
  }
})