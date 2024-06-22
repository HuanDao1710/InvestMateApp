import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, ActivityIndicator, Dimensions} from 'react-native';
import { API_CORE } from '../../api';
import { ROOT_PATH } from '../../constants';
import { StockTemporary } from '../../type';
import { renderStock } from '../stock-list/StockListScreen';

const screenHeight = Dimensions.get("window").height;


const FilterResults = () => {
  const navigation = useNavigation<any>();
  const [results, setResults] = React.useState<any[]>([])
  const route = useRoute<any>();
  const {item} = route.params;
  const [loading, setLoading] = React.useState(true);

  const getResults = async () => {
    try {
      const res = await API_CORE.post<any>(
        `${ROOT_PATH}/invest_mate/api/stock_filter/filter`,
        item
      );
      if (res.status === 200) {
        console.log(res.data)
        setResults(res.data);
        setLoading(false);
      } else {
        console.log('FETCH FAIL! Status Code: ' + res.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(()=> {
    getResults();
  }, [])

  const handlePressItem = (item: StockTemporary) => {
    console.log(item)
    navigation.navigate('StockDetail', {item});
  };


  return (
    <SafeAreaView style={{flex: 1}}>
      {loading? 
      <View style={{position:"absolute", width: "100%", height:"100%", alignItems:"center", top: screenHeight /2 - 120}}>
        <ActivityIndicator size="small" color="grey" /> 
        <Text style={{color: "grey", margin: 5, fontSize: 14, fontWeight: "500"}}>Đang tải...</Text>
      </View>
      :<>
      <View style={{padding: 5, justifyContent:'center', alignItems: 'center', width:'100%',borderBottomWidth: 1, borderColor: "#DADADA"}}>
        <Text style={{color : 'black'}}>{results.length} kết quả trùng khớp</Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={results}
          keyExtractor={item => item.code}
          contentContainerStyle={{paddingBottom: 150}}
          renderItem={({item, index}) =>
            renderStock(item, handlePressItem, index)
          }
        /> 
      </View>
      </>}
    </SafeAreaView>
  );
};

export default FilterResults;
