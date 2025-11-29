import React from "react";

export const useIsRenderFromOutside = (props: any) => {
  const propsTrack = React.useRef(props);
  const oldProps = propsTrack.current;
  const nextProps = props;
  propsTrack.current = props

  const isRenderFromOutside = oldProps !== nextProps;
  return isRenderFromOutside;
}