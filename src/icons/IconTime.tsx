import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function IconTime(props: SvgProps) {
  return (
    <Svg style={props.style} viewBox="0 0 209.28 209.28" {...props}>
      <G fill="#fc7272">
        <Path
          d="M104.641 0C46.943 0 .002 46.94.002 104.637c0 57.701 46.941 104.643 104.639 104.643 57.697 0 104.637-46.943 104.637-104.643C209.278 46.94 162.338 0 104.641 0zm0 194.28c-49.427 0-89.639-40.214-89.639-89.643C15.002 55.211 55.214 15 104.641 15c49.426 0 89.637 40.211 89.637 89.637 0 49.429-40.211 89.643-89.637 89.643z"
          data-original="#000000"
        />
        <Path
          d="M158.445 102.886h-49.174V49.134a7.5 7.5 0 00-15 0v61.252a7.5 7.5 0 007.5 7.5h56.674a7.5 7.5 0 000-15z"
          data-original="#000000"
        />
      </G>
    </Svg>
  );
}

export default IconTime;
