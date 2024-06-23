import React, {useContext, useEffect} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {StockTemporary, TrackingStockEntity, WatchlistEntity} from '../type';
import SQLiteContext from '../sqlite/SQLContext';
import {result} from 'lodash';
import IconGreyV from '../icons/IconGeyV';
import IconGreyAdd from '../icons/IconGreyAdd';
import {COLOR} from '../constants';

const screenWidth = Dimensions.get('screen').width;

const RenderWatchList = (props: {watchList: WatchlistEntity; code: string}) => {
  const [listStock, setListStock] = React.useState<TrackingStockEntity[]>([]);
  const sqlite = useContext(SQLiteContext);

  const fetchData = async () => {
    sqlite.findAllTrackingStocks(props.watchList.id).then(result => {
      if (result) {
        setListStock(result);
      }
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const addToWatchlist = async () => {
    try {
      const re = await sqlite.createTrackingStocks({
        id: 0,
        code: props.code,
        watchlist: props.watchList.id,
      });
      fetchData();
    } catch {}
  };

  const removeToWatchList = async () => {
    const item = listStock.find(i => i.code == props.code);
    if (item) {
      await sqlite.deleteTrackingStocks(item);
      fetchData();
    }
  };

  const alreadyExist = (): boolean => {
    const item = listStock.find(i => i.code === props.code);
    if (item) {
      return true;
    }
    return false;
  };

  return (
    <View
      style={{
        width: '100%',
        minHeight: 65,
        backgroundColor: '#EFEFEF',
        elevation: 1,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        flexDirection: 'row',
      }}>
      <View style={{}}>
        <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
          {props.watchList.name}
        </Text>
      </View>
      {alreadyExist() ? (
        <TouchableOpacity
          style={{
            // backgroundColor: COLOR.secoundaryColor,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
          onPress={removeToWatchList}>
          <IconGreyV width={25} height={25} fill={COLOR.greenColor} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: COLOR.secoundaryColor,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
          onPress={addToWatchlist}>
          <Text style={{color: 'white', fontSize: 12}}>Thêm</Text>
          <IconGreyAdd width={10} height={10} fill={'white'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const ModalAddToWatchlist = (props: {
  onClose: () => void;
  item: StockTemporary;
}) => {
  const [listWatchlist, setListWatchList] = React.useState<WatchlistEntity[]>(
    [],
  );
  const sqlite = useContext(SQLiteContext);

  useEffect(() => {
    sqlite.findAllWatchlist().then(result => {
      if (result) {
        setListWatchList(result);
      }
    });
  }, []);

  return (
    <View
      style={{
        width: screenWidth * 0.8,
        height: 500,
        paddingTop: 10,
      }}>
      <ScrollView style={{flex: 1}} contentContainerStyle={{gap: 15}}>
        {listWatchlist.map((item, index) => (
          <RenderWatchList code={props.item.code} watchList={item} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: COLOR.secoundaryColor,
          paddingHorizontal: 15,
          paddingVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15,
        }}>
        <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
          Xong
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalAddToWatchlist;
