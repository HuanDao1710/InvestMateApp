import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {DataTable} from 'react-native-paper';
import IconTime from '../../icons/IconTime';
import IconChart from '../../icons/IconChart';
import SMG from '../../common/SMG';
import IconThreeDot from '../../icons/IconThreeDot';
import IconStar from '../../icons/IconStar';
import IconBlackAdd from '../../icons/IconBlackAdd';
import IconEdit from '../../icons/IconEdit';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  MenuOption,
} from 'react-native-popup-menu';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {TrackingStockEntity, WatchlistEntity} from '../../type';
import SQLiteContext from '../../sqlite/SQLContext';
import AddWatchListModal from './AddWatchListModal';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const WatchlistHeader = (props: {onPressAdd: any}) => {
  return (
    <View
      style={{
        height: '100%',
        width: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={props.onPressAdd}>
        <IconBlackAdd style={{margin: '3%'}} width= {30} height={30} />
      </TouchableOpacity>
    </View>
  );
};

const GroupStock = (props: {
  item: WatchlistEntity;
  navigation: any;
  deleteWatchlist: any;
  editWatchlist: any;
  handleEdit: any;
}) => {
  const [numStock, setNumStock] = useState<number>(0);
  const [listTrackingStock, setListTrackingStock] = useState<
    TrackingStockEntity[]
  >([]);
  const sqlite = useContext(SQLiteContext);
  const item = props.item;

  const focus = useIsFocused();

  const fetchData = async () => {
    const _numStock = await sqlite.countTrackingStocks(item.id);
    setNumStock(_numStock);
    const _listTrackingStock = await sqlite.findAllTrackingStocks(item.id);
    setListTrackingStock(_listTrackingStock.reverse());
  };

  useEffect(() => {
    if (focus) fetchData();
  }, [focus]);

  const handleViewSubList = () => {
    const id = item.id;
    const title = item.name;
    props.navigation.navigate('SubWatchList', {id, title, listTrackingStock});
  };

  const handleDeleteWatchlist = () => {
    Alert.alert(
      'Xoá danh mục theo dõi',
      'Bạn có chắc muốn xoá danh mục ' + item.name + ' không?',
      [
        {text: 'Huỷ', onPress: () => {}},
        {
          text: 'Xoá',
          onPress: () => {
            props.deleteWatchlist(item.name, item.id);
          },
        },
      ],
    );
  };

  return (
    <TouchableOpacity style={styles.groupStock} onPress={handleViewSubList}>
      <View style={styles.groupContent}>
        <IconStar style={{height: '50%', aspectRatio: 1, margin: '5%'}} />
        <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
          <Text style={{color: 'black', fontWeight: '700', fontSize: 15}}>
            {item.name}
          </Text>
          <Text style={{color: 'black'}}>{numStock} Mã CP</Text>
        </View>
      </View>
      <Menu
        style={{
          width: '30%',
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: '100%',
        }}>
        <MenuTrigger
          style={{width: 'auto', height: '100%', justifyContent: 'center'}}>
          <IconThreeDot style={{height: '35%', aspectRatio: 1, margin: '5%'}} />
        </MenuTrigger>
        <MenuOptions
          customStyles={{optionsContainer: {borderRadius: 10, width: '30%'}}}>
          <MenuOption
            onSelect={() => {
              props.handleEdit(item.name, item.id);
            }}>
            <Text style={{color: 'black', fontSize: 14}}>Chỉnh sửa</Text>
          </MenuOption>
          <MenuOption onSelect={handleDeleteWatchlist}>
            <Text style={{color: 'black', fontSize: 14}}>Xoá</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </TouchableOpacity>
  );
};

const WatchlistScreen = () => {
  const sqlite = useContext(SQLiteContext);
  const navigation = useNavigation<any>();
  const [watchlist, setWatchlist] = useState<WatchlistEntity[]>([]);
  const [visible, setVisible] = useState(false);
  const [button1, setButton1] = useState<any>();
  const [button2, setButton2] = useState<any>();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState<string | undefined>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <WatchlistHeader onPressAdd={handleAdd} />,
    });
  });

  const handleAdd = () => {
    setTitle('Thêm danh mục theo dõi');
    setButton1({text: 'Huỷ', action: handleCacel});
    setButton2({text: 'Lưu', action: createWatchList});
    setVisible(true);
  };

  const handleEdit = (name: string, id: number) => {
    setTitle('Chỉnh sửa danh mục theo dõi');
    setButton1({text: 'Huỷ', action: handleCacel});
    setButton2({
      text: 'Cập nhật',
      action: (text: string) => editWatchlist(text, id),
    });
    setMessage(name);
    setVisible(true);
  };

  const createWatchList = (watchlistName: string) => {
    sqlite.createWatchlist({id: 1, name: watchlistName});
    setVisible(false);
    fetchWatchList();
    setMessage(undefined);
  };

  const deleteWatchlist = (watchlistName: string, id: number) => {
    sqlite.deleteWatchlist({name: watchlistName, id: id});
    setVisible(false);
    fetchWatchList();
  };

  const editWatchlist = (name: string, id: number) => {
    sqlite.updateWatchlist(name, id);
    setVisible(false);
    fetchWatchList();
    setMessage(undefined);
  };

  const handleCacel = () => {
    setVisible(false);
    setMessage(undefined);
  };

  const fetchWatchList = async () => {
    const results = await sqlite.findAllWatchlist();
    setWatchlist(results.reverse());
  };

  useEffect(() => {
    fetchWatchList();
  }, []);

  return (
    <ScrollView>
      <AddWatchListModal
        title={title}
        visible={visible}
        message={message}
        button1={button1}
        button2={button2}
      />
      <View
        style={{
          width: windowWidth,
          height: 'auto',
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
        }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Danh sách theo dõi</Text>
          <View />
        </View>
        <View style={styles.listGroup}>
          {watchlist.map((item, index) => (
            <GroupStock
              key={index}
              item={item}
              navigation={navigation}
              editWatchlist={editWatchlist}
              deleteWatchlist={deleteWatchlist}
              handleEdit={handleEdit}
            />
          ))}
        </View>
      </View>
      <View style={{paddingBottom: '15%'}}></View>
    </ScrollView>
  );
};

export default WatchlistScreen;

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    height: windowHeight * 0.05,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 15,
    color: 'black',
    fontWeight: '700',
    marginLeft: 10,
    fontFamily: 'Roboto',
    borderBottomWidth: 1,
  },
  listGroup: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  groupStock: {
    width: '97%',
    height: 56,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: '1%',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  groupContent: {
    width: '70%',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
