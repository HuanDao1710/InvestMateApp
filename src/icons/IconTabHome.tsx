import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function SvgComponent(props : SvgProps) {
  return (
    <Svg
      style={props.style}
      viewBox="0 0 23 23"
      fill="none"
      {...props}
    >
      <Path
        d="M11.899 10.712L8.713 6.945l-7.66 8.865L0 14.63 8.725 4.534l3.216 3.804 5.532-6.033L15.888.5h4.138v4.711l-1.509-1.717-6.618 7.218zM3.665 23h4.986v-7.99H3.665V23zm6.925 0h4.985V12.486H10.59V23zm6.924-15.771V23H22.5V7.229h-4.986z"
        fill="#000"
      />
    </Svg>
  )
}

export default SvgComponent
