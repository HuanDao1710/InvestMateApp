import * as React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Modal, {ModalProps} from 'react-native-modal';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useCommonApp } from '../CommonApp';

export interface ModalBaseRefType {
  show: () => void;
  hide: () => void;
}

export interface ModalBaseProps
  extends Partial<Pick<ModalProps, 'onBackdropPress' | 'onBackButtonPress'>> {
  refModal: React.ForwardedRef<ModalBaseRefType>;
  children: React.ReactNode;
  showClose?: boolean;
  touchClose?: boolean;
  modalStyle?: ViewStyle;
  animationType?: 'slide' | 'zoom';
  swipe?: boolean;
  onClose?: () => void;
}

const ModalBase = ({
  refModal,
  children,
  showClose = true,
  touchClose = false,
  modalStyle,
  animationType = 'zoom',
  swipe,
  onBackdropPress,
  onBackButtonPress,
  onClose,
  ...rest
}: ModalBaseProps) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const focus = useIsFocused();
  const {dimention} = useCommonApp();

  const onShow = () => {
    setShowModal(true);
  };

  const onHide = () => {
    setShowModal(false);
    if (onClose) {
      onClose();
    }
  };

  React.useImperativeHandle(refModal, () => ({
    show: onShow,
    hide: onHide,
  }));

  React.useEffect(() => {
    if (!focus && showModal) {
      setShowModal(false);
    }
  }, [focus]);

  return swipe ? (
    <GestureRecognizer onSwipeUp={onShow} onSwipeDown={onHide}>
      <Modal
        onBackdropPress={onHide}
        deviceHeight={dimention.height}
        deviceWidth={dimention.width}
        animationIn={animationType === 'slide' ? 'slideInUp' : 'zoomInDown'}
        animationOut={
          animationType === 'slide' ? 'slideOutDown' : 'zoomOutDown'
        }
        statusBarTranslucent
        backdropOpacity={0.5}
        useNativeDriver
        style={styles.container}
        {...rest}
        onBackButtonPress={onHide}
        isVisible={showModal}>
        {showModal && children}
      </Modal>
    </GestureRecognizer>
  ) : (
    <Modal
      onBackdropPress={onHide}
      deviceHeight={dimention.height}
      deviceWidth={dimention.width}
      animationIn={animationType === 'slide' ? 'slideInUp' : 'zoomInDown'}
      animationOut={animationType === 'slide' ? 'slideOutDown' : 'zoomOutDown'}
      statusBarTranslucent
      backdropOpacity={0.5}
      useNativeDriver
      style={styles.container}
      {...rest}
      onBackButtonPress={onHide}
      isVisible={showModal}>
      {children}
    </Modal>
  );
};

export default React.forwardRef(
  (
    props: Omit<ModalBaseProps, 'refModal' | 'isVisible'>,
    ref: React.ForwardedRef<ModalBaseRefType>,
  ) => {
    return <ModalBase {...props} refModal={ref} />;
  },
);

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
});
