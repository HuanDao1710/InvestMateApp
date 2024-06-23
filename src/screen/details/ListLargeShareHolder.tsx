import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {API_CORE} from '../../api';
import {COLOR, ROOT_PATH} from '../../constants';
import {StockTemporary} from '../../type';

interface StockHolder {
  no: number;
  ticker: string;
  name: string;
  ownPercent: number;
  code: string;
}

const ListLargeShareHolder = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{stockInfo: {item: StockTemporary}}>>();
  const {item} = route.params;
  const [listShareHolder, setListShareHolder] = React.useState<StockHolder[]>(
    [],
  );

  const fetchData = async () => {
    try {
      const res = await API_CORE.get<any>(
        `${ROOT_PATH}/invest_mate/api/stock_detail/large_share_holder`,
        {
          params: {
            code: item.code,
          },
        },
      );
      if (res.status === 200) {
        setListShareHolder(res.data);
        console.log(res.data);
        //   setUpdateTime(convertEpochToDateString(res.data[0].updateTime));
      } else {
        console.log('FETCH FAIL! Status Code: ' + res.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Danh sách cổ đông lớn',
      headerTitleStyle: {fontSize: 18},
    });
  });

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{width: '100%', flex: 1}}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text
          style={{
            color: '#468ae1',
            fontSize: 20,
            fontWeight: '800',
            textAlign: 'center',
          }}>
          {item.shortName}
        </Text>
      </View>
      {listShareHolder?.length > 0 ? (
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Danh sách cổ đông</Text>
          </View>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{paddingBottom: 80}}>
            <View
              style={{
                flex: 1,
                paddingTop: 10,
                width: '100%',
                paddingHorizontal: 10,
                gap: 10,
              }}>
              {listShareHolder.map((item, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 15,
                    minHeight: 65,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 15,
                    alignItems: 'center',
                  }}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      {item.name}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: COLOR.redColor,
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    {(item.ownPercent * 100).toFixed(2) + '%'}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'grey', fontSize: 20, fontWeight: 'bold'}}>
            Trống!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  title: {
    fontSize: 15,
    color: 'black',
    fontWeight: '700',
    marginLeft: 10,
    fontFamily: 'Roboto',
    borderBottomWidth: 1,
  },
});

export default ListLargeShareHolder;
