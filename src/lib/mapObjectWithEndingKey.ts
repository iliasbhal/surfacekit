export type MapEndingsWithKey<T extends Record<string, any> = {}> = {
  [K in Exclude<keyof T, number | symbol>]: T[K] extends object
  ? MapEndingsWithKey<T[K]>
  : K
};

