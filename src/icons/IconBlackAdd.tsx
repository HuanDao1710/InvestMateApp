import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, SvgProps} from 'react-native-svg';

function IconBlackAdd(props: SvgProps) {
  return (
    <Svg
      // xmlns="http://www.w3.org/2000/svg"
      width={512}
      height={512}
      viewBox="0 0 24 24"
      fillRule="evenodd"
      // enableBackground="new 0 0 512 512"
      {...props}>
      <Path
        d="M11.25 6.5a.75.75 0 011.5 0v11a.75.75 0 01-1.5 0z"
        data-original="#000000"
      />
      <Path
        d="M6.5 12.75a.75.75 0 010-1.5h11a.75.75 0 010 1.5z"
        data-original="#000000"
      />
      <Path
        d="M22.75 6v12A4.75 4.75 0 0118 22.75H6A4.75 4.75 0 011.25 18V6A4.75 4.75 0 016 1.25h12A4.75 4.75 0 0122.75 6zm-1.5 0A3.247 3.247 0 0018 2.75H6A3.247 3.247 0 002.75 6v12A3.247 3.247 0 006 21.25h12A3.247 3.247 0 0021.25 18z"
        data-original="#000000"
      />
    </Svg>
  );
}

export default IconBlackAdd;
