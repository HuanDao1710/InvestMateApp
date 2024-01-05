import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import SMG from '../../common/SMG';
import IconSort from '../../icons/IconSort';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  MenuOption,
} from 'react-native-popup-menu';
import {useNavigation} from '@react-navigation/native';
import {listSortOption} from './ListSortOptions';
import {
  arrayToGraphData,
  getColorPrice,
  getTextChangePrice,
} from '../../utils/utils';
import {Dropdown} from 'react-native-element-dropdown';
import {API_CORE} from '../../api';
import {StockTemporary, Industry} from '../../type';
import ShortenedGraph from '../../charts/GhortenedChart';
import {FlatList} from 'react-native-gesture-handler';
import {IP} from '../../constants';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const removeDuplicates = (list: any[]) => {
  return Array.from(new Set(list.map(item => item.code))).map(code => {
    return list.find(item => item.code === code);
  });
};

const renderStock = (item: StockTemporary, onPress: any, index: number) => {
  const colorStyle = getColorPrice(item.priceChange);
  const textChange = getTextChangePrice(
    item.priceChange,
    item.priceChange / item.pricePreference,
  );
  return (
    <TouchableOpacity
      style={styles.stockItemContainer}
      key={index}
      onPress={() => {
        onPress(item);
      }}>
      <View style={styles.stockItemContent}>
        <View style={{width: '35%', height: '100%', justifyContent: 'center'}}>
          <Text style={{color: 'black', fontWeight: '600'}}>
            {item.shortName}
          </Text>
          <Text style={{color: '#646464', fontWeight: '500'}}>
            Mã CP: {item.code}
          </Text>
        </View>
        <View style={{width: '20%', justifyContent: 'center'}}>
          <ShortenedGraph
            data={arrayToGraphData(item.timeSeries, 1)}
            exchange={item.exchange}
            height={35}
            width={50}
            priceReference={item.pricePreference}
          />
        </View>
        <View
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SMG smg={item.smg} style={{width: '80%', aspectRatio: 1}} />
        </View>
        <View
          style={{
            width: '30%',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text style={{color: 'black', fontSize: 14}}>
            {item.price * 1000}
          </Text>
          <Text style={[{fontSize: 12}, colorStyle]}>{textChange}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ListStockScreen = () => {
  const [updateTime, setUpdateTime] = React.useState<string>('18/11/2023');
  const [sortOption, setSortOption] = React.useState<{
    code: string;
    name: string;
  }>({code: 'highest_RS', name: 'SMG cao nhất'});
  const [listIndustry, setListIndustry] = React.useState<Industry[]>([
    {industry: 'Tất cả', industryId: ''},
  ]);
  const [isFocus, setIsFocus] = React.useState(false);
  const navigation = useNavigation<any>();
  const [listStock, setListStock] = React.useState<StockTemporary[]>([]);
  const [page, setPage] = React.useState(0);
  const [currentIndustry, setCurrentIndustry] = React.useState('');

  const getListIndustry = async () => {
    try {
      const res = await API_CORE.get<any>(
        `http://${IP}:8080/invest_mate/api/stock_list/list_industry`,
      );
      if (res.status === 200) {
        // console.log(res.data)
        setListIndustry([{industry: 'Tất cả', industryId: ''}, ...res.data]);
        //   setUpdateTime(convertEpochToDateString(res.data[0].updateTime));
      } else {
        console.log('FETCH FAIL! Status Code: ' + res.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getListStock = async (
    industry: string,
    sortBy: string,
    page: number,
    size: number,
    replace = false,
  ) => {
    console.log(industry, sortBy, page, size, replace);
    try {
      const res = await API_CORE.get<any>(
        `http://${IP}:8080/invest_mate/api/stock_list/list_stock`,
        {
          params: {
            industry: industry,
            sortBy: sortBy,
            page: page,
            size: size,
          },
        },
      );
      if (res.status === 200) {
        replace
          ? setListStock(res.data.content)
          : setListStock(removeDuplicates([...listStock, ...res.data.content]));
        //   setUpdateTime(convertEpochToDateString(res.data[0].updateTime));
      } else {
        console.log('FETCH FAIL! Status Code: ' + res.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    // console.log(page)
    getListIndustry();
    // getListStock(0, "highest_RS", 0, 20, true);
  }, []);

  const handleSelectSortOption = (item: any) => {
    setSortOption(item);
    getListStock(currentIndustry, item.code, 0, 20, true);
    setPage(0);
  };

  const handleSelectIndustry = (item: any) => {
    // setValue(item.value);
    setIsFocus(false);
    setCurrentIndustry(item.industryId);
    getListStock(item.industryId, sortOption.code, 0, 20, true);
    setPage(0);
  };

  const handlePressItem = (item: StockTemporary) => {
    navigation.navigate('StockDetail', {item});
  };

  const getMoreData = () => {
    getListStock(currentIndustry, sortOption.code, page, 20, false);
    setPage(page + 1);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: windowWidth,
          height: 'auto',
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
        }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Danh sách mã cổ phiếu</Text>
          <Text style={styles.updateTime}>Ngày cập nhật: {updateTime}</Text>
        </View>
        <View style={styles.sortSettingContainer}>
          <Text style={{color: '#5E5E5E', fontSize: 14, fontWeight: '700'}}>
            Sắp xếp theo: {sortOption.name}
          </Text>
          <Menu>
            <MenuTrigger>
              <IconSort style={{width: 42, aspectRatio: 1}} />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {borderRadius: 10, width: 'auto'},
              }}>
              {listSortOption.map(item => (
                <MenuOption
                  key={item.code}
                  onSelect={() => {
                    handleSelectSortOption(item);
                  }}>
                  <Text style={{color: 'black', fontSize: 14}}>
                    {item.name}
                  </Text>
                </MenuOption>
              ))}
            </MenuOptions>
          </Menu>
        </View>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginLeft: 10,
              color: '#5E5E5E',
              fontSize: 14,
              fontWeight: '700',
            }}>
            Ngành:
          </Text>
          <View style={{padding: 16, flex: 1, marginRight: 45}}>
            {/* {renderLabel()} */}
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{color: 'black', fontSize: 14}}
              iconStyle={styles.iconStyle}
              data={listIndustry}
              search
              maxHeight={300}
              labelField="industry"
              valueField="industryId"
              placeholder={!isFocus ? 'Tất cả' : '...'}
              searchPlaceholder="Search..."
              value={currentIndustry}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={handleSelectIndustry}
            />
          </View>
        </View>
        <View style={styles.listStock}>
          <FlatList
            data={listStock}
            keyExtractor={item => item.code}
            contentContainerStyle={{paddingBottom: 150}}
            renderItem={({item, index}) =>
              renderStock(item, handlePressItem, index)
            }
            onEndReached={getMoreData}
          />
        </View>
      </View>
    </View>
  );
};

export default ListStockScreen;

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
  sortSettingContainer: {
    height: windowHeight * 0.04,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '95%',
  },
  listStock: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2%',
  },
  stockItemContainer: {
    width: '97%',
    height: 65,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
  },
  stockItemContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '97%',
    flexDirection: 'row',
  },
  dropdown: {
    height: 28,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'black',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
});
