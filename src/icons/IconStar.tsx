import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function IconStar(props : SvgProps) {
  return (
    <Svg
      style={props.style}
      viewBox="0 0 25 25"
      fill="none"
      {...props}
    >
      <Path
        d="M24.935 9.346a1.326 1.326 0 00-1.144-.914l-7.215-.655-2.854-6.679a1.33 1.33 0 00-2.444.002L8.425 7.777l-7.217.655a1.329 1.329 0 00-.754 2.325l5.454 4.784L4.3 22.624a1.328 1.328 0 001.976 1.436l6.224-3.72 6.222 3.72a1.33 1.33 0 001.977-1.436l-1.608-7.085 5.454-4.782a1.33 1.33 0 00.39-1.412z"
        fill="#FFC107"
      />
    </Svg>
  )
}

export default IconStar
