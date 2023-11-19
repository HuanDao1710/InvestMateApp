import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function SvgComponent(props : SvgProps) {
  return (
    <Svg
      style={props.style}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        d="M2 21a1 1 0 011-1 13.488 13.488 0 0012.13-7.497l4.975-9.95a1 1 0 111.79.895l-4.976 9.95A15.478 15.478 0 013 22a1 1 0 01-1-1z"
        fill="#3961F8"
        data-original="#000000"
      />
    </Svg>
  )
}

export default SvgComponent
