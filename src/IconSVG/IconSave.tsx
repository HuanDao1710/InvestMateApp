import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function SvgComponent(props : SvgProps) {
  return (
    <Svg
      style={props.style}
      viewBox="0 0 32 32"
      {...props}
    >
      <Path
        d="M30.71 7.29l-6-6A1 1 0 0024 1h-2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2V1H4a3 3 0 00-3 3v24a3 3 0 003 3h2v-9a3 3 0 013-3h14a3 3 0 013 3v9h2a3 3 0 003-3V8a1 1 0 00-.29-.71z"
        data-original="#000000"
      />
      <Path
        d="M12 1h8v8h-8zm11 20H9a1 1 0 00-1 1v9h16v-9a1 1 0 00-1-1z"
        data-original="#000000"
      />
    </Svg>
  )
}

export default SvgComponent
