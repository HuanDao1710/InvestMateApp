import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function IconSmallAdd(props: SvgProps) {
  return (
    <Svg style={props.style} viewBox="0 0 512 512" {...props}>
      <Path
        fill="#3961f8"
        d="M256 0C114.836 0 0 114.836 0 256s114.836 256 256 256 256-114.836 256-256S397.164 0 256 0zm0 0"
        data-original="#2196f3"
      />
      <Path
        fill="#fafafa"
        d="M368 277.332h-90.668V368c0 11.777-9.555 21.332-21.332 21.332s-21.332-9.555-21.332-21.332v-90.668H144c-11.777 0-21.332-9.555-21.332-21.332s9.555-21.332 21.332-21.332h90.668V144c0-11.777 9.555-21.332 21.332-21.332s21.332 9.555 21.332 21.332v90.668H368c11.777 0 21.332 9.555 21.332 21.332s-9.555 21.332-21.332 21.332zm0 0"
        data-original="#fafafa"
      />
    </Svg>
  );
}

export default IconSmallAdd;
