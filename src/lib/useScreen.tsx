import React from "react";
import { ScaledSize, useWindowDimensions } from "react-native";

const DimensionsContext = React.createContext<ScaledSize>(null!);

export const ScreenDimensionProvider : React.FC<React.PropsWithChildren> = (props) => {
  const dimensions = useScreenDimensions();

  return (
    <DimensionsContext.Provider value={dimensions}>
      {props.children}
    </DimensionsContext.Provider>
  )
}

export const useScreenDimensions = () => {
  const dimensionCtx = React.useContext(DimensionsContext);
  if (dimensionCtx) {
    return dimensionCtx;
  }

  const dimensions = useWindowDimensions()
  return dimensions
}