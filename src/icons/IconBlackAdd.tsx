import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg"

function SvgComponent(props : SvgProps) {
  return (
    <Svg
      style={props.style}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_17_395)">
        <Path
          d="M14.571 6.571H9.714a.286.286 0 01-.285-.285V1.429a1.429 1.429 0 00-2.858 0v4.857a.286.286 0 01-.285.285H1.429a1.429 1.429 0 000 2.858h4.857a.286.286 0 01.285.285v4.857a1.429 1.429 0 002.858 0V9.714a.286.286 0 01.285-.285h4.857a1.429 1.429 0 000-2.858z"
          fill="#000"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_17_395">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
