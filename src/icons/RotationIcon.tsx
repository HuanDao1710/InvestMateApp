import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function RotationIcon(props: SvgProps) {
    return (
        <Svg
            //   xmlns="http://www.w3.org/2000/svg"
            width={512}
            height={512}
            viewBox="0 0 6.35 6.35"
            //   enableBackground="new 0 0 512 512"
            {...props}
        >
            <Path
                d="M4.436.11a.263.263 0 00-.119.03L3.313.645A.265.265 0 003.196 1l.506 1.003c.158.316.631.077.472-.238l-.287-.568a2.073 2.073 0 01.027 4.037c-.37.065-.236.624.123.514a2.605 2.605 0 001.997-2.53A2.6 2.6 0 004.266.758l.287-.145C4.804.488 4.716.11 4.436.11zM.316 3.132c0 1.141.74 2.113 1.768 2.462l-.289.145c-.358.143-.089.674.238.47l1.002-.503a.265.265 0 00.12-.356l-.506-1.002a.265.265 0 10-.473.239l.286.566A2.07 2.07 0 01.846 3.132c0-.98.678-1.797 1.588-2.014.323-.05.28-.587-.082-.521C1.154.816.317 1.907.317 3.132z"
                fill="#1dc787"
                data-original="#000000"
            />
        </Svg>
    )
}

export default RotationIcon
