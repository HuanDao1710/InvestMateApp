import * as React from "react"
import Svg, { Circle, Path, SvgProps } from "react-native-svg"

function IconAddWhite(props : SvgProps) {
  return (
    <Svg
      // xmlns="http://www.w3.org/2000/svg"
      width={512}
      height={512}
      viewBox="0 0 469.333 469.333"
      // enableBackground="new 0 0 512 512"
      {...props}>
      <Path
        d="M437.332 192h-160V32c0-17.664-14.336-32-32-32H224c-17.664 0-32 14.336-32 32v160H32c-17.664 0-32 14.336-32 32v21.332c0 17.664 14.336 32 32 32h160v160c0 17.664 14.336 32 32 32h21.332c17.664 0 32-14.336 32-32v-160h160c17.664 0 32-14.336 32-32V224c0-17.664-14.336-32-32-32zm0 0"
        fill="#fff"
        data-original="#000000"
      />
    </Svg>
  );
}

export default IconAddWhite;
