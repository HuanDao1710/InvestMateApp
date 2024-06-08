import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {API_CORE} from '../../api';
import SearceBar from '../../common/SearchBar';
import {ROOT_PATH} from '../../constants';
import IconBack from '../../icons/IconBack';
import {SearchDTO, StockInfoProps, TrackingStockEntity} from '../../type';
import {debounce} from 'lodash';
import IconAddWhite from '../../icons/IconAddWhite';
import CheckMarkIcon from '../../icons/CheckMarkIcon';

const forFade = (current: any) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export type WatchListSearchProps = {
  params: {
    id: string;
    listTrackingStock: TrackingStockEntity[];
  };
};

const HighlightedText = (props: {text: string; keyword: string}) => {
  const {text, keyword} = props;
  if (keyword === '') return <Text>{text}</Text>;
  const regex = new RegExp(keyword, 'gi'); // 'gi' để tìm kiếm không phân biệt hoa thường
  const matches = text.match(regex);
  const parts = text.split(regex);
  const highlightedText = parts.map((part, index) => {
    if (index === 0) {
      return <Text key={index}>{part}</Text>;
    } else {
      return (
        <React.Fragment key={index}>
          <Text style={styles.highlight}>
            {matches?.at(index - 1) ? matches?.at(index - 1) : keyword}
          </Text>
          <Text>{part}</Text>
        </React.Fragment>
      );
    }
  });
  return <Text>{highlightedText}</Text>;
};

const highlightText = (text: string, key: string) => {
  return <HighlightedText text={text} keyword={key} />;
};

const ItemResult = (props: {
  company: SearchDTO;
  keyword: string;
  watchlistID: string;
  alreadyExist: boolean;
}) => {
  const {company, keyword} = props;
  const navigation = useNavigation<any>();

  const handlePressItem = async () => {
    try {
      const res = await API_CORE.get<any>(
        `${ROOT_PATH}/invest_mate/api/home/get_stock`,
        {
          params: {
            code: company.code,
          },
        },
      );
      if (res.status === 200) {
        const item = res.data;
        navigation.navigate('StockDetail', {item});
      } else {
        console.log('FETCH FAIL! Status Code: ' + res.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 65,
        borderBottomWidth: 1,
        flexDirection: 'row',
        borderColor: '#DFDFDF',
      }}
      onPress={handlePressItem}>
      <View
        style={{
          height: '100%',

          alignItems: 'flex-start',
          justifyContent: 'space-around',
          flex: 1,
        }}>
        <Text
          style={{
            color: 'black',
            marginLeft: 15,
            fontSize: 16,
            fontWeight: '600',
          }}>
          {/* {item.name} */}
          {highlightText(company.name, keyword)}
        </Text>
        <Text style={{color: 'black', marginLeft: 15}}>
          Sàn: {highlightText(company.exchange, keyword)} | Mã CP:{' '}
          {/* Sàn: {item.exchange} | Mã CP:{' '} */}
          {highlightText(company.code, keyword)}
          {/* {item.code} */}
        </Text>
      </View>

      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          marginRight: 10,
          width: 45,
          alignItems: 'center',
        }}>
        {!props.alreadyExist ? (
          <TouchableOpacity
            style={{
              width: 45,
              height: 20,
              borderRadius: 20,
              backgroundColor: '#3961F8',
              padding: 3,
              elevation: 3,
            }}>
            <IconAddWhite />
          </TouchableOpacity>
        ) : (
          <CheckMarkIcon width={25} height={25} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const WatchListSearch = () => {
  const navigation = useNavigation<any>();
  const [results, setResults] = useState<StockInfoProps[]>([]);
  const [key, setKey] = useState<string>('');
  const route = useRoute<RouteProp<WatchListSearchProps>>();
  const watchlistID = route.params.id;

  const search = debounce(async (keyword: string) => {
    try {
      const res = await API_CORE.get<any>(
        `${ROOT_PATH}/invest_mate/api/home/search`,
        {
          params: {
            keyword: keyword,
          },
        },
      );
      if (res.status === 200) {
        setResults(res.data);
      } else {
        console.log('FETCH FAIL! Status Code: ' + res.status);
        if (res.status === 400) {
          ToastAndroid.show('Không có dữ liệu!', ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, 200);

  useLayoutEffect(() => {
    navigation.setOptions({
      cardStyleInterpolator: forFade,
      headerShown: true,
      header: () => (
        <View
          style={{
            borderWidth: 1,
            height: 60,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#DFDFDF',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconBack style={{width: 23, aspectRatio: 1, margin: 15}} />
          </TouchableOpacity>
          <SearceBar enable={true} handleTextChange={onTextChange} />
        </View>
      ),
    });
  });

  const checkAlreadyExist = (item: StockInfoProps) => {
    const r = route.params.listTrackingStock.find(i => i.code === item.code);
    if (r != null) return true;
    return false;
  };

  const onTextChange = (text: string) => {
    setKey(text);
    search(text);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{height: 'auto', width: '100%', marginTop: 5, borderWidth: 0}}>
        {results.length > 0 ? (
          <FlatList
            data={results}
            renderItem={({item, index}) => (
              <ItemResult
                key={index}
                company={item}
                keyword={key}
                watchlistID={watchlistID}
                alreadyExist={checkAlreadyExist(item)}
              />
            )}
          />
        ) : (
          <View style={{width: '100%', height: '100%'}}>
            <Text></Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default WatchListSearch;

const styles = StyleSheet.create({
  highlight: {
    color: 'red',
    fontWeight: 'bold',
  },
});
