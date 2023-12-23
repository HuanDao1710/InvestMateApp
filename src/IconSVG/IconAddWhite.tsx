import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function SvgComponent(props : SvgProps) {
  return (
    <Svg
      style={props.style}
      viewBox="0 0 15 16"
      fill="none"
      {...props}
    >
      <Path
        d="M7.5 15.81a.725.725 0 01-.518-.22.755.755 0 01-.214-.528V1.248c0-.199.077-.389.214-.53a.725.725 0 011.036 0c.137.141.214.331.214.53v13.814a.755.755 0 01-.214.528.725.725 0 01-.518.22z"
        fill="#fff"
      />
      <Path
        d="M14.268 8.902H.732a.725.725 0 01-.517-.219.755.755 0 010-1.057.725.725 0 01.517-.219h13.536c.194 0 .38.079.518.22a.756.756 0 010 1.056.725.725 0 01-.518.22z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
