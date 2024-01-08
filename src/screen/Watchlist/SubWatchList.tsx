import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TrackingStockEntity} from '../../type';
import IconBlackAdd from '../../icons/IconBlackAdd';
import IconEdit from '../../icons/IconEdit';
import IconAddWhite from '../../icons/IconAddWhite';


export type ParamList = {
  trackingStocks: {
    title: string;
    listTrackingStock: TrackingStockEntity[];
  };
};

export const SublistHeader = (props: {onPressAdd: any; onPressEdit: any}) => {
  return (
    <View
      style={{
        height: '100%',
        width: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={props.onPressAdd}>
        <IconBlackAdd style={{height: '35%', aspectRatio: 1, margin: '3%'}} />
      </TouchableOpacity>
      <TouchableOpacity>
        <IconEdit style={{height: '35%', aspectRatio: 1, margin: '3%'}} />
      </TouchableOpacity>
    </View>
  );
};

const SubWatchList = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<ParamList>>();
  const {title, listTrackingStock} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerTitleStyle: {fontSize: 18},
      headerRight: () => (
        <SublistHeader onPressAdd={() => {navigation.navigate("SearchScreen")}} onPressEdit={() => {}} />
      ),
    });
  });

  return listTrackingStock.length === 0 ? (
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
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#B8C4FF',
          borderRadius: 5,
          padding: 3,
          bottom: 50
        }}
        onPress={()=> {navigation.navigate("SearchScreen")}}>
        <IconAddWhite style={{height: 12, aspectRatio: 1, margin: 5}} />
        <Text
          style={{
            color: 'white',
            fontSize: 12,
            marginRight: 5,
            marginVertical: 5,
          }}>
          Thêm mã
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View></View>
  );
};

export default SubWatchList;
