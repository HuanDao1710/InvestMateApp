import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {arrayToGraphData, convertEpochToTimeString} from '../../utils/utils';
import DetailChart2 from '../../charts/DetailChart2';
import IconTime from '../../icons/IconTime';
import axios from 'axios';
import React, {useState} from 'react';

export interface IndexPropsStyle {
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
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const convertNumberToUnits = (num: number) => {
  if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(2) + ' nghìn tỷ';
  } else if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + ' tỷ';
  } else if (num >= 100000000) {
    return (num / 100000000).toFixed(2) + ' trăm triệu';
  } else {
    return (num / 1000000).toFixed(2) + ' triệu';
  }
};

function convertEpochToDate(epoch: number) {
  var date = new Date(epoch * 1000); // Chuyển đổi epoch từ giây sang mili giây
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2); // Thêm số 0 nếu cần
  var day = ('0' + date.getDate()).slice(-2); // Thêm số 0 nếu cần
  return year + '-' + month + '-' + day;
}

const fetchGiaTriKhopLenh = async (time: string, symbol: string) => {
  const url = 'https://s.cafef.vn/Ajax/PageNew/DataHistory/PriceHistory.ashx';

  let code = '';
  if (symbol === 'VNINDEX') {
    code = 'VNINDEX';
  } else if (symbol === 'HNX') {
    code = 'HNX-INDEX';
  } else if (symbol === 'VN30') {
    code = 'VN30INDEX';
  } else if (symbol === 'HNX30') {
    code = 'HNX30-INDEX';
  }

  try {
    const response = await axios.get(url, {
      params: {
        Symbol: code,
        StartDate: time,
        EndDate: time,
        PageIndex: 1,
        PageSize: 3,
      },
    });
    const data = response.data;

    if (data && data.Data && data.Data.Data.length > 0) {
      const giaTriKhopLenhArray = data.Data.Data.map(
        (item: {GiaTriKhopLenh: number}) => item.GiaTriKhopLenh,
      );
      return giaTriKhopLenhArray;
    } else {
      console.error(
        'No data found for the given date and symbol:',
        time,
        symbol,
      );
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const IndexContent = (props: {data: IndexPropsStyle}) => {
  const {data} = props;
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
  const updateTime = convertEpochToTimeString(data.updateTime);

  const [transactionValue, setTransactionValue] = useState<string>('_._');

  React.useEffect(() => {
    fetchGiaTriKhopLenh(convertEpochToDate(data.updateTime), data.name).then(
      result => {
        if (result.length <= 0) return;
        setTransactionValue(convertNumberToUnits(result.pop()));
      },
    );
  }, []);

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
            {transactionValue}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default IndexContent;

const styles = StyleSheet.create({
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
});
