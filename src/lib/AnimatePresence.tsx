import React from "react";

export const ANIMATE_PRESENCE_PROPS_KEY = "__AnimatePresenceProps__";

export interface AnimatePresenceContextValue {
  key: string;
  isInitial: boolean;
  entered: boolean;
  index: number;
  isLast: boolean;
  isPresent: boolean;
  entering: boolean;
  element: React.ReactElement;
  lifecycle: {
    onRender: () => void;
    onAnimationStart: () => void;
    onAnimationEnd: () => void;
  };
}

export const getAnimatedPresenceProps = (
  props: Record<any, any>,
): AnimatePresenceContextValue => {
  const animtePresencProps = props[ANIMATE_PRESENCE_PROPS_KEY] || {};
  // delete props[ANIMATE_PRESENCE_PROPS_KEY];
  return animtePresencProps;
};

export const AnimatePresenceContext =
  React.createContext<AnimatePresenceContextValue>(null!);

interface AnimatePresenceProps {
  propagate?: boolean;
  mode?: "sync" | "wait";
}

export const AnimatePresence: React.FC<
  React.PropsWithChildren<AnimatePresenceProps>
> = (props) => {
  console.log('ANIMATE PRESENCE ENTER');
  const mode = props.mode || "sync";
  const propagate = props.propagate || false;

  const parentPresence = React.useContext(AnimatePresenceContext);

  const [store, setStore] = React.useState(() => ({
    isInitial: true,
    renderedChildKeys: new Set<string>(),
    enteredKeys: new Set<string>(),
    keysBeforeExit: new Set<string>(),
    
    // These indexes are used to track exiting elements indexes
    // These are used to maintain exiting element placemenets. 
    exitedIndexes: [] as number[],
    contextByKey: new Map<string, AnimatePresenceContextValue>(),

    animatingKeys: new Set<string>(),
  }));

  const rerender = () => setStore((p) => ({ ...p }));
  store.renderedChildKeys.clear();

  console.log('ANIMATING KEYS', Array.from(store.animatingKeys));

  const childrenArr: React.ReactElement[] =
    props.children?.length > -1 ? props.children : [props.children];
  const children: React.ReactElement[] = childrenArr
    .filter((c) => !!c)
    .map((child: any, index: number, arr) => {
      const isLast: boolean = arr.length - 1 === index;
      if (!child.key) return child;

      const removeExitingChild = () => {
        if (context.isPresent) {
          return;
        }

        const isAnimatingExit = store.animatingKeys.has(child.key);
        if (!isAnimatingExit) {
          store.contextByKey.delete(child.key);
          store.exitedIndexes.push(context.index);
          store.exitedIndexes.sort();
          rerender()
        }
      }

      const context : AnimatePresenceContextValue = {
        key: child.key,
        isInitial: store.isInitial,
        index: index,
        isLast: isLast,
        element: child,
        get entered() {
          const hasEntered = store.enteredKeys.has(child.key);
          return hasEntered;
        },
        get entering()  {
          const isPresent = context.isPresent;
          const isAnimatingEnter = store.animatingKeys.has(child.key);
          const hasEntered = context.entered;
          return isPresent && (isAnimatingEnter) && !hasEntered;
        },
        get isPresent() {
          if (propagate && !parentPresence?.isPresent) {
            return false;
          }
          
          const isRenderedNormally = store.renderedChildKeys.has(child.key);
          return isRenderedNormally;
        },

        lifecycle: {
          onRender() {
            if (context.isPresent) {
              // If the component is not animating, we can delete it
              Promise.resolve().then(() => {
                removeExitingChild();
              })
            }
          },
          onAnimationStart() {
            store.animatingKeys.add(child.key);
          },
          onAnimationEnd() {
            store.animatingKeys.delete(child.key);
            if (context.isPresent) {
              store.enteredKeys.add(child.key);
            } else {
              removeExitingChild()
            }
          },
        },
      };

      store.renderedChildKeys.add(child.key);
      store.contextByKey.set(child.key, context);

      return (
        <AnimatePresenceContext.Provider key={child.key} value={{ ...context }}>
          {child}
        </AnimatePresenceContext.Provider>
      );
    });

  const exitingChildrenKeys = new Set<string>();
  store.contextByKey.forEach((context) => {
    const child = context.element;
    // If the component is rendered above, it means that it's no longer
    // in an exiting state. The component was rendered back in the tree
    // before the exit animation ended or even started;
    if (!(typeof child === "object")) return;
    if (!("key" in child)) return;

    const childKey = child.key as string;
    const childStillInTree = store.renderedChildKeys.has(childKey);
    if (childStillInTree) return;

    console.log('EXITING ELEMENT', childKey);
    exitingChildrenKeys.add(childKey);


    const animatedExitingElement = (
      <AnimatePresenceContext.Provider 
        key={childKey}
        value={{ ...context }}
      >
        {child}
      </AnimatePresenceContext.Provider>
    );

    if (context.isLast) {
      children.push(animatedExitingElement);
    } else {
      // In case a exiting element has been removed from the tree, 
      // we need to adjust the index of the other exiting elements
      const exitedIndexesBefore = store.exitedIndexes.filter((removedIdx) => context.index > removedIdx );
      children.splice(context.index - exitedIndexesBefore.length, 0, animatedExitingElement);
    }
  });

  const hasExitingElements = exitingChildrenKeys.size > 0;
  console.log('hasExitingElements', Array.from(exitingChildrenKeys));
  if (!hasExitingElements) {
    console.log('SETUP keysBeforeExit', Array.from(store.renderedChildKeys));
    // we can keep track of all renderedChildKeys
    store.keysBeforeExit = new Set(Array.from(store.renderedChildKeys));
  } else {
    children.forEach((child, index) => {
      if (!child?.key) return;

      const isPresentBeforeAnyExit = store.keysBeforeExit.has(child.key);

      // We only apply the exitBeforeEnter feature if mode === 'wait'
      if (mode === "wait" && !isPresentBeforeAnyExit) {
        console.log('REMOVED', child.key);
        children[index] = <></>;
      }
    });
  }
  
  console.log('ANIMATE PRESENCE AFTER');
  store.isInitial = false;
  store.exitedIndexes = [];
  return children;
};

