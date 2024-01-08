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
        fill="#6d6b6b"
        fillRule="evenodd"
        d="M20.71 5.795a1 1 0 01-.005 1.415l-11.077 11a1 1 0 01-1.41 0l-4.923-4.89a1 1 0 011.41-1.418l4.218 4.189 10.372-10.3a1 1 0 011.415.004z"
        clipRule="evenodd"
        data-original="#000000"
      />
    </Svg>
  )
}

export default SvgComponent
