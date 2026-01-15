import React from "react";
import { AnimatedRef } from "react-native-reanimated";
import { PresenceController } from './lib/PresenceController';

export { AnimatePresenceContext, type TreeItem } from './lib/PresenceController';

interface AnimatePresenceProps {
  parentRef?: AnimatedRef<any>;
}


export const AnimatePresence: React.FC<React.PropsWithChildren<AnimatePresenceProps>> = (props) => {
  const [_, rerender] = React.useState({});
  const [presenceCtl] = React.useState(() => new PresenceController({ 
    presenceRef: props.parentRef
  }));

  presenceCtl.snapshot(props);

  React.useEffect(() => {
    const subscription = presenceCtl.subscribe((debugId: string) => {
      console.log('RERENDER ANIMATE PRESENCE', debugId);
      rerender({})
    })
    return () => {
      subscription.remove();
    }
  }, []);

  return presenceCtl.render();
}