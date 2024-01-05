import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'react-native';
import SearceBar from '../../common/SearchBar';
import IconBack from '../../icons/IconBack';
import {StockInfoProps} from '../../type';

const forFade = (current: any) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const listStock = [
  {
    name: 'Chứng khoán SSI',
    code: 'SSI',
    chart: [],
    smg: 85,
    price: 28150.0,
    changePrice: 900.0,
    changePricePercent: 0.0328,
    exchange: 'HOSE',
    time: 1703325162,
  },
  {
    name: 'Chứng khoán SSI',
    code: 'AAA',
    chart: [],
    smg: 85,
    price: 28150.0,
    changePrice: -800.0,
    changePricePercent: -0.0328,
    exchange: 'HOSE',
    time: 1703325162,
  },
];

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

const ItemResult = (props: {item: StockInfoProps; keyword: string}) => {
  const {item, keyword} = props;
  const navigation = useNavigation<any>();
  const handlePressItem = () => {
    navigation.navigate('StockDetail', {item});
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
          width: '85%',
          alignItems: 'flex-start',
          justifyContent: 'space-around',
        }}>
        <Text
          style={{
            color: 'black',
            marginLeft: 15,
            fontSize: 16,
            fontWeight: '600',
          }}>
          {highlightText(item.name, keyword)}
        </Text>
        <Text style={{color: 'black', marginLeft: 15}}>
          Sàn: {highlightText(item.exchange, keyword)} | Mã CP:{' '}
          {highlightText(item.code, keyword)}
        </Text>
      </View>
      <View style={{height: '100%', width: '15%'}}></View>
    </TouchableOpacity>
  );
};

const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const [results, setResults] = useState<StockInfoProps[]>([]);
  const [key, setKey] = useState<string>('');

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

  const onTextChange = (text: string) => {
    setKey(text);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View
          style={{height: 'auto', width: '100%', marginTop: 5, borderWidth: 0}}>
          {listStock.length > 0 ? (
            listStock.map((item, index) => (
              <ItemResult key={index} item={item} keyword={key} />
            ))
          ) : (
            <View style={{width: '100%', height: '100%'}}></View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  highlight: {
    color: 'red',
    fontWeight: 'bold',
  },
});
