import React from "react";
import { View } from "@/uikit";
import { Gesture } from "react-native-gesture-handler";

export const Scene: React.FC<{}> = (props) => {
  const [active, setActive] = React.useState(true);

  return <Toggle active={active} setActive={setActive} />;
};

interface ToggleProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = (props) => {
  const { active, setActive } = props;

  return (
    <View
      id={"Toggle"}
      padding={5}
      display="flex"
      borderRadius={100}
      flexDirection="row"
      justifyContent={"flex-start"}
      backgroundColor="gray"
      overflowHidden
      cursor={'pointer'}
      gesture={
        Gesture.Tap()
          .runOnJS(true)
          .onBegin(() => {
            setActive(!active);
          })
      }
      transition={{
        backgroundColor: true,
      }}
      overrides={() => ([
        active && {
          backgroundColor: "green",
        },
      ])}
    >
      <View
        relative
        width={120}
        height={50}
      >
        <View
          width={70}
          height={50}
          borderRadius={50}
          position={'absolute'}
          backgroundColor={"rgba(255, 255, 255, 1)"}
          boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
          absolute
          transition={{
            opacity: true,
            width: true,
            position: true,
          }}
          overrides={(state) => ([
            active && {
              right: 0,
              opacity: .9,
            },
            !active && {
              left: 0,
              opacity: .6,
            },
            state.of('Toggle').hovered && {
              width: 75,
              opacity: 1
            },
            state.of('Toggle').pressed && {
              width: 100,
            },
          ])}
        />
      </View>
    </View>
  );
};

