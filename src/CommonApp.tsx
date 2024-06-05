import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

const screen = Dimensions.get('screen');

export const ContextApp = React.createContext<{
  dimention: {
    width: number;
    height: number;
  };
  
}>({
  dimention: {
    width: screen.width,
    height: screen.height,
  },
});

export const useCommonApp = () => {
  return React.useContext(ContextApp);
};

interface CommonAppProviderProps {
  children: React.ReactNode;
}

const UNKNOWN_COUNTRY_CODE = 'UNKNOWN';

const CommonAppProvider = (props: CommonAppProviderProps) => {
  const [dimention, setDimention] = React.useState<{
    width: number;
    height: number;
  }>({width: screen.width, height: screen.height});


  React.useEffect(() => {
    const screen = Dimensions.get('screen');
    setDimention({width: screen.width, height: screen.height});
    Dimensions.addEventListener('change', ({screen}) => {
      setDimention({width: screen.width, height: screen.height});
    });
  }, []);

  return (
    <ContextApp.Provider
      value={{dimention}}>
      {props.children}
    </ContextApp.Provider>
  );
};

export default CommonAppProvider;

const styles = StyleSheet.create({
  container: {},
});

