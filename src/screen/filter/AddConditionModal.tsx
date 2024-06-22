import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CriteriaType, StockFilterCriteria} from '../../type';
import CloseIcon from '../../icons/CloseIcon';
import CloseIcon2 from '../../icons/CloseIcon2';
import {
  COLOR,
  basicFilterCriteriaList,
  growthCriteriaList,
  priceVolumeCriteriaList,
} from '../../constants';
import IconGreyV from '../../icons/IconGeyV';
import IconGreyAdd from '../../icons/IconGreyAdd';

interface AddConditionModalProps {
  addItem: (item: StockFilterCriteria) => void;
  removeItem: (item: StockFilterCriteria) => void;
  criteriaList: CriteriaType[];
  onClose: () => void;
}

const AddConditionModal = (props: AddConditionModalProps) => {
  const [filterList, setFilterList] = React.useState(0);

  const checkAlreadyExit = (item: StockFilterCriteria): boolean => {
    const re = props.criteriaList.find(i => i.key === item.key);
    return re != undefined;
  };

  const RenderItem = (props2: {
    item: StockFilterCriteria;
    isExist: boolean;
  }) => {
    const {item, isExist} = props2;
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: '#EAEAEA',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{color: 'gray', fontWeight: '500', marginHorizontal: 15}}>
            {item.name}
          </Text>
        </View>
        <View
          style={{height: '60%', borderLeftWidth: 1, borderColor: '#DADADA'}}
        />
        <View style={{height: 40, backgroundColor: '#FBFBFB', aspectRatio: 1}}>
          {isExist ? (
            <TouchableOpacity
              style={{
                width: 40,
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => props.removeItem(item)}>
              <IconGreyV
                style={{height: 20, aspectRatio: 1}}
                fill={COLOR.secoundaryColor}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{width: 40, aspectRatio: 1, justifyContent: 'center'}}
              onPress={() => props.addItem(item)}>
              <IconGreyAdd style={{height: 15}} fill={COLOR.secoundaryColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: '100%',
      }}>
      <TouchableOpacity
        style={{height: '10%', width: '100%'}}
        onPress={() => props.onClose()}
      />
      <View
        onTouchEnd={e => e.stopPropagation()}
        style={{
          width: '100%',
          paddingHorizontal: 10,
          backgroundColor: '#fff',
          borderRadius: 10,
          gap: 20,
          paddingVertical: 15,
          flex: 1,
        }}>
        <TouchableOpacity
          style={{position: 'absolute', top: 10, right: 10}}
          onPress={props.onClose}>
          <CloseIcon2 height={25} width={25} />
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
            Chọn tiêu chí
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            height: 45,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: '#CDCDCD',
            borderTopWidth: 1,
            paddingVertical: 5,
            paddingHorizontal: 5,
            // borderWidth: 1,
          }}>
          <TouchableOpacity
            style={{
              height: '100%',
              flex: 1 / 3,
              justifyContent: 'center',
              alignItems: 'center',
              // borderWidth: 1,
              backgroundColor:
                filterList == 0 ? COLOR.secoundaryColor : 'white',
              borderRadius: 15,
            }}
            onPress={() => setFilterList(0)}>
            <Text style={{color: 'black'}}>Cơ bản</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '100%',
              flex: 1 / 3,
              justifyContent: 'center',
              alignItems: 'center',
              // borderWidth: 1,
              backgroundColor:
                filterList == 1 ? COLOR.secoundaryColor : 'white',
              borderRadius: 15,
            }}
            onPress={() => setFilterList(1)}>
            <Text style={{color: 'black'}}>Biến động</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '100%',
              flex: 1 / 3,
              justifyContent: 'center',
              alignItems: 'center',
              // borderWidth: 1,
              backgroundColor:
                filterList == 2 ? COLOR.secoundaryColor : 'white',
              borderRadius: 15,
            }}
            onPress={() => setFilterList(2)}>
            <Text style={{color: 'black'}}>Tăng trưởng</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{flex: 1}}>
          {filterList === 0 &&
            basicFilterCriteriaList.map((item, index) => (
              <RenderItem
                key={index}
                isExist={checkAlreadyExit(item)}
                item={item}
              />
            ))}
          {filterList === 1 &&
            priceVolumeCriteriaList.map((item, index) => (
              <RenderItem
                key={index}
                isExist={checkAlreadyExit(item)}
                item={item}
              />
            ))}
          {filterList === 2 &&
            growthCriteriaList.map((item, index) => (
              <RenderItem
                key={index}
                isExist={checkAlreadyExit(item)}
                item={item}
              />
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default AddConditionModal;

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
  //   modalContent: {
  //     backgroundColor: '#DADADA',
  //     borderRadius: 10,
  //     alignItems: 'center',
  //     width: screenWidth - 30,
  //     height: screenHeight * 0.7,
  //   },
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
