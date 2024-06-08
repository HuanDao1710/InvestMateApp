import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconSave from '../../icons/IconSave';
import IconBlackAdd from '../../icons/IconBlackAdd';
import IconAddWhite from '../../icons/IconAddWhite';
import {ScrollView} from 'react-native';
import { getListNames } from './FilterStorage';


const PersonalFilter = () => {
  const navigation = useNavigation<any>();
    const [listFilterName, setListFilterName] = React.useState<string[]>([]);

    const fetchData = async () => {
        const list = await getListNames();
        setListFilterName(list);
    }

    React.useEffect(()=> {
        fetchData();        
    }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Bộ lọc cá nhân',
      headerTitleStyle: {fontSize: 18},
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{margin: 15}} onPress={() => {navigation.navigate("CreateFilter")}}>
            <IconBlackAdd height={30} width={30}/>
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        borderBottomColor: '#F0F0F0', // Màu sắc của ranh giới
        borderBottomWidth: 1, // Độ dày của ranh giới
      },
    });
  });



  return (
    <View style={{flex: 1}}>
      {listFilterName.length > 0 ? (
        <View></View>
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              minWidth: 100,
              height: 'auto',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#B8C4FF',
              borderRadius: 5,
              bottom: 50,
              paddingHorizontal: 10,
              paddingVertical: 5,
              gap: 10,
            }}
            onPress={() => {
              navigation.navigate('CreateFilter');
            }}>
            <IconAddWhite width={15} height={15} />
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                marginRight: 5,
                marginVertical: 5,
                fontWeight: 'bold',
              }}>
              Tạo bộ lọc
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default PersonalFilter;


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
