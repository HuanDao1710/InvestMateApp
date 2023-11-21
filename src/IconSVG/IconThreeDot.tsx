import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function SvgComponent(props : SvgProps) {
  return (
    <Svg
      style={props.style}
      viewBox="0 0 5 21"
      fill="none"
      {...props}
    >
      <Path
        d="M0 10.156A2.347 2.347 0 002.344 12.5a2.347 2.347 0 002.344-2.344 2.347 2.347 0 00-2.344-2.344A2.347 2.347 0 000 10.156zm0 7.813a2.347 2.347 0 002.344 2.343 2.347 2.347 0 002.344-2.343 2.347 2.347 0 00-2.344-2.344A2.347 2.347 0 000 17.969zM0 2.344a2.347 2.347 0 002.344 2.344 2.347 2.347 0 002.344-2.344A2.347 2.347 0 002.344 0 2.347 2.347 0 000 2.344z"
        fill="#000"
      />
    </Svg>
  )
}

export default SvgComponent
