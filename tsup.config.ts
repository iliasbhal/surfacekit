import { defineConfig } from 'tsup'
import packageJSON from './package.json'

const devDependencies = Object.keys(packageJSON.devDependencies);
const peerDependencies = Object.keys(packageJSON.peerDependencies);

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
    ...devDependencies,
    ...peerDependencies,
  ],
  esbuildOptions(options) {
    options.platform = 'browser'
  }
})