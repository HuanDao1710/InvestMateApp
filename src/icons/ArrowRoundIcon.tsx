import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function ArrowRoundIcon(props: SvgProps) {
  return (
    <Svg
      //   xmlns="http://www.w3.org/2000/svg"
      width={512}
      height={512}
      viewBox="0 0 426.667 426.667"
      //   enableBackground="new 0 0 512 512"
      {...props}>
      <Path
        d="M213.332 0C95.512 0 0 95.512 0 213.332s95.512 213.336 213.332 213.336 213.336-95.516 213.336-213.336C426.535 95.566 331.102.132 213.332 0zm0 405.332c-106.039 0-192-85.96-192-192 0-106.039 85.961-192 192-192 106.04 0 192 85.961 192 192-.121 105.988-86.012 191.879-192 192zm0 0"
        data-original="#000000"
      />
      <Path
        d="M188.355 130.637c-4.437-3.88-11.175-3.426-15.054 1.008-3.875 4.437-3.422 11.175 1.012 15.054l76.156 66.633-76.16 66.637c-4.438 3.879-4.887 10.617-1.012 15.05 3.879 4.438 10.617 4.891 15.055 1.012l85.332-74.668a10.67 10.67 0 000-16.063zm0 0"
        data-original="#000000"
      />
    </Svg>
  );
}

export default ArrowRoundIcon;
