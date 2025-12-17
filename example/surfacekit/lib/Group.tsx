import React from "react";
import { GestureState } from "./useComponentOverrides";

const InteractionStateContext = React.createContext<any>(null);

export type InteractionState = ReturnType<GestureState["getOverrideContext"]>;

export const InteractionStateProvider = (
  props: React.PropsWithChildren<{ groupId: string; state: InteractionState }>,
) => {
  const parentContext = React.useContext(InteractionStateContext) || {};
  const nextContext = {
    ...parentContext,
    [props.groupId]: props.state,
  };

  return (
    <InteractionStateContext.Provider value={nextContext}>
      {props.children}
    </InteractionStateContext.Provider>
  );
};

export const useInteractionStateContext = (config: { groupId: string }) => {
  const parentContext = React.useContext(InteractionStateContext) || {};
  const state = parentContext[config.groupId];
  return state;
};

export const InteractionStateInline = (
  props: { id: string } & {
    children: (state: InteractionState) => React.ReactNode;
  },
) => {
  const state = useInteractionStateContext({ groupId: props.id });
  return props.children(state);
};
