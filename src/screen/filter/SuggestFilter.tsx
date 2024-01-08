import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import IconSave from '../../icons/IconSave';
import {ScrollView} from 'react-native';


const SuggestFilter = () => {
  const navigation = useNavigation<any>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Bộ lọc gợi ý',
      headerTitleStyle: {fontSize: 18},
      headerStyle: {
        borderBottomColor: '#F0F0F0', // Màu sắc của ranh giới
        borderBottomWidth: 1, // Độ dày của ranh giới
      },
    });
  });

  return (
      <View style={{flex: 1}}>
        <ScrollView >
        </ScrollView>
      </View>
  );
};
export default SuggestFilter;


const styles = StyleSheet.create({
  dropdown: {
    height: 28,
    borderColor: 'gray',
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'black',
    width: "40%"
  },
  itemTextDropdown: {
    fontSize: 15,
    fontWeight:"500",
    color: "black"
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
    fontWeight:"500"
  },
  selectedTextStyle: {
    fontSize: 15,
    color: 'black',
    fontWeight:"500"
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
})
