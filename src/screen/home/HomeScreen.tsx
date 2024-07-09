import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  ViewToken,
  RefreshControl,
} from 'react-native';
import {DataTable} from 'react-native-paper';
import {API_CORE} from '../../api';
import {convertEpochToDateString} from '../../utils/utils';
import {StockTemporary} from '../../type';
import {useNavigation} from '@react-navigation/native';
import {ROOT_PATH} from '../../constants';
import renderItemTopStock from './renderStockItem';
import IndexContent, {IndexPropsStyle} from './IndexContent';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const [updateTime, setUpdateTime] = React.useState<String | undefined>('');
  const [indexOverViewData, setIndexOverViewData] = React.useState<
    IndexPropsStyle[]
  >([]);
  const [top10Stock, setTop10Stock] = React.useState<StockTemporary[]>([]);
  const flatListRef = React.useRef<FlatList | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const navigation = useNavigation<any>();
  // navigation.navigate("StockNews");

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getDataIndex();
    await getDataStock();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % 2;
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({animated: true, index: nextIndex});
        }
        return nextIndex;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const getDataIndex = async () => {
    try {
      const res = await API_CORE.post<any>(
        `${ROOT_PATH}/invest_mate/api/home/index`,
        {
          indexes: ['VNINDEX', 'VN30', 'HNX', 'HNX30'],
        },
      );
      if (res.status === 200) {
        setIndexOverViewData(res.data);
        setUpdateTime(convertEpochToDateString(res.data[0].updateTime));
      } else {
        console.log('FETCH FAIL! Status Code: ' + res.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getDataStock = async () => {
    try {
      const res = await API_CORE.get<any>(
        `${ROOT_PATH}/invest_mate/api/home/top_smg`,
      );
      if (res.status === 200) {
        setTop10Stock(res.data);
        //   console.log(res.data)
        // setUpdateTime(convertEpochToDateString(res.data[0].updateTime));
      } else {
        console.log('FETCH FAIL! Status Code: ' + res.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getDataIndex();
    getDataStock();
  }, []);

  const handleOnViewableItemsChanged = React.useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      // setActive(viewableItems[0].index || 0);
    },
  ).current;

  const viewabilityConfig = React.useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View
        style={{
          width: windowWidth,
          height: 'auto',
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
        }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tổng quan</Text>
          <Text style={styles.updateTime}>Ngày cập nhật: {updateTime}</Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            height: windowHeight * 0.3,
            margin: '1%',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            snapToAlignment="center"
            ref={r => {
              flatListRef.current = r;
            }}
            viewabilityConfig={viewabilityConfig}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={[1, 2]}
            pagingEnabled
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            progressViewOffset={2}
            onViewableItemsChanged={handleOnViewableItemsChanged}
            renderItem={({item}) => (
              <View
                key={item}
                style={{
                  height: 220, // Sử dụng chiều cao màn hình với tỷ lệ phần trăm hợp lý
                  backgroundColor: '#f4f5f7',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: windowWidth, // Đặt chiều rộng của mỗi mục bằng chiều rộng màn hình
                }}>
                {item === 1 ? (
                  <>
                    {indexOverViewData[0] !== undefined ? (
                      <IndexContent data={indexOverViewData[0]} />
                    ) : (
                      <View style={styles.indexContent} />
                    )}
                    <View
                      style={{
                        height: '50%',
                        borderWidth: 0.5,
                        borderColor: '#727272',
                        borderStyle: 'dashed',
                      }}
                    />
                    {indexOverViewData[1] !== undefined ? (
                      <IndexContent data={indexOverViewData[1]} />
                    ) : (
                      <View style={styles.indexContent} />
                    )}
                  </>
                ) : (
                  <>
                    {indexOverViewData[2] !== undefined ? (
                      <IndexContent data={indexOverViewData[2]} />
                    ) : (
                      <View style={styles.indexContent} />
                    )}
                    <View
                      style={{
                        height: '50%',
                        borderWidth: 0.5,
                        borderColor: '#727272',
                        borderStyle: 'dashed',
                      }}
                    />
                    {indexOverViewData[3] !== undefined ? (
                      <IndexContent data={indexOverViewData[3]} />
                    ) : (
                      <View style={styles.indexContent} />
                    )}
                  </>
                )}
              </View>
            )}
          />
        </View>
        <View style={styles.topStock}>
          <View style={styles.tableContainer}>
            <View
              style={{
                margin: '2%',
                alignSelf: 'baseline',
                backgroundColor: '#b8c4ff',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  marginLeft: 6,
                  marginRight: 6,
                  fontWeight: '600',
                  fontSize: 14,
                  color: '#141ffc',
                }}>
                Top cổ phiếu mạnh nhất
              </Text>
            </View>
            <View style={{width: '100%', height: 'auto'}}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title style={styles.cell}>Mã</DataTable.Title>
                  <DataTable.Title style={styles.cell}>Chart</DataTable.Title>
                  <DataTable.Title style={styles.cell}>SMG</DataTable.Title>
                  <DataTable.Title style={styles.cell}>Giá</DataTable.Title>
                  <DataTable.Title style={styles.cell}>%D</DataTable.Title>
                  <DataTable.Title style={styles.cell}>%W</DataTable.Title>
                  <DataTable.Title style={styles.cell}>%M</DataTable.Title>
                </DataTable.Header>
                {top10Stock.map((item: StockTemporary) =>
                  renderItemTopStock(item, () =>
                    navigation.navigate('StockDetail', {item}),
                  ),
                )}
              </DataTable>
            </View>
          </View>
        </View>
      </View>
      <View style={{paddingBottom: '15%'}}></View>
    </ScrollView>
  );
};

export default HomeScreen;

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
  updateTime: {
    marginRight: 10,
    color: 'black',
    fontSize: 10,
    bottom: -5,
  },
  index: {
    backgroundColor: 'white',
    width: '100%',
    height: windowHeight * 0.3,
    margin: '1%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexContent: {
    height: '100%',
    width: '50%',
  },
  indexContentDetail: {
    height: '40%',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  topStock: {
    backgroundColor: 'white',
    width: '100%',
    height: 'auto',
    margin: '1%',
    borderRadius: 20,
    alignItems: 'center',
  },
  tableContainer: {
    width: '96%',
    borderWidth: 1,
    height: 'auto',
    borderRadius: 10,
    borderColor: '#b4b4b3',
    marginVertical: 20,
  },
  textCell: {
    color: '#1DC787',
    fontSize: 11,
  },
  cell: {
    alignItems: 'center',
  },
  industyCell: {
    alignItems: 'center',
  },
});
