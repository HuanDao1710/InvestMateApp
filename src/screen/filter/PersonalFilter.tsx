import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconBlackAdd from '../../icons/IconBlackAdd';
import IconAddWhite from '../../icons/IconAddWhite';
import {StockFilterCriteriaEntity, StockFilterEntity} from '../../type';
import SQLiteContext from '../../sqlite/SQLContext';
import {result} from 'lodash';
import FilterIcon from '../../icons/FilterIcon';
import {COLOR} from '../../constants';
import ArrowRoundIcon from '../../icons/ArrowRoundIcon';
import IconStar from '../../icons/IconStar';
import GarbageIcon from '../../icons/GarbageIcon';
import IconEdit from '../../icons/IconEdit';
import ModalBase from '../../common/ModalBase';
import {ModalBaseRefType} from '../../common/ModalBaseSlide';
import RotationIcon from '../../icons/RotationIcon';

const screenWidth = Dimensions.get('screen').width;

const FilterItem = (props: {item: StockFilterEntity}) => {
  const {item} = props;
  const [expanded, setExpanded] = React.useState(false);
  const navigation = useNavigation<any>();
  const sqlite = useContext(SQLiteContext);
  const [listCriteria, setListCriteria] = useState<StockFilterCriteriaEntity[]>(
    [],
  );
  React.useEffect(() => {
    sqlite.getStockFilterCriteriaByFilterId(item.id).then(result => {
      if (result) {
        setListCriteria(result);
      }
    });
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={{
          width: '100%',
          backgroundColor: 'white',
          elevation: 1,
          borderRadius: 15,
          height: 65,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          alignItems: 'center',
          zIndex: 10,
        }}
        onPress={() =>
          navigation.navigate('CreateFilter', {filterInited: listCriteria})
        }>
        <View style={{gap: 15, flexDirection: 'row', alignItems: 'center'}}>
          <FilterIcon height={35} width={35} fill={COLOR.secoundaryColor} />
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
            {item.name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setExpanded(old => !old)}
          style={{
            height: '100%',
            paddingHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ArrowRoundIcon
            width={30}
            height={30}
            transform={[{rotate: expanded ? '90deg' : '0deg'}]}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      {expanded && (
        <View
          style={{
            backgroundColor: '#FEFEFE',
            width: '100%',
            paddingHorizontal: 15,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderTopWidth: 0.5,
            borderTopColor: '#DCDCDC',
            top: -15,
            paddingTop: 35,
            gap: 10,
            paddingBottom: 20,
          }}>
          {listCriteria.map((item, index) => (
            <View
              style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}
              key={index}>
              <IconStar style={{width: 15, aspectRatio: 1}} />
              <Text style={{color: 'black', fontSize: 14}}>{item.name}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const PersonalFilter = () => {
  const navigation = useNavigation<any>();
  const [listFilter, setListFilter] = React.useState<StockFilterEntity[]>([]);
  const sqlite = React.useContext(SQLiteContext);
  const [listFilterRemove, setListFilterRemove] = React.useState<
    StockFilterEntity[]
  >([]);
  const modalEditListStockFilter = React.useRef<ModalBaseRefType | null>(null);
  const focus = useIsFocused();

  React.useEffect(() => {
    sqlite.getStockFilters().then(result => {
      if (result) {
        setListFilter(result);
      }
    });
  }, [focus]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Bộ lọc cá nhân',
      headerTitleStyle: {fontSize: 18},
      headerRight: () => (
        <View style={{flexDirection: 'row', gap: 10, paddingRight: 10}}>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => modalEditListStockFilter.current?.show()}>
            <IconEdit height={28} width={28} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => {
              navigation.navigate('CreateFilter', {});
            }}>
            <IconBlackAdd height={30} width={30} />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        borderBottomColor: '#F0F0F0', // Màu sắc của ranh giới
        borderBottomWidth: 1, // Độ dày của ranh giới
      },
    });
  });

  const addItemToRemove = (item: StockFilterEntity) => {
    setListFilterRemove(old => [...old, item]);
  };

  const removeItemToRemove = (item: StockFilterEntity) => {
    setListFilterRemove(pre => pre.filter(i => i !== item));
  };

  const handleEditListStockFilter = () => {
    listFilterRemove.map(item => {
      sqlite.deleteStockFilter(item.id);
      sqlite.removeAllStockFilterCriteriaByStockFilterId(item.id);
    });
    setListFilterRemove([]);
    modalEditListStockFilter.current?.hide();
    sqlite.getStockFilters().then(result => {
      if (result) {
        setListFilter(result);
      }
    });
  };

  return (
    <View style={{flex: 1}}>
      <ModalBase ref={modalEditListStockFilter}>
        <View
          style={{
            alignItems: 'center',
            width: screenWidth * 0.8,
            height: 550,
            paddingVertical: 20,
          }}>
          <View style={{flex: 1, width: '100%', alignItems: 'center', gap: 15}}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 16,
                color: 'black',
              }}>
              Chỉnh sửa danh sách bộ lọc
            </Text>
            <ScrollView
              contentContainerStyle={{
                gap: 10,
                paddingHorizontal: 10,
                paddingBottom: 20,
              }}
              indicatorStyle={'black'}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
              style={{width: '100%'}}>
              {listFilter.map((item, index) => {
                const canRemove = listFilterRemove.find(i => i.id === item.id);
                console.log(canRemove);
                return (
                  <View
                    key={index}
                    style={{
                      height: 50,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 15,
                      borderRadius: 15,
                      // backgroundColor: COLOR.secoundaryColor,
                      justifyContent: 'space-between',
                      borderWidth: 1,
                      borderColor: COLOR.secoundaryColor,
                    }}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>
                      <Text style={{fontSize: 14}}>Tên: </Text>
                      {item.name}
                    </Text>
                    {!canRemove ? (
                      <TouchableOpacity onPress={() => addItemToRemove(item)}>
                        <GarbageIcon width={22} height={22} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => removeItemToRemove(item)}>
                        <RotationIcon width={22} height={22} />
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              onPress={handleEditListStockFilter}
              style={{
                backgroundColor: COLOR.secoundaryColor,
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 15,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', elevation: 1}}>
                Lưu thay đổi
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalBase>
      {listFilter.length > 0 ? (
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Danh sách bộ lọc</Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingTop: 20,
              width: '100%',
              paddingHorizontal: 10,
              gap: 10,
            }}>
            {listFilter.map((item, index) => (
              <FilterItem item={item} key={index} />
            ))}
          </View>
        </>
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              minWidth: 100,
              height: 'auto',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#B8C4FF',
              borderRadius: 5,
              bottom: 50,
              paddingHorizontal: 10,
              paddingVertical: 5,
              gap: 10,
            }}
            onPress={() => {
              navigation.navigate('CreateFilter', {});
            }}>
            <IconAddWhite height={15} width={15} fill={'white'} />
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                marginRight: 5,
                marginVertical: 5,
                fontWeight: 'bold',
              }}>
              Tạo bộ lọc
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default PersonalFilter;

const styles = StyleSheet.create({
  dropdown: {
    height: 28,
    borderColor: 'gray',
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'black',
    width: '40%',
  },
  itemTextDropdown: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 15,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
  },
  selectedTextStyle: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  titleContainer: {
    width: '100%',
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
});
