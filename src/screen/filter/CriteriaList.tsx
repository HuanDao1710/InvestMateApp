import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import IconBlackAdd from '../../icons/IconBlackAdd';
import IconLeft from '../../icons/IconLeft';

interface DiscreteValue {
  lable: string;
  action: any;
}

interface ContinuousValue {
  lable: string;
  action: any;
}

const Item = (props: {item?: ContinuousValue | DiscreteValue}) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 60,
        borderWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Text
        style={{
          fontSize: 17,
          fontWeight: '600',
          marginHorizontal: 15,
          color: 'black',
        }}>
        Tỉ số P/E
      </Text>
      <View>
        <IconBlackAdd
          style={{height: '35%', aspectRatio: 1, marginHorizontal: 15}}
        />
      </View>
    </TouchableOpacity>
  );
};

const CriteriaList = () => {
  const navigation = useNavigation<any>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Thêm tiêu chí',
    });
  }, []);

  return (
    <View>
      <Item />
    </View>
  );
};

export default CriteriaList;
