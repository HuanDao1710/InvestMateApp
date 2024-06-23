import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {API_CORE} from '../../api';
import {COLOR, ROOT_PATH} from '../../constants';
import {
  CriteriaType,
  FilterDTO,
  StockFilterDTO,
  StockTemporary,
} from '../../type';
import {DataTable} from 'react-native-paper';
import ViewIcon from '../../icons/ViewIcon';

const screenHeight = Dimensions.get('window').height;

interface FilterResultsProps {
  exchange: string;
  industry: string;
  conditions: CriteriaType[];
}

function isPropertyOfStockTemporary(
  obj: StockTemporary,
  prop: string,
): prop is keyof StockTemporary {
  return prop in obj;
}

function isPropertyOfStockFilterDTO(
  obj: StockFilterDTO,
  prop: string,
): prop is keyof StockFilterDTO {
  return prop in obj;
}

function isObjectNotEmpty(obj: any) {
  return Object.keys(obj).length !== 0;
}

function isNumber(value: any) {
  return typeof value === 'number' && !isNaN(value);
}

function formatNumber(number: any) {
  if (!isNumber(number)) {
    return number;
  }
  if (number >= 1000000 || number < -1000000) {
    return (number / 1000000).toFixed(2) + 'M';
  }
  if (number >= 1000 || number < -1000) {
    return (number / 1000).toFixed(2) + 'K';
  }
  return number.toFixed(2);
}

const FilterResults = () => {
  const navigation = useNavigation<any>();
  const [results, setResults] = React.useState<FilterDTO[]>([]);
  const route = useRoute<any>();
  const {item} = route.params;
  const [loading, setLoading] = React.useState(true);
  const [tableHeader, setTableHeader] = React.useState<string[]>([]);
  const [widthArrTable, setWidthArrTable] = React.useState<number[]>([]);
  const headerTableRef = React.useRef<
    (keyof StockTemporary | keyof StockFilterDTO)[]
  >([]);
  const [tableData, setTableData] = React.useState<
    {data: any[]; temporary: StockTemporary}[]
  >([]);

  const initHeaderTable = (item: FilterResultsProps) => {
    const listString: string[] = [];
    listString.push('Mã');
    headerTableRef.current.push('code');
    if (item.exchange !== '') {
      listString.push('Sàn');
      headerTableRef.current.push('exchange');
    }
    if (item.industry !== '') {
      listString.push('Ngành');
      headerTableRef.current.push('industry');
    }
    item.conditions.map(i => {
      listString.push(i.name);
      headerTableRef.current.push(
        i.key.slice(3) as keyof (StockFilterDTO | StockTemporary),
      );
    });
    setTableHeader(listString);
    setWidthArrTable(listString.map(i => 60));
  };

  const getResults = async (item: any) => {
    try {
      const res = await API_CORE.post<any>(
        `${ROOT_PATH}/invest_mate/api/stock_filter/filter`,
        {
          exchange: item.exchange,
          industry: item.industry,
          conditions: item.conditions.map(
            (i: {
              key: string;
              currentMinValue: number;
              currentMaxValue: number;
            }) => {
              return {
                value: i.key,
                from: i.currentMinValue,
                to: i.currentMaxValue,
              };
            },
          ),
        },
      );
      if (res.status === 200) {
        setResults(res.data);
        setLoading(false);
      } else {
        console.log('FETCH FAIL! Status Code: ' + res.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    getResults(item);
    initHeaderTable(item);
  }, []);

  React.useEffect(() => {
    if (results.length > 0) {
      const re: any[] = [];

      results.map(item => {
        const temporary = item.temporaryDTO;
        const stockFilter = item.stockFilterDTO;
        let newObj: any[] = [];
        headerTableRef.current.forEach(props => {
          if (isPropertyOfStockTemporary(temporary, props)) {
            newObj.push(temporary[props]);
          } else if (isPropertyOfStockFilterDTO(stockFilter, props)) {
            newObj.push(stockFilter[props]);
          }
        });
        if (isObjectNotEmpty(newObj)) {
          re.push({data: newObj, temporary: temporary});
        }
      });
      setTableData(re);
    }
  }, [results]);

  const handlePressItem = (item: StockTemporary) => {
    navigation.navigate('StockDetail', {item});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            top: screenHeight / 2 - 120,
          }}>
          <ActivityIndicator size="small" color="grey" />
          <Text
            style={{color: 'grey', margin: 5, fontSize: 14, fontWeight: '500'}}>
            Đang tải...
          </Text>
        </View>
      ) : (
        <>
          <View
            style={{
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              borderBottomWidth: 1,
              borderColor: '#DADADA',
            }}>
            <Text style={{color: 'black'}}>
              {results.length} kết quả trùng khớp
            </Text>
          </View>
          <View style={{flex: 1}}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                borderRadius: 15,
                backgroundColor: 'white',
                paddingRight: 100,
              }}>
              <DataTable
                style={{
                  elevation: 1,
                  width: tableHeader.length * 100,
                }}>
                <DataTable.Header>
                  {tableHeader.map((item, index) => (
                    <DataTable.Title
                      style={[styles.cell]}
                      key={index}
                      numberOfLines={2}>
                      <Text
                        style={{
                          fontWeight: '500',
                          color: 'grey',
                          borderWidth: 1,
                        }}
                        numberOfLines={2}>
                        {item}
                      </Text>
                    </DataTable.Title>
                  ))}
                </DataTable.Header>
                <FlatList
                  data={tableData}
                  contentContainerStyle={{paddingBottom: 150}}
                  renderItem={({item, index}) => (
                    <DataTable.Row key={index}>
                      <DataTable.Cell style={styles.cell} key={0}>
                        <TouchableOpacity
                          style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: '100%',
                            flexDirection: 'row',
                            gap: 10,
                          }}
                          onPress={() => handlePressItem(item.temporary)}>
                          <Text
                            style={[
                              styles.textCell,
                              {
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 12,
                              },
                            ]}>
                            {formatNumber(item.data[0])}
                          </Text>
                          <ViewIcon
                            width={15}
                            height={15}
                            fill={COLOR.secoundaryColor}
                          />
                        </TouchableOpacity>
                      </DataTable.Cell>

                      {item.data.slice(1).map((i, idx) => (
                        <DataTable.Cell style={styles.cell} key={idx + 1}>
                          <Text style={[styles.textCell]}>
                            {formatNumber(i)}
                          </Text>
                        </DataTable.Cell>
                      ))}
                    </DataTable.Row>
                  )}
                />
                {/* {tableData.map((item, index) => (
                  <DataTable.Row key={index}>
                    {item.data.map((i, idx) => (
                      <DataTable.Cell style={styles.cell} key={idx}>
                        <Text style={[styles.textCell]}>{formatNumber(i)}</Text>
                      </DataTable.Cell>
                    ))}
                  </DataTable.Row>
                ))} */}
              </DataTable>
            </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textCell: {
    color: '#1DC787',
    fontSize: 14,
  },
  cell: {
    alignItems: 'center',
    minWidth: 100,
    // borderWidth: 1,
    justifyContent: 'center',
  },
});

export default FilterResults;
