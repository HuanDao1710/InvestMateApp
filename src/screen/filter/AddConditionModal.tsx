import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { CriteriaType } from '../../type';

interface AddConditionModalProps {
  isModalVisible: boolean;
  toggleModal: any;
  smallList: any[];
  addItem: any;
  removeItem: any;
  criteriaList: CriteriaType[];
}

const AddConditionModal = () => {
  return (
    <View style={{gap: 10, justifyContent: 'center', alignItems: 'center'}}>
      <View
        onTouchEnd={e => e.stopPropagation()}
        style={{
          width: '90%',
          paddingHorizontal: 10,
          backgroundColor: '#fff',
          borderRadius: 10,
          gap: 20,
          paddingVertical: 15,
        }}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
            Chọn tiêu chí
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AddConditionModal;

const styles = StyleSheet.create({
  dropdown: {
    height: 28,
    borderColor: 'gray',
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'black',
    width: '40%',
  },
  itemTextDropdown: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 15,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
  },
  selectedTextStyle: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  //   modalContent: {
  //     backgroundColor: '#DADADA',
  //     borderRadius: 10,
  //     alignItems: 'center',
  //     width: screenWidth - 30,
  //     height: screenHeight * 0.7,
  //   },
  modalText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '800',
  },
  modalButton: {
    backgroundColor: '#c24f44',
    padding: 5,
    width: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    zIndex: 1000,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
