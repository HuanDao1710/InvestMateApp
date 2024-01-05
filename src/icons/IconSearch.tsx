import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
import { StyleSheet } from "react-native/types"

function SvgComponent(props :SvgProps) {
  return (
    <Svg
      style={props.style}
      viewBox="0 0 13 12"
      fill="none"
      {...props}
    >
      <Path
        d="M12.326 10.055L9.055 7.014c.617-.89.858-1.96.677-3.006-.18-1.045-.771-1.992-1.658-2.657A4.852 4.852 0 004.93.406a4.783 4.783 0 00-3.018 1.25C1.106 2.405.627 3.404.567 4.461a4.093 4.093 0 001.017 2.922c.715.824 1.733 1.373 2.858 1.541a4.903 4.903 0 003.234-.63l3.272 3.041c.09.084.198.151.316.196a1.039 1.039 0 001.062-.197.907.907 0 00.21-.293.85.85 0 000-.693.903.903 0 00-.211-.293h.002zM2.343 7.329a3.647 3.647 0 01-1.092-1.905 3.478 3.478 0 01.23-2.149c.304-.679.817-1.26 1.475-1.667A4.224 4.224 0 015.18.98c.792 0 1.565.218 2.223.627a3.795 3.795 0 011.475 1.667c.304.68.384 1.427.23 2.149a3.647 3.647 0 01-1.091 1.905 4.04 4.04 0 01-1.301.81 4.274 4.274 0 01-3.07 0 4.04 4.04 0 01-1.302-.81z"
        fill="#000"
      />
    </Svg>
  )
}

export default SvgComponent