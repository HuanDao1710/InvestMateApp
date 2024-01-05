import React, {cloneElement} from 'react';
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
import {DataTable, IconButton} from 'react-native-paper';
import IconTime from '../../icons/IconTime';
import IconPersonalFilter from '../../icons/IconPersonalFilter';
import SMG from '../../common/SMG';
import IconSuggestFilter from '../../icons/IconSuggestFilter';
import IconCreateFilter from '../../icons/IconCreateFilter';
import {useNavigation} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const StockFilterScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView>
      <View
        style={{
          width: windowWidth,
          height: 'auto',
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
        }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Lọc cổ phiếu</Text>
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => navigation.navigate('CreateFilter')}>
            <IconCreateFilter style={{width: 55, aspectRatio: 1}} />
            <Text style={{color: 'black', fontSize: 14}}>Tạo bộ lọc</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filter}>
            <IconSuggestFilter style={{width: 55, aspectRatio: 1}} />
            <Text style={{color: 'black', fontSize: 14}}>Bộ lọc gợi ý</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filter}>
            <IconPersonalFilter style={{width: 55, aspectRatio: 1}} />
            <Text style={{color: 'black', fontSize: 14}}>Bộ lọc cá nhân</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingBottom: '15%'}}></View>
    </ScrollView>
  );
};

export default StockFilterScreen;

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
  filterContainer: {
    width: '100%',
    height: 'auto',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    margin: '3%',
  },
  filter: {
    width: 160,
    height: 110,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
});
