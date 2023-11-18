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
        d="M16.364 3.375c0-.668.18-1.32.517-1.875A3.152 3.152 0 0118.258.257 2.81 2.81 0 0120.03.065c.596.13 1.142.452 1.571.924a3.49 3.49 0 01.84 1.728 3.689 3.689 0 01-.175 1.95 3.326 3.326 0 01-1.13 1.514 2.874 2.874 0 01-1.704.569c-.814 0-1.594-.356-2.17-.989a3.554 3.554 0 01-.898-2.386zM1.023 4.5h12.273a.978.978 0 00.723-.33c.191-.21.3-.497.3-.795 0-.298-.109-.585-.3-.795a.978.978 0 00-.723-.33H1.023a.978.978 0 00-.723.33c-.192.21-.3.497-.3.795 0 .298.108.585.3.795.191.211.451.33.723.33zm6.136 3.375c-.633.002-1.25.22-1.766.622a3.362 3.362 0 00-1.118 1.628H1.023a.978.978 0 00-.723.33c-.192.21-.3.497-.3.795 0 .298.108.585.3.796.191.21.451.329.723.329h3.252c.188.584.518 1.1.954 1.49.436.392.962.644 1.52.728a2.816 2.816 0 001.641-.248c.516-.246.961-.644 1.285-1.15.325-.506.516-1.1.554-1.719a3.662 3.662 0 00-.34-1.784 3.268 3.268 0 00-1.133-1.33 2.861 2.861 0 00-1.597-.487zm14.318 2.25h-8.181a.978.978 0 00-.724.33c-.191.21-.3.497-.3.795 0 .298.108.585.3.796.192.21.452.329.724.329h8.181a.978.978 0 00.723-.33c.192-.21.3-.497.3-.795 0-.298-.108-.585-.3-.796a.978.978 0 00-.723-.329zM9.205 18H1.023a.978.978 0 00-.723.33c-.192.21-.3.497-.3.795 0 .298.108.584.3.796.191.21.451.329.723.329h8.182a.978.978 0 00.723-.33c.191-.21.3-.497.3-.795 0-.298-.108-.584-.3-.796A.978.978 0 009.205 18zm12.272 0h-3.252a3.323 3.323 0 00-1.34-1.786 2.834 2.834 0 00-2.072-.415 3.017 3.017 0 00-1.827 1.15 3.584 3.584 0 00-.722 2.176c0 .796.256 1.567.723 2.175a3.017 3.017 0 001.826 1.151 2.834 2.834 0 002.072-.415 3.323 3.323 0 001.34-1.786h3.252a.978.978 0 00.723-.33c.192-.21.3-.497.3-.795 0-.298-.108-.584-.3-.796a.978.978 0 00-.723-.329z"
        fill="#000"
      />
    </Svg>
  )
}

export default SvgComponent
