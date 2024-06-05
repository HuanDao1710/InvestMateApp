import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  ModalProps,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
} from 'react-native';
import CloseIcon from '../icons/CloseIcon';

export interface ModalBaseRefType {
  show: () => void;
  hide: () => void;
}

export interface ModalBaseProps extends ModalProps {
  refModal: React.ForwardedRef<ModalBaseRefType>;
  children: React.ReactNode;
  bodyStyle?: ViewStyle;
  showClose?: boolean;
  touchClose?: boolean;
  modalStyle?: ViewStyle;
  bodyProps?: ViewProps;
}

const ModalBase = ({
  refModal,
  children,
  bodyStyle,
  showClose = true,
  touchClose = false,
  modalStyle,
  bodyProps = {},
  ...rest
}: ModalBaseProps) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  React.useImperativeHandle(refModal, () => ({
    show: () => {
      setShowModal(true);
    },
    hide: () => {
      setShowModal(false);
    },
  }));

  return (
    <Modal
      transparent
      statusBarTranslucent
      onRequestClose={() => setShowModal(false)}
      {...rest}
      style={styles.container}
      visible={showModal}>
      <View
        onTouchEnd={() => touchClose && setShowModal(false)}
        style={[
          {
            flex: 1,
            backgroundColor: '#00000090',
            alignItems: 'center',
            justifyContent: 'center',
          },
          modalStyle,
        ]}>
        <View
          onTouchEnd={e => e.stopPropagation()}
          style={[
            {
              padding: 20,
              minHeight: 100,
              backgroundColor: '#fff',
              borderRadius: 10,
              paddingTop: 25,
              margin: 20,
            },
            bodyStyle,
          ]}
          {...bodyProps}>
          {showClose && (
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{padding: 8, position: 'absolute', right: 0, top: 0}}>
              <CloseIcon height={15} width={15} fill={'#000'} />
            </TouchableOpacity>
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default React.forwardRef(
  (
    props: Omit<ModalBaseProps, 'refModal'>,
    ref: React.ForwardedRef<ModalBaseRefType>,
  ) => {
    return <ModalBase {...props} refModal={ref} />;
  },
);

const styles = StyleSheet.create({
  container: {},
});
