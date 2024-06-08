import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function CheckMarkIcon(props : SvgProps) {
  return (
    <Svg
    //   xmlns="http://www.w3.org/2000/svg"
      width={512}
      height={512}
      viewBox="0 0 100 100"
    //   enableBackground="new 0 0 512 512"
      {...props}>
      <Path
        fill="#379237"
        d="M97.5 25.269L36.277 86.525 2.5 52.748l11.81-11.81 21.95 21.95 49.446-49.413z"
        data-original="#379237"
      />
    </Svg>
  );
}

export default CheckMarkIcon;
