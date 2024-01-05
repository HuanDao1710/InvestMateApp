import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function SvgComponent(props : SvgProps) {
  return (
    <Svg
      style={props.style}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <Path
        d="M11.116 3.008l-9.904 9.915a.395.395 0 00-.103.181L.011 17.515A.393.393 0 00.39 18a.385.385 0 00.095-.012L4.89 16.89a.389.389 0 00.18-.103l9.906-9.914-3.86-3.864zm6.313-1.351L16.327.552c-.737-.738-2.021-.737-2.757 0l-1.35 1.352 3.859 3.863 1.35-1.352A1.94 1.94 0 0018 3.036a1.94 1.94 0 00-.57-1.38z"
        fill="#000"
      />
    </Svg>
  )
}

export default SvgComponent
