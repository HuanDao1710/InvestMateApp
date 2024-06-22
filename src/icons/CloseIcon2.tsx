import * as React from 'react';
import Svg, {G, Circle, Path, SvgProps} from 'react-native-svg';

function CloseIcon2(props: SvgProps) {
  return (
    <Svg
      //   xmlns="http://www.w3.org/2000/svg"
      width={512}
      height={512}
      viewBox="0 0 512 512"
      //   enableBackground="new 0 0 512 512"
      {...props}>
      <Path
        fill="#fcdad4"
        d="M398.78 493.62a850.92 850.92 0 01-283.47-1.1 122.33 122.33 0 01-99-96.23C-3.91 297.1-3.12 203.09 14.5 113.23a123 123 0 01106.61-98.44C211.88 4.23 303 4.66 394.48 14.83 450.1 21 494.14 64.49 501.93 119.9q18.55 131.79-1.88 270.92a122.41 122.41 0 01-101.27 102.8z"
        data-original="#fcdad4"
      />
      <Path
        fill="#f0555f"
        d="M399.78 255.52a24.14 24.14 0 00-22.88-23.68c-10.8-.56-230.77-.6-241.72-.05a24.17 24.17 0 00-23 23.8v.45a24.14 24.14 0 0023.32 24.26c10.91.38 230.2.41 241 0a24.16 24.16 0 0023.29-24.3c0-.17-.01-.33-.01-.48z"
        data-original="#f0555f"
      />
    </Svg>
  );
}

export default CloseIcon2;
