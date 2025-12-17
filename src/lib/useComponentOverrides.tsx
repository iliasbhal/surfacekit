import React from "react";
import { Gesture, GestureType } from "react-native-gesture-handler";
import { AnimatePresenceContextValue } from "../AnimatePresence";
import { useRerenderRef } from "./useRerenderRef";
import { useInteractionStateContext } from "./Group";

export type GestureState = ReturnType<typeof useComponentOverrides>;

export const useComponentOverrides = (props: any) => {
  const defaultActive = props.id ? true : false;

  const { current, rerender } = useRerenderRef(() => ({
    activateGesture: false,
    activateFocus: false,

    isInitial: true,
    isExiting: false,
    isHovering: false,
    isPressed: false,
    isFocused: false,

    getOverrideContext: (presence: AnimatePresenceContextValue) => {
      return {
        of(id: string) {
          const state = useInteractionStateContext({ groupId: id })
          return state;
        },
        get entered() {
          return presence?.entered;
        },
        get entering() {
          return presence?.entering;
        },
        get initial() {
          const isFirstRender = current.isInitial;
          if (isFirstRender) {
            current.isInitial = false;
            rerender();
          }

          // entering and exiting are only available when component is within an AnimatePresence context
          if (!presence) return false;
          return isFirstRender;
        },
        get exiting() {
          if (!presence) return false;
          const isExiting = !presence?.isPresent;
          return isExiting;
        },
        get hovered() {
          current.activateGesture = true;
          return current.isHovering;
        },
        get pressed() {
          current.activateGesture = true;
          return current.isPressed;
        },
        get focused() {
          current.activateFocus = true;
          return current.isFocused;
        },
        get focusWithin() {
          current.activateFocus = true;
          return current.isFocused;
        },
      };
    },

    handleOverrides: (componentProps: any) => {},

    applyFocusProps: (props: any) => {
      if (!current.activateFocus) return null;

      const prevOnFocus = props.onFocus;
      props.onFocus = () => {
        if (!current.isFocused) {
          prevOnFocus?.();
        }

        current.isFocused = true;
        rerender();
      };

      const prevOnBlur = props.onBlur;
      props.onBlur = () => {
        if (current.isFocused) {
          prevOnBlur?.();
        }

        current.isFocused = false;
        rerender();
      };
    },

    applyGestures: (componentProps: any) => {
      const gestures: GestureType[] = [];
      const styleGestures = current.getEnabledGestures();
      if (styleGestures.length > 0) {
        gestures.push(...styleGestures);
      }

      const gestureProp =
        "gesture" in componentProps && (componentProps.gesture as GestureType);
      if (gestureProp) {
        gestures.push(gestureProp);
      }

      if (gestures.length > 0) {
        componentProps.gesture = Gesture.Simultaneous(...gestures);
      }
    },

    getEnabledGestures: () => {
      if (!current.activateGesture) return [];

      return [
        Gesture.Hover()
          .runOnJS(true)
          .shouldCancelWhenOutside(true)
          .onBegin(() => {
            current.isHovering = true;
            rerender();
          })
          .onFinalize(() => {
            current.isHovering = false;
            rerender();
          }),
        Gesture.Pan()
          .runOnJS(true)
          .shouldCancelWhenOutside(true)
          .onBegin(() => {
            current.isPressed = true;
            rerender();
          })
          .onFinalize(() => {
            current.isPressed = false;
            rerender();
          }),
      ];
    },
  }));

  current.activateGesture = defaultActive;
  current.activateFocus = defaultActive;
  return current;
};
