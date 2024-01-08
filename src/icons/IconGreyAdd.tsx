import * as React from "react"
import Svg, { G, Path, SvgProps } from "react-native-svg"

function SvgComponent(props : SvgProps) {
  return (
    <Svg
      style={props.style}
      viewBox="0 0 512 512"
      {...props}
    >
      <G data-name="03 Login" fill="#6d6b6b">
        <Path
          d="M256 512a25 25 0 01-25-25V25a25 25 0 0150 0v462a25 25 0 01-25 25z"
          data-original="#000000"
        />
        <Path
          d="M487 281H25a25 25 0 010-50h462a25 25 0 010 50z"
          data-original="#000000"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
