import {useNavigation} from '@react-navigation/native';
import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import IconSave from '../../icons/IconSave';
import {ScrollView} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {CriteriaType, Industry, StockFilterCriteria} from '../../type';
import {COLOR, ROOT_PATH} from '../../constants';
import {API_CORE} from '../../api';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import IconGreyX from '../../icons/IconGeyX';
import {ModalBaseRefType} from '../../common/ModalBase';
import ModalBaseSlide from '../../common/ModalBaseSlide';
import AddConditionModal from './AddConditionModal';
import SQLiteContext from '../../sqlite/SQLContext';
import SaveFilterModal from './SaveFilterModal';

const exchangeData = [
  {exchange: 'Tất cả sản', exchangeId: ''},
  {exchange: 'HOSE', exchangeId: 'HOSE'},
  {exchange: 'HNX', exchangeId: 'HNX'},
  {exchange: 'UPCOME', exchangeId: 'UPCOM'},
];

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

function formatNumber(number: number) {
  if (number >= 1000000 || number < -1000000) {
    return (number / 1000000).toFixed(2) + 'M';
  }
  if (number >= 1000 || number < -1000) {
    return (number / 1000).toFixed(2) + 'K';
  }
  return number.toFixed(2);
}

const CriteriaItem = (props: {
  item: CriteriaType;
  removeSelf: (item: CriteriaType) => void;
  updateItem: (item: CriteriaType, value1: number, value2: number) => void;
}) => {
  const minValue = props.item.minValue;
  const maxValue = props.item.maxValue;
  const step = (maxValue - minValue) / 200;
  const [values, setValues] = useState([
    (props.item.currentMinValue - minValue) / step,
    (props.item.currentMaxValue - minValue) / step,
  ]);

  const calculateRealValue = (value: number) => {
    return value * step + minValue;
  };

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#DADADA',
        paddingVertical: 5,
        flexDirection: 'row',
        paddingHorizontal: 10,
      }}
      key={props.item.key}>
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', textAlign: 'center', fontSize: 12}}>
            {props.item.name}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            // borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'right',
              color: 'black',
              width: 50,
              fontSize: 12,
            }}>
            {formatNumber(calculateRealValue(values[0]))}
          </Text>
          <MultiSlider
            values={values}
            sliderLength={200}
            onValuesChange={val => setValues(val)}
            onValuesChangeFinish={val =>
              props.updateItem(
                props.item,
                calculateRealValue(val[0]),
                calculateRealValue(val[1]),
              )
            }
            min={0}
            max={200}
            step={1}
            selectedStyle={{
              backgroundColor: '#B8C4FF',
            }}
            // unselectedStyle={{
            //   backgroundColor: '#ecf0f1',
            // }}
            markerStyle={{
              height: 20,
              width: 20,
              backgroundColor: '#B8C4FF',
            }}
          />

          <Text
            style={{
              textAlign: 'left',
              color: 'black',
              width: 50,
              fontSize: 12,
            }}>
            {formatNumber(calculateRealValue(values[1]))}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          height: 22,
          aspectRatio: 1,
          margin: 10,
          backgroundColor: '#D1D2D3',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        }}
        onPress={() => props.removeSelf(props.item)}>
        <IconGreyX style={{width: '30%', aspectRatio: 1}} />
      </TouchableOpacity>
    </View>
  );
};

// const ModalAddCondition = (props: {
//   isModalVisible: boolean;
//   toggleModal: any;
//   smallList: any[];
//   addItem: any;
//   removeItem: any;
//   criteriaList: CriteriaType[];
// }) => {
//   const {
//     isModalVisible,
//     toggleModal,
//     smallList,
//     addItem,
//     removeItem,
//     criteriaList,
//   } = props;

//   const isAlreadyExist = (item: CriteriaType) => {
//     return smallList.some(i => i.name === item.name);
//   };

//   const RenderItem = (item: any, index: any) => {
//     const isExst = isAlreadyExist(item);
//     return (
//       <View
//         key={index}
//         style={{
//           borderBottomWidth: 1,
//           borderColor: '#EAEAEA',
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}>
//         <View style={{flex: 1, justifyContent: 'center'}}>
//           <Text
//             style={{color: 'gray', fontWeight: '500', marginHorizontal: 15}}>
//             {item.name}
//           </Text>
//         </View>
//         <View
//           style={{height: '60%', borderLeftWidth: 1, borderColor: '#DADADA'}}
//         />
//         <View style={{height: 40, backgroundColor: '#FBFBFB', aspectRatio: 1}}>
//           {isExst ? (
//             <TouchableOpacity
//               style={{
//                 width: 40,
//                 aspectRatio: 1,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//               onPress={() => removeItem(item)}>
//               <IconGreyV style={{height: 20, aspectRatio: 1}} />
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity
//               style={{width: 40, aspectRatio: 1, justifyContent: 'center'}}
//               onPress={() => addItem(item)}>
//               <IconGreyAdd style={{height: 15}} />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     );
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={isModalVisible}
//       onRequestClose={toggleModal}>
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <View
//             style={{
//               height: 55,
//               justifyContent: 'center',
//               alignItems: 'center',
//               width: '100%',
//               borderBottomWidth: 0.5,
//               borderBottomColor: '#DADADA',
//               backgroundColor: '#F1F1F1',
//             }}>
//             <Text style={styles.modalText}>Thêm tiêu chí</Text>
//             <TouchableOpacity
//               style={{
//                 position: 'absolute',
//                 right: 5,
//                 aspectRatio: 1,
//                 height: 25,
//                 borderRadius: 100,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 top: 10,
//                 backgroundColor: '#DADADA',
//               }}
//               onPress={toggleModal}>
//               <IconGreyX style={{width: 12, aspectRatio: 1}} />
//             </TouchableOpacity>
//           </View>
//           <View
//             style={{
//               width: '100%',
//               height: screenHeight * 0.7 - 75,
//               backgroundColor: 'white',
//             }}>
//             <FlatList
//               data={criteriaList}
//               renderItem={({item, index}) => RenderItem(item, index)}
//               extraData={criteriaList}
//             />
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

const CreateFilter = () => {
  const navigation = useNavigation<any>();
  const [criteriaList, setCriteriaList] = useState<CriteriaType[]>([]);
  const [listIndustry, setListIndustry] = React.useState<Industry[]>([
    {industry: 'Tất cả ngành', industryId: ''},
  ]);
  const [currentExchange, setCurrentExchange] = React.useState({
    exchange: 'Tất cả sàn',
    exchangeId: '',
  });
  const [currentIndustry, setCurrentIndustry] = React.useState({
    industry: 'Tất cả ngành',
    industryId: '',
  });
  // const [loading, setLoading] = React.useState(false);
  const addConditionModalRef = React.useRef<ModalBaseRefType | null>(null);
  const DataCriteriaFilterRef = React.useRef<CriteriaType[]>([]);
  const sqlite = useContext(SQLiteContext);
  const modalSaveFilterRef = React.useRef<null | ModalBaseRefType>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Sàng lọc cổ phiếu',
      headerTitleStyle: {fontSize: 18},
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{margin: 15}}
            onPress={() => modalSaveFilterRef.current?.show()}>
            <IconSave style={{height: 23, aspectRatio: 1}} />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        borderBottomColor: '#F0F0F0', // Màu sắc của ranh giới
        borderBottomWidth: 1, // Độ dày của ranh giới
      },
    });
  });

  const getListIndustry = async () => {
    try {
      const res = await API_CORE.get<any>(
        `${ROOT_PATH}/invest_mate/api/stock_list/list_industry`,
      );
      if (res.status === 200) {
        setListIndustry([{industry: 'Tất cả', industryId: ''}, ...res.data]);
      } else {
        console.log('FETCH FAIL! Status Code: ' + res.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getListCriteria = async () => {
    try {
      const res = await API_CORE.get<CriteriaType[]>(
        `${ROOT_PATH}/invest_mate/api/stock_filter/list_criteria`,
      );
      if (res.status === 200) {
        // console.log(res.data);
        // setCriteriaList(res.data);
        DataCriteriaFilterRef.current = res.data;
        // setSmallList(res.data.slice(0, 3));
      } else {
        console.log('FETCH FAIL! Status Code: ' + res.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    // setLoading(true)
  };

  const addItem = (rawItem: StockFilterCriteria) => {
    const item = DataCriteriaFilterRef.current.find(i => i.key === rawItem.key);
    if (item) {
      setCriteriaList([...criteriaList, item]);
    }
  };

  const removeItem = (item: StockFilterCriteria) => {
    setCriteriaList(criteriaList.filter(i => i.name !== item.name));
  };

  const udpateValueItem = (
    item: CriteriaType,
    value1: number,
    value2: number,
  ) => {
    setCriteriaList(
      criteriaList.map(i => {
        if (i.name === item.name) {
          return {...i, currentMinValue: value1, currentMaxValue: value2};
        }
        return i;
      }),
    );
  };

  const hanldeCreatePersonalFilter = async (name: string) => {
    try {
      const result = await sqlite.addStockFilter(name);
      if (result !== null) {
        criteriaList.map(item => {
          sqlite.addStockFilterCriteria(result.insertId, item.key, item.name);
        });
      }
      modalSaveFilterRef.current?.hide();
      ToastAndroid.show('Thành công', ToastAndroid.SHORT);
    } catch {
      ToastAndroid.show('Lưu thất bại', ToastAndroid.SHORT);
    }
  };

  React.useEffect(() => {
    getListIndustry();
    getListCriteria();
  }, []);

  const handleFilter = () => {
    const item = {
      exchange: currentExchange.exchangeId,
      industry: currentIndustry.industryId,
      conditions: criteriaList,
    };
    navigation.navigate('FilterResults', {item});
  };

  return (
    <View style={{flex: 1}}>
      <ModalBaseSlide
        ref={addConditionModalRef}
        showClose
        animationType="slide">
        <AddConditionModal
          onClose={() => addConditionModalRef.current?.hide()}
          addItem={addItem}
          removeItem={removeItem}
          criteriaList={criteriaList}
        />
      </ModalBaseSlide>
      <ModalBaseSlide ref={modalSaveFilterRef} animationType="slide">
        <SaveFilterModal
          onSave={hanldeCreatePersonalFilter}
          onClose={() => modalSaveFilterRef.current?.hide()}
        />
      </ModalBaseSlide>
      <View style={{flex: 1, paddingBottom: 100}}>
        <ScrollView style={{}} contentContainerStyle={{paddingBottom: 50}}>
          <View
            style={{
              width: '100%',
              height: 50,
              borderBottomWidth: 0.5,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderColor: '#DADADA',
            }}>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={styles.itemTextDropdown}
              iconStyle={styles.iconStyle}
              data={exchangeData}
              search
              maxHeight={300}
              labelField="exchange"
              valueField="exchangeId"
              placeholder={'Tất cả sàn'}
              searchPlaceholder="Search..."
              value={'abc'}
              onChange={setCurrentExchange}
            />
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={styles.itemTextDropdown}
              iconStyle={styles.iconStyle}
              data={listIndustry}
              search
              maxHeight={300}
              labelField="industry"
              valueField="industryId"
              placeholder={'Tất cả ngành'}
              searchPlaceholder="Search..."
              value={'abc'}
              onChange={setCurrentIndustry}
            />
          </View>
          <View style={{width: '100%', height: 'auto', alignItems: 'center'}}>
            {criteriaList.map((item, index) => (
              <CriteriaItem
                key={index}
                item={item}
                updateItem={udpateValueItem}
                removeSelf={removeItem}
              />
            ))}

            <TouchableOpacity
              style={{
                height: 40,
                width: '90%',
                borderWidth: 1,
                marginTop: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: COLOR.secoundaryColor,
              }}
              onPress={() => addConditionModalRef.current?.show()}>
              <Text style={{color: COLOR.secoundaryColor}}>+Thêm tiêu chí</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,
          bottom: 0,
          position: 'absolute',
          backgroundColor: 'white',
          elevation: 1,
        }}>
        <TouchableOpacity
          style={{
            width: '60%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#B8C4FF',
            elevation: 1,
            borderRadius: 10,
          }}
          onPress={handleFilter}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
            Hiển thị kết quả
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CreateFilter;

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
  modalContent: {
    backgroundColor: '#DADADA',
    borderRadius: 10,
    alignItems: 'center',
    width: screenWidth - 30,
    height: screenHeight * 0.7,
  },
  modalText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '800',
  },
  modalButton: {
    backgroundColor: '#c24f44',
    padding: 5,
    width: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    zIndex: 1000,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
