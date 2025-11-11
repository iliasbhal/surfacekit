<img src="./assets/hero.svg" />
<div style="margin-bottom: 30px"></div>

# SurfaceKit ▉▊▋▍▎▏

> Lightning-fast, type-safe surface primitives for React and React Native.

## Why SurfaceKit?
- Move from design tokens to production surfaces without boilerplate
- Compose typed variants instead of juggling style objects
- Override behaviour declaratively for hover, press, focus, and presence
- First-class support for Reanimated, gesture-handler, and Expo fonts
- Bring your own theme shape; SurfaceKit infers the rest

## Table of Contents
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Wrap Your App With the Provider](#wrap-your-app-with-the-provider)
- [Build Surfaces With `.with` Factories](#build-surfaces-with-with-factories)
- [Variants 101](#variants-101)
- [Dynamic Variants With `surfaced.any`](#dynamic-variants-with-surfacedany)
- [Token Lookups and Negative Values](#token-lookups-and-negative-values)
- [Composing Surfaces](#composing-surfaces)
- [Per-Instance Overrides](#per-instance-overrides)
- [Gestures, Focus, and Interaction State](#gestures-focus-and-interaction-state)
- [Animation Hooks](#animation-hooks)
- [Helpful Hooks and Utilities](#helpful-hooks-and-utilities)
- [Base Building Blocks](#base-building-blocks)
- [Testing & Next Steps](#testing--next-steps)

## Installation

```bash
npm install surfacekit
# or
yarn add surfacekit
# or
pnpm add surfacekit
```

SurfaceKit works with React Native, Expo, and universal (web) projects. Reanimated, gesture-handler, and Expo fonts are optional but unlock advanced features demonstrated below.

## Quick Start

```tsx
// theme.ts
import { colors, spacing, borderRadius } from './tokens';

export const theme = {
  colors,
  spacing,
  borderRadius,
  fonts: {
    paragraph: {
      default: require('./assets/Inter-Regular.ttf'),
      medium: require('./assets/Inter-Medium.ttf'),
    },
  },
  // add any additional buckets you need – SurfaceKit keeps the type information
};
```

```tsx
// surfaced.ts
import { createSurfaced } from 'surfacekit';
import type { theme } from './theme';

type AppTheme = typeof theme;
export const surfaced = createSurfaced<AppTheme>();
```

```tsx
// App.tsx
import { View, Text } from 'react-native';
import { surfaced } from './surfaced';
import { theme } from './theme';

const Card = surfaced(View).with((tokens) => ({
  padding: tokens.spacing.space6,
  backgroundColor: tokens.colors.gray[900],
  borderRadius: tokens.borderRadius.lg,
  variants: {
    elevation: surfaced.any({ attribute: 'elevation', number: true }),
    tone: {
      primary: { backgroundColor: tokens.colors.blue[600] },
      neutral: { backgroundColor: tokens.colors.gray[800] },
    },
  },
}));

const Heading = surfaced(Text).with((tokens) => ({
  variants: {
    intent: {
      primary: { color: tokens.colors.white },
      secondary: { color: tokens.colors.gray[300] },
    },
    fontSize: surfaced.any({ attribute: 'fontSize', tokens: tokens.fontSize, number: true }),
  },
}));

export default function App() {
  return (
    <surfaced.Provider theme={theme}>
      <Card tone="primary" elevation={4}>
        <Heading intent="secondary" fontSize="lg">
          SurfaceKit in action
        </Heading>
      </Card>
    </surfaced.Provider>
  );
}
```

## Wrap Your App With the Provider

`surfaced.Provider` must wrap any components created with `createSurfaced`. The provider delivers your theme, screen dimensions, orientation, keyboard height, and media query context to every surface.

```tsx
<surfaced.Provider theme={theme}>
  {/* your tree */}
</surfaced.Provider>
```

Your theme can be any nested object. SurfaceKit preserves typing, so using dot-separated token paths like `paragraph.medium` or `colors.gray.500` is type-safe.

## Build Surfaces With `.with` Factories

Call `surfaced(Component).with(factory)` to describe the base style for a component. The factory receives the current theme. Return regular style properties plus a `variants` map, optional `dynamic` style function, and optional `transition` / `animation` configuration.

```tsx
const Flex = surfaced(View).with((tokens) => ({
  flexDirection: 'row',
  alignItems: 'center',
  variants: {
    danger: {
      true: { backgroundColor: tokens.colors.red[300] },
    },
    gap: surfaced.any({ attribute: 'gap', tokens: tokens.spacing, number: true, percentage: true }),
  },
}));
```

At runtime, SurfaceKit merges base styles, variant selections, dynamic styles, inline `style` props, and override styles into a single flattened style array.

## Variants 101

Variants let you expose new props that control styles without leaking implementation details.

- **Boolean variants** – provide a `true` or `false` key.
- **String/enum variants** – supply object keys for each option.
- **Boolean helper** – `surfaced.boolean({ ...style })` returns a `{ true: style }` map.
- **Order matters** – when multiple variants touch the same property, the last prop wins. `<Flex layer2 layer1 />` applies `layer1` last.

```tsx
const Badge = surfaced(View).with((theme) => ({
  paddingHorizontal: theme.spacing.space3,
  paddingVertical: theme.spacing.space1,
  borderRadius: theme.borderRadius.full,
  variants: {
    status: {
      success: { backgroundColor: theme.colors.green[300] },
      error: { backgroundColor: theme.colors.red[300] },
    },
    pill: {
      true: { borderRadius: theme.borderRadius.full },
    },
  },
}));
```

```tsx
<Badge status="success" pill />
```

## Dynamic Variants With `surfaced.any`

`surfaced.any(config)` turns a configuration object into a type-safe variant. Common options include:

| Option | Purpose |
| --- | --- |
| `attribute` / `attributes` | Target one or many style keys when the variant is active |
| `number`, `percentage`, `string`, `angle`, `color`, `time`, `any` | Enable built-in value types (e.g. `number: true` lets you pass numbers) |
| `tokens` | Map string values to token paths (dot notation supported) |
| `multiple` | Accept arrays of values (SurfaceKit maps each item) |
| `accumulate` | Group values into arrays (perfect for `transform`) |
| `fonts` | Resolve font tokens and register them with Expo Font |
| `compute` | Supply a function to compute styles dynamically from the incoming value |
| `custom` | Inject a `(style, config)` helper when you need full control (e.g. transforms) |

Examples pulled from the test suite:

```tsx
const Spacer = surfaced(View).with((tokens) => ({
  variants: {
    gap: surfaced.any({ attribute: 'gap', tokens: tokens.spacing, number: true, percentage: true }),
    size: surfaced.any({
      tokens: tokens.spacing,
      compute: (value) => ({ padding: value / 2 }),
    }),
    rotate: surfaced.any({ accumulate: 'transform', attribute: 'rotate', number: true, angle: true }),
  },
}));
```

```tsx
<Spacer gap="space8" />       // gap comes from tokens
<Spacer gap={10} />           // numbers work too
<Spacer size={12} />          // dynamic compute → padding: 6
<Spacer rotate={10} />        // transform accumulation
```

## Token Lookups and Negative Values

Token references can be nested: `fontFamily="paragraph.medium"` resolves to the correct font, and `color="give.me.a.color.hot"` walks arbitrary theme shapes. Prepend `-` to numeric tokens to flip the sign, e.g. `marginLeft="-space28"`.

SurfaceKit keeps falsy token values intact, so `gap="space0"` stays `0` instead of being dropped.

## Composing Surfaces

Surfaces can extend other surfaces. Calling `surfaced(Parent).with(...)` merges base styles, variants, dynamics, and transitions. Child variants override parent variants with the same name while preserving other keys.

```tsx
const Base = surfaced(View).with(() => ({
  variants: {
    layer: {
      true: { borderRadius: 8, backgroundColor: 'red' },
    },
  },
}));

const Fancy = surfaced(Base).with(() => ({
  variants: {
    layer: {
      true: { borderRadius: 16 },
    },
  },
}));

// Fancy merges: backgroundColor from Base + borderRadius from Fancy
```

Use `.as(Component)` to swap the underlying primitive while keeping the same styling contract.


`with` can be an object or an array. When you pass styles in `with.style`, they are appended to the style array so you can tweak individual instances without re-declaring variants.

### Overrides

Use the `overrides` prop to describe how a component should react to hover, press, focus, entrance, or exit state.  You can return objects, arrays, or React elements built with the provided `Props` helper.

```tsx
<Button
  stateId="cta"
  overrides={(state) => ([
    state.hovered && { tone: "primary" },
    state.pressed &&  { elevation: 12},
  ])}
/>
```

Internally, SurfaceKit memoises computed variants so repeated overrides stay fast, even for dynamic variants.

## Gestures, Focus, and Interaction State

- Pass a `gesture={Gesture.*(...)}` from `react-native-gesture-handler` to mount complex gesture pipelines. SurfaceKit automatically composes gestures declared in overrides.
- Add `stateId` to opt-in to interaction tracking. All descendants can read the shared state via `Interaction.Inline`.

```tsx
import { Gesture } from 'react-native-gesture-handler';

<Surface
  stateId="item"
  gesture={Gesture.Hover().onBegin(() => console.log('hover'))}
  overrides={(state) => ([
    state.hovered && { tone="primary" },
  ])}
/>
```

## Animation Hooks

SurfaceKit integrates with Reanimated 3/4:

- `transition` – describe declarative transitions per surface.
- `animation` – attach keyframe objects and durations.
- `entering` / `exiting` – forward Reanimated animation builders.
- Wrap groups with `AnimatePresence` (exported from the root) to orchestrate enter/exit animations while keeping overrides working.

## Helpful Hooks and Utilities

`createSurfaced` exposes several helpers:

- `surfaced.useTheme()` – read the active theme.
- `surfaced.useFonts()` – register font tokens automatically with Expo Font and know when they are ready.
- `surfaced.useOrientation()` – observe device orientation changes.
- `surfaced.useMediaQuery(query)` – evaluate responsive breakpoints.
- `surfaced.useVariantStyle(Component, variant, value)` – compute raw variant output outside render.

`Interaction.Inline` lets you consume interaction state in children:

```tsx
<Interaction.Inline stateId="cta">
  {(state) => state.hovered ? <HoverTooltip /> : null}
</Interaction.Inline>
```

## Base Building Blocks

SurfaceKit ships with opinionated primitives you can opt into:

- `createViewBase(surfaced)` – returns a surface packed with layout, spacing, transform, and background variants (mirrors the exhaustive tests in `tests/charm.test.tsx`).
- `createTextBase(surfaced)` – typography-focused surface with font, color, and decoration variants wired to tokens.
- `ScreenDimension` – provider & hook pair already included inside `surfaced.Provider`.

Use these as ready-made building blocks or as references when crafting your own variant maps.

## Testing & Next Steps

The test suite under `tests/*.test.tsx` demonstrates every capability in context. Start by running the stories from `tests/charm.test.tsx` to see how variants, tokens, overrides, and composition behave under snapshot tests.

Have ideas or questions? Open an issue, file a PR, and if SurfaceKit saves you time, a ⭐️ on GitHub goes a long way.
