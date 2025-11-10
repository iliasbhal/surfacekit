import { DataType } from 'csstype';
import { ObjectEndingPaths } from "./compilePaths";

export type AnyConfig<Attribute extends string> = {
  number?: boolean,
  angle?: boolean,
  color?: boolean,
  any?: boolean,
  percentage?: boolean,
  accumulate?: string,
  fonts?: boolean,
  multiple?: boolean,
  time?: boolean,
  string?: boolean,
  tokens?: Record<string, any>
} & ({ attribute: Attribute } | { attributes: Attribute[] } | { compute: (value: any) => any });

type ColorString = `rgb(${number}, ${number}, ${number})` | `rgba(${number},${number},${number},${number})` | `hsl(${number}, ${number}%, ${number}%)` | `#${string}` | DataType.NamedColor;

type TimeString = `${number}${'s' | 'ms'}`

type Angle = `${number}deg`;

type StyleVariant<K extends string, V extends any extends string ? string : number> = Record<V, Record<K, V>>

type ResultFor<A extends string, Config extends AnyConfig<A>> =
  (Config['number'] extends true ? StyleVariant<A, number> : {})
  & (Config['percentage'] extends true ? StyleVariant<A, `${number}%`> : {})
  & (Config['angle'] extends true ? StyleVariant<A, Angle> : {})
  & (Config['color'] extends true ? StyleVariant<A, ColorString> : {})
  & (Config['time'] extends true ? StyleVariant<A, TimeString> : {})
  & (Config['string'] extends true ? StyleVariant<A, string> : {})
  & (Config['any'] extends true ? StyleVariant<A, any> : {})
  & (Config['tokens'] extends never ? {} : StyleVariant<A, ObjectEndingPaths<Config['tokens']>>)
  & (Config extends { number: true, tokens: any } ? StyleVariant<A, `-${ObjectEndingPaths<Config['tokens']>}`> : {})

export const VariantFactoryKey = "__InternalAnyConfig__";

export const anyStyle = () => <A extends string, C extends AnyConfig<A>>(config: C): C['multiple'] extends true ? ResultFor<A, C>[] : ResultFor<A, C> => {
  return {
    [VariantFactoryKey]: config
  } as any
}

export const booleanStyle = <Style>(style: Style) => {
  return {
    true: style,
  }
}



// export const dark = {
//   colors: {
//     // Primary colors
//     primary: 'hsl(210, 100%, 50%)',
//     primary50: 'hsl(210, 79.00%, 58.80%)',

//     // Surface colors
//     surfaces: {
//       50: 'hsl(0, 0%, 100%)',
//       100: 'hsl(0, 0%, 97%)',
//     },
//   }
// };

// const AAA : ObjectEndingPaths<typeof dark> = 'colors.surfaces.100'
