import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Touchable,
  TouchableOpacity,
  FlatList,
  ViewToken,
} from 'react-native';
import {DataTable} from 'react-native-paper';
import IconTime from '../../icons/IconTime';
import IconChart from '../../icons/IconChart';
import SMG from '../../common/SMG';
import IconSmallAdd from '../../icons/IconSmallAdd';
import {API_CORE} from '../../api';
import {
  arrayToGraphData,
  convertEpochToDateString,
  convertEpochToTimeString,
} from '../../utils/utils';
import ChartDetail from '../../charts/ChartDetail';
import ShortenedGraph from '../../charts/GhortenedChart';
import DetailChart2 from '../../charts/DetailChart2';
import {StockTemporary} from '../../type';
import {useNavigation} from '@react-navigation/native';
import {ROOT_PATH} from '../../constants';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

interface IndexPropsStyle {
  name: string;
  comGroupCode: string;
  updateTime: number;
  priceTimeSeries: number[];
  preferencePrice: number;
  price: number;
  volume: number;
  transactionValue: number;
  priceChange: number;
}

const indexContent = (data: IndexPropsStyle) => {
  const priceColor =
    data.priceChange > 0 ? {color: '#37c284'} : {color: '#f65959'};
  const price = data.price.toFixed(2);
  const volume = (data.volume / 1e6).toFixed(2);
  const priceChange = data.priceChange.toFixed(2);
  const priceChangeText =
    data.priceChange > 0 ? '+' + priceChange : priceChange;
  const percentChange = ((data.priceChange / data.price) * 100).toFixed(2);
  const percentChangeText =
    data.priceChange > 0 ? '+' + percentChange + '%' : percentChange + '%';
  const transactionValue =
    data.transactionValue > 0 ? data.transactionValue : '_._';
  const updateTime = convertEpochToTimeString(data.updateTime);
  return (
    <View style={styles.indexContent}>
      <View
        style={{
          height: '60%',
          width: '100%',
          borderBottomWidth: 0.5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <ChartDetail data={data.priceTimeSeries} lineColor={priceColor.color}/> */}
        <DetailChart2
          data={arrayToGraphData(data.priceTimeSeries, 2)}
          width={windowWidth / 2 - 20}
          height={windowHeight * 0.13}
          referencePrices={data.preferencePrice}
          changePrice={data.priceChange}
        />
      </View>
      <View
        style={{
          width: '100%',
          height: '40%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.indexContentDetail}>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
            {data.name}
          </Text>
          <Text style={[{fontSize: 16, fontWeight: '600'}, priceColor]}>
            {price}
          </Text>
        </View>
        <View style={[styles.indexContentDetail, {height: '30%'}]}>
          <View
            style={{
              width: 'auto',
              height: 'auto',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IconTime style={{width: 10, height: 10, marginRight: 5}} />
            <Text style={{color: '#7e7e7e', fontSize: 10}}>{updateTime}</Text>
          </View>
          <Text style={[{fontSize: 10, fontWeight: '600'}, priceColor]}>
            {priceChangeText}/{percentChangeText}
          </Text>
        </View>
        <View style={[styles.indexContentDetail, {height: '30%'}]}>
          <Text style={{color: '#7e7e7e', fontSize: 12}}>{volume} triệu</Text>
          <Text style={{color: '#7e7e7e', fontSize: 12}}>
            {transactionValue} nghìn tỷ
          </Text>
        </View>
      </View>
    </View>
  );
};

const renderItemTopStock = (
  props: StockTemporary,
  onPress: () => void,
): React.JSX.Element => {
  const colorStyle = (n: number) => {
    if (n < 0) return {color: '#f65959'};
    return {};
  };
  console.log(props.code);
  return (
    <DataTable.Row key={props.code}>
      <DataTable.Cell style={styles.cell}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onPress}>
          <Text
            style={[
              styles.textCell,
              {color: 'black', width: '60%', fontWeight: '500'},
            ]}>
            {props.code}
          </Text>
          <IconSmallAdd style={{width: 13, aspectRatio: 1, margin: '6%'}} />
        </TouchableOpacity>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <ShortenedGraph
          data={arrayToGraphData(props.timeSeries, 2)}
          width={35}
          height={25}
          priceReference={props.pricePreference}
          exchange={props.exchange}
        />
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <SMG style={{width: '55%', aspectRatio: 1}} smg={props.smg} />
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <Text style={[styles.textCell]}>{props.price.toFixed(1)}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <Text style={[styles.textCell, colorStyle(props.percentChangeDay)]}>
          {(props.percentChangeDay * 100).toFixed(2)}%
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <Text style={[styles.textCell, colorStyle(props.percentChangeWeek)]}>
          {(props.percentChangeWeek * 100).toFixed(2)}%
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <Text style={[styles.textCell, colorStyle(props.percentChangeMonth)]}>
          {(props.percentChangeMonth * 100).toFixed(2)}%
        </Text>
      </DataTable.Cell>
    </DataTable.Row>
  );
};

// const renderItemTopIndustry = (props : TopIndustryPropsStyle) : React.JSX.Element => {
//     const colorStyle = (n : number) => {
//         if( n < 0) return {color: "#f65959"}
//         return {}
//     }
//     return (
//         <DataTable.Row key={props.id}>
//             <DataTable.Cell style={[styles.cell, {flex: 3}]}>
//                 <TouchableOpacity style={{flexDirection: 'row', justifyContent: "center", alignItems: "center",}}>
//                     <Text style={[styles.textCell, {color: "black"}]}>{props.name}</Text>
//                 </TouchableOpacity>
//             </DataTable.Cell>
//             <DataTable.Cell style={styles.cell}>
//                 <SMG style={{width:"55%", aspectRatio: 1}} smg={props.smg}/>
//             </DataTable.Cell>
//             <DataTable.Cell style={styles.cell}>
//                 <Text style={[styles.textCell, colorStyle(props.changeD)]}>{(props.changeD * 100).toFixed(2)}%</Text>
//             </DataTable.Cell>
//             <DataTable.Cell style={styles.cell}>
//                 <Text style={[styles.textCell, colorStyle(props.changeW)]}>{(props.changeW * 100).toFixed(2)}%</Text>
//             </DataTable.Cell>
//             <DataTable.Cell style={styles.cell}>
//                 <Text style={[styles.textCell, colorStyle(props.changeM)]}>{(props.changeM * 100).toFixed(2)}%</Text>
//             </DataTable.Cell>
//         </DataTable.Row>
//     );
// }

const HomeScreen = () => {
  const [updateTime, setUpdateTime] = React.useState<String | undefined>('');
  const [indexOverViewData, setIndexOverViewData] = React.useState<
    IndexPropsStyle[]
  >([]);
  const [top10Stock, setTop10Stock] = React.useState<StockTemporary[]>([]);
  const flatListRef = React.useRef<FlatList | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const navigation = useNavigation<any>();
  // navigation.navigate("StockNews");

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
        //   setUpdateTime(convertEpochToDateString(res.data[0].updateTime));
      } else {
        console.log('FETCH FAIL! Status Code: ' + res.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    console.log(`${ROOT_PATH}/invest_mate/api/home/top_smg`);
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
    <ScrollView>
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
                      indexContent(indexOverViewData[0])
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
                      indexContent(indexOverViewData[1])
                    ) : (
                      <View style={styles.indexContent} />
                    )}
                  </>
                ) : (
                  <>
                    {indexOverViewData[2] !== undefined ? (
                      indexContent(indexOverViewData[2])
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
                      indexContent(indexOverViewData[3])
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
