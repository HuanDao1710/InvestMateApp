import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useContext, useEffect, useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {StockInfoProps, StockTemporary, TrackingStockEntity} from '../../type';
import IconBlackAdd from '../../icons/IconBlackAdd';
import IconEdit from '../../icons/IconEdit';
import IconAddWhite from '../../icons/IconAddWhite';
import SQLiteContext from '../../sqlite/SQLContext';
import {API_CORE} from '../../api';
import {ROOT_PATH} from '../../constants';
import {renderStock} from '../stock-list/StockListScreen';

export type ParamList = {
  trackingStocks: {
    id: number;
    title: string;
    listTrackingStock: TrackingStockEntity[];
  };
};

export const SublistHeader = (props: {onPressAdd: any; onPressEdit: any}) => {
  return (
    <View
      style={{
     
        width: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginRight: 15
      }}>
      <TouchableOpacity onPress={props.onPressAdd}>
        <IconBlackAdd width={25} height={25} />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPressEdit}>
        <IconEdit width={25} height={25} />
      </TouchableOpacity>
    </View>
  );
};

const SubWatchList = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<ParamList>>();
  const {id, title} = route.params;
  const sqlite = useContext(SQLiteContext);
  const [listTrackingStock, setListTrackingStock] = React.useState<
    TrackingStockEntity[]
  >([]);
  const focus = useIsFocused();
  const [listStockInfo, setListStockInfo] = React.useState<StockTemporary[]>(
    [],
  );

  const fetchData = async () => {
    const _listTrackingStock = await sqlite.findAllTrackingStocks(id);
    setListTrackingStock(_listTrackingStock.reverse());
    try {
      const res = await API_CORE.post<StockTemporary[]>(
        `${ROOT_PATH}/invest_mate/api/watchlist/list_stock_watchlist`,
        {
          listCode: _listTrackingStock.map(item => item.code),
        },
      );
      if (res.status === 200) {
        setListStockInfo(res.data);
      } else {
        console.log('FETCH FAIL! Status Code: ' + res.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (focus) fetchData();
  }, [focus]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerTitleStyle: {fontSize: 18},
      headerRight: () => (
        <SublistHeader
          onPressAdd={() => {
            navigation.navigate('WatchListSearch', {
              id: id,
              listTrackingStock: listTrackingStock,
            });
          }}
          onPressEdit={() => {}}
        />
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
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#B8C4FF',
          borderRadius: 5,
          bottom: 50,
          paddingHorizontal: 10,
          paddingVertical: 5,
          gap: 10
          
        }}
        onPress={() => {
          navigation.navigate('WatchListSearch', {
            id: id,
            listTrackingStock: listTrackingStock,
          });
        }}>
        <IconAddWhite width={15}  height={15} />
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            marginRight: 5,
            marginVertical: 5,
            fontWeight:'bold'
          }}>
          Thêm mã
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      }}>
      <ScrollView
        style={{flex: 1, width: '100%'}}
        contentContainerStyle={{alignItems: 'center'}}>
        {listStockInfo.map((item, index) => renderStock(item, () => {}, index))}
      </ScrollView>
    </View>
  );
};

export default SubWatchList;
