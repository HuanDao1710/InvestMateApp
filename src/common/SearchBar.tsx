import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import IconMicro from '../icons/IconMicro';
import IconSearch from '../icons/IconSearch';

const SearceBar = (props: {
  enable?: boolean;
  style?: ViewStyle;
  handleTextChange?: any;
}) => {
  const navigation = useNavigation<any>();
  const [text, setText] = React.useState('');
  const handleTextChange = (inputText: string) => {
    props.handleTextChange(inputText);
  };

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.subContainer}>
        <IconSearch
          style={{height: '90%', aspectRatio: 1, marginRight: '5%'}}
        />
        <TextInput
          style={styles.input}
          onChangeText={setText}
          onBlur={() => handleTextChange(text)}
          value={text}
          editable={props.enable ? props.enable : false}
          placeholder="Tìm kiếm..."
          placeholderTextColor={'#7D7C7C'}
          cursorColor="black"
          autoFocus={props.enable ? props.enable : false}
        />
        <TouchableOpacity
          style={{
            height: '90%',
            aspectRatio: 1,
            position: 'absolute',
            right: 0,
          }}
          onPress={() => {
            console.log('mic pressed!');
          }}>
          <IconMicro style={{width: '100%', aspectRatio: 1}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearceBar;

const styles = StyleSheet.create({
  container: {
    width: '85%',
    height: '60%',
    right: '5%',
    borderRadius: 100,
    alignItems: 'center',
    backgroundColor: '#D5D5D5',
    justifyContent: 'center',
  },
  subContainer: {
    width: '88%',
    borderBottomWidth: 1,
    borderColor: 'grey',
    height: '70%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    height: 100,
    width: '90%',
    color: '#000000',
    position: 'absolute',
    left: 0,
    padding: 30,
    flexDirection: 'column',
  },
});
