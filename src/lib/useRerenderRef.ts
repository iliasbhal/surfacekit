import React from "react";

export const useRerenderRef = <T extends object>(initialValue: () => T) => {
  const [state, rerender] = React.useState(() => ({ current: initialValue() }));
  
  return {
    current: state.current,
    rerender: () => rerender((prev) => ({ ...prev })),
  }
}