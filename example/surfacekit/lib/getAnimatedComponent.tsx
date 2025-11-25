import { JSXElementConstructor } from "react";
import Animated from "react-native-reanimated";

const animatedComponentByComponent = new WeakMap<any, any>();

export const getAnimatedComp = (comp: JSXElementConstructor<any>) => {
  const componentName = (comp as any).displayName as keyof typeof Animated;
  if (animatedComponentByComponent.has(comp)) {
    return animatedComponentByComponent.get(comp);
  }
  
  const animatedComponent = Animated[componentName]
    || Animated.createAnimatedComponent(comp);

  animatedComponentByComponent.set(comp, animatedComponent);

  return animatedComponent;
}