import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function SvgComponent(props :SvgProps) {
  return (
    <Svg
      style={props.style}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        d="M21 11H5.414l5.293-5.293a1 1 0 10-1.414-1.414l-7 7a1 1 0 000 1.414l7 7a1 1 0 001.414-1.414L5.414 13H21a1 1 0 000-2z"
        data-original="#000000"
      />
    </Svg>
  )
}

export default SvgComponent
