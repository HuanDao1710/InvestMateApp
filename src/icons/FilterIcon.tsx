import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function FilterIcon(props: SvgProps) {
  return (
    <Svg
      //   xmlns="http://www.w3.org/2000/svg"
      width={512}
      height={512}
      viewBox="0 0 64 64"
      //   enableBackground="new 0 0 512 512"
      {...props}>
      <Path
        d="M53.39 8H10.61a5.61 5.61 0 00-4.15 9.38L25 37.77V57a2 2 0 001.13 1.8 1.94 1.94 0 00.87.2 2 2 0 001.25-.44l3.75-3 6.25-5A2 2 0 0039 49V37.77l18.54-20.39A5.61 5.61 0 0053.39 8z"
        data-original="#000000"
        transform="matrix(1.13 0 0 1.13 -4.16 -4.355)"
      />
    </Svg>
  );
}

export default FilterIcon;
