import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function SvgComponent(props : SvgProps) {
  return (
    <Svg
      style={props.style}
      viewBox="0 0 64 64"
      {...props}
    >
      <Path
        d="M42.7 29.6L26.2 13.1l-2.4-2.4c-1.8-1.8-4.7 1-2.8 2.8L37.5 30l.9.9-15 15-2.3 2.3c-1.8 1.8 1 4.7 2.8 2.8l16.4-16.4 2.3-2.3c.9-.6.9-1.9.1-2.7z"
        data-original="#000000"
      />
    </Svg>
  )
}

export default SvgComponent
