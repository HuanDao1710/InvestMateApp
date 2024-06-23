import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import { StockTemporary, TrackingStockEntity } from '../../type';
import IconBlackAdd from '../../icons/IconBlackAdd';
import IconEdit from '../../icons/IconEdit';
import IconAddWhite from '../../icons/IconAddWhite';
import SQLiteContext from '../../sqlite/SQLContext';
import { API_CORE } from '../../api';
import { COLOR, ROOT_PATH } from '../../constants';
import { renderStock } from '../stock-list/StockListScreen';
import ModalBase, { ModalBaseRefType } from '../../common/ModalBase';
import ModalBaseSlide from '../../common/ModalBaseSlide';
import GarbageIcon from '../../icons/GarbageIcon';
import RotationIcon from '../../icons/RotationIcon';

export type ParamList = {
  trackingStocks: {
    id: number;
    title: string;
    listTrackingStock: TrackingStockEntity[];
  };
};

const screenWidth = Dimensions.get('screen').width;
const screenHeigh = Dimensions.get('screen').height;

export const SublistHeader = (props: { onPressAdd: any; onPressEdit: any }) => {
  return (
    <View
      style={{

        width: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 18,
        marginRight: 15
      }}>
      <TouchableOpacity onPress={props.onPressAdd}>
        <IconBlackAdd width={28} height={28} />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPressEdit}>
        <IconEdit width={28} height={28} />
      </TouchableOpacity>
    </View>
  );
};

const SubWatchList = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<ParamList>>();
  const { id, title } = route.params;
  const sqlite = useContext(SQLiteContext);
  const [listTrackingStock, setListTrackingStock] = React.useState<
    TrackingStockEntity[]
  >([]);
  const focus = useIsFocused();
  const [listStockInfo, setListStockInfo] = React.useState<StockTemporary[]>(
    [],
  );
  const modalEditSubWatchList = React.useRef<ModalBaseRefType | null>(null);
  const [listStockRemove, setListStockRemove] = React.useState<TrackingStockEntity[]>([]);

  const addItemToRemove = (item: TrackingStockEntity) => {
    setListStockRemove(pre => [...pre, item])
  }

  const removeItemToRemove = (item: TrackingStockEntity) => {
    setListStockRemove(pre => pre.filter(i => i !== item))
  }

  const fetchData = async () => {
    const _listTrackingStock = await sqlite.findAllTrackingStocks(id);
    setListTrackingStock(_listTrackingStock.reverse());
    console.log(_listTrackingStock.map(item => item.code))
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


  const handlePressItem = (item: StockTemporary) => {
    navigation.navigate('StockDetail', { item });
  };

  const handleEditTrackingStockList =async () => {
    for (let item of listStockRemove) {
      await sqlite.deleteTrackingStocks(item)
    }
    setListStockRemove([]);
    fetchData();
    modalEditSubWatchList.current?.hide();
  }


  useEffect(() => {
    if (focus) {
      fetchData();
    }
  }, [focus]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerTitleStyle: { fontSize: 18 },
      headerRight: () => (
        <SublistHeader
          onPressAdd={() => {
            navigation.navigate('WatchListSearch', {
              id: id,
              listTrackingStock: listTrackingStock,
            });
          }}
          onPressEdit={() => modalEditSubWatchList.current?.show()}
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
        <IconAddWhite width={15} height={15} />
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            marginRight: 5,
            marginVertical: 5,
            fontWeight: 'bold'
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
      <ModalBase ref={modalEditSubWatchList}>
        <View style={{ alignItems: 'center', width: screenWidth * 0.8, height: 550, paddingHorizontal: 0, paddingVertical: 10 }}>
          <View style={{ flex: 1, width: '100%', alignItems: 'center', gap: 15 }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: 'black', }}>
              Chỉnh sửa dánh sách theo dõi
            </Text>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
            <ScrollView
              contentContainerStyle={{ gap: 10, paddingHorizontal: 10, paddingBottom: 20 }}
              indicatorStyle={'black'}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
              style={{ width: '100%' }}>
              {listTrackingStock.map((item, index) => {
                const canRemove = listStockRemove.find(i => i.code === item.code)
                console.log(canRemove)
                return <View key={index}
                  style={{
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    borderRadius: 15,
                    // backgroundColor: COLOR.secoundaryColor,
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    borderColor: COLOR.secoundaryColor
                  }}>

                  <Text style={{ color: 'black', fontWeight: 'bold' }}>
                    <Text style={{ fontSize: 14 }}>Mã: </Text>
                    {item.code}
                  </Text>
                  {!canRemove ?
                    <TouchableOpacity onPress={() => addItemToRemove(item)}>
                      <GarbageIcon width={22} height={22} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => removeItemToRemove(item)}>
                      <RotationIcon width={22} height={22} />
                    </TouchableOpacity>}
                </View>
              }
              )}
            </ScrollView>

            <TouchableOpacity
              onPress={handleEditTrackingStockList}
              style={{
                backgroundColor: COLOR.secoundaryColor,
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 15,
              }}>
              <Text style={{ color: 'white', fontWeight: 'bold', elevation: 1 }}>Lưu thay đổi</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ModalBase>
      <ScrollView
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}>
        {listStockInfo.map((item, index) => renderStock(item, handlePressItem, index))}
      </ScrollView>
    </View>
  );
};

export default SubWatchList;
