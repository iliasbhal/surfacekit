import * as React from 'react';
import { EventEmitter } from 'expo-modules-core';
import { AnimatedRef } from 'react-native-reanimated';

export interface TreeItem {
  item: {
    key: string,
    child: any,
    index: number,
    containerRef: AnimatedRef<any>,
  }
  state: {
    present: boolean,
    animating: boolean,
    entering: boolean,
  },
  lifecycle: {
    onRender: () => void;
    scheduleAnimation: () => void;
    onAnimationStart: () => void;
    onAnimationEnd: () => void;
  };
  api: {
    updateEnteringState: () => void;
    onExitingDone: () => void;
    removeIfNotAnimate: () => void;
  }
};

export const AnimatePresenceContext = React.createContext<TreeItem>(null!);

export class PresenceController {
  wrappedPresenceRef : any
  tree : TreeItem[] = [];

  constructor(config: { presenceRef: any }) {
    this.wrappedPresenceRef = config.presenceRef;
  }

  upsertItem(child: React.ReactElement, index: number) {
    // Should remove the element from exiting elements

    const treeItem : TreeItem = {
      item: {
        key: child.key!,
        child,
        index,
        containerRef: this.wrappedPresenceRef,
      },
      state: {
        present: true,
        animating: false,
        entering: this.isFirstRender ? false : true,
      },
      api: {
        onExitingDone: () => {
          const isPresent = treeItem.state.present === true;
          const isAnimating = treeItem.state.animating === true;
    
          if (!isPresent && !isAnimating) {
            this.tree.splice(treeItem.item.index, 1);
            this.rerender();
          }
        },

        removeIfNotAnimate: () => {
          setTimeout(() => {
            treeItem.api.onExitingDone();
          })
        },

        updateEnteringState: () => {
          setTimeout(() => {
            const isAnimating = treeItem.state.animating;
            if (!isAnimating) {
              this.resetEntering(treeItem);
            }
          })
        },
      },
      lifecycle: {
        onRender: () => {
          treeItem.api.removeIfNotAnimate();
          treeItem.api.updateEnteringState();
        },
        scheduleAnimation: () => {
          treeItem.state.animating = true;
        },
        onAnimationStart: () => {

        },
        onAnimationEnd: () => {
          treeItem.state.animating = false;
          
          const isPresent = treeItem.state.present === true;
          this.resetEntering(treeItem);

          if (!isPresent) {
            treeItem.api.onExitingDone();
          }
        },
      },
    };

    const existingItem = this.tree.find((item) => {
      return item.item.key === child.key;
    });

    if (!existingItem) {
      this.updatePresence(treeItem, true);
      this.tree.push(treeItem);
    } else {
      this.updatePresence(existingItem, true);
      existingItem.item = {
        key: child.key!,
        index,
        child,
        containerRef: this.wrappedPresenceRef,
      }
    }
  }

  rerender = () => {
    this.changeEventEmitter.emit('change');
  }

  resetEntering (treeItem: TreeItem) {
    const prev= treeItem.state.entering;
    treeItem.state.entering = false;
    const hasChanged = prev !== treeItem.state.entering;
    if (hasChanged) {
      this.rerender();
    }
  }

  trackExitingItems(presentItemsKeys: Set<string>) {
    this.tree.forEach((treeItem) => {
      if (!presentItemsKeys.has(treeItem.item.key)) {
        this.updatePresence(treeItem, false);
      }
    });
  }

  updatePresence(item: TreeItem, presence: boolean) {
    const prevPresent = item.state.present;
    item.state.present = presence;
    
    if (prevPresent !== presence) {      
      item.state.entering = presence;
    }
  }

  isFirstRender = true;
  addItemsToTree(componentProps: React.PropsWithChildren<any>) {
    const childrenArr = React.Children.toArray(componentProps.children);
    const childrenKeys = new Set<string>();
    childrenArr.forEach((child, index) => {
      const isValidElement = React.isValidElement(child)
      if (isValidElement) {
        childrenKeys.add(child.key as string);
        this.upsertItem(child, index);
      }
    });

    this.isFirstRender = false;
    return childrenKeys;
  }

  changeEventEmitter = new EventEmitter<any>();

  subscribe(callback: () => void) {
    return this.changeEventEmitter.addListener('change', callback);
  }

  removeStaleExitingItems() {
    let hasRemovedItems = false;

    this.tree.forEach((item, index) => {
      const isPresent = item.state.present === true;
      const isAnimating = item.state.animating === true;

      if (!isPresent && !isAnimating) {
        console.log('remove', item.item.child.props.debugId);
        this.tree.splice(index, 1);
        hasRemovedItems = true;
      }
    });

    return hasRemovedItems;
  }

  snapshot(componentProps: React.PropsWithChildren<any>) {
    const childrenKeys = this.addItemsToTree(componentProps);
    this.trackExitingItems(childrenKeys);
  }

  render() : ReturnType<typeof React.Children.toArray> {
    const nextChildren : any[] = [];

    this.tree.forEach((item) => {
      nextChildren.splice(item.item.index, 0, (
        <AnimatePresenceContext.Provider key={item.item.key} value={item}>
          {React.cloneElement(item.item.child, item.item.child.props)}
        </AnimatePresenceContext.Provider>
      ));
    });

    return nextChildren;
  }


}
