import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FilterIcon from '../../icons/FilterIcon';
import {COLOR} from '../../constants';
import ArrowRoundIcon from '../../icons/ArrowRoundIcon';
import IconStar from '../../icons/IconStar';


const FilterItem = () => {
  const [expanded, setExpanded] = React.useState(false);
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
        onPress={() => console.log('do something!')}>
        <View style={{gap: 15, flexDirection: 'row', alignItems: 'center'}}>
          <FilterIcon height={35} width={35} fill={COLOR.secoundaryColor} />
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
            Xoay chuyển tình thế
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
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <IconStar style={{width: 15, aspectRatio: 1}} />
            <Text style={{color: 'black', fontSize: 14}}>
              Vốn hóa thị trường
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <IconStar style={{width: 15, aspectRatio: 1}} />
            <Text style={{color: 'black', fontSize: 14}}>
              Lợi nhuận sau thuế {`quý gần nhất`}
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <IconStar style={{width: 15, aspectRatio: 1}} />
            <Text style={{color: 'black', fontSize: 14}}>
              Lợi nhuận sau thuế {`năm gần nhất`}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const SuggestFilter = () => {
  const navigation = useNavigation<any>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Bộ lọc gợi ý',
      headerTitleStyle: {fontSize: 18},
      headerStyle: {
        borderBottomColor: '#F0F0F0', // Màu sắc của ranh giới
        borderBottomWidth: 1, // Độ dày của ranh giới
      },
    });
  });

  return (
    <View style={{flex: 1, paddingTop: 10}}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Danh sách bộ lọc</Text>
      </View>
      <View
        style={{
          flex: 1,
          paddingTop: 20,
          width: '100%',
          paddingHorizontal: 10,
        }}>
        <FilterItem />
      </View>
    </View>
  );
};
export default SuggestFilter;

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
