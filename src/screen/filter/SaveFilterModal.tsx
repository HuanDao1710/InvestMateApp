import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SaveFilterModal = (props: {
  onSave: (name: string) => void;
  onClose: () => void;
}) => {
  const [text, setText] = React.useState('');
  const handleTextChange = (inputText: string) => {
    setText(inputText);
  };
  return (
    <View style={{flex: 1, gap: 10}}>
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Text style={{color: 'black', fontWeight: '600', fontSize: 18}}>
              Lưu bộ lọc
            </Text>
          </View>
          <View style={styles.messageContainer}>
            <View style={{flex: 1}}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
                Tên bộ lọc:
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleTextChange}
                value={text}
                placeholder="Nhập tên"
                placeholderTextColor={'#7D7C7C'}
                cursorColor="black"
              />
            </View>
          </View>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={[styles.buttonOption, {backgroundColor: '#e6544e'}]}
              onPress={props.onClose}>
              <Text style={styles.textOption}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonOption, {backgroundColor: '#81b0ff'}]}
              onPress={() => {
                props.onSave(text);
              }}>
              <Text style={styles.textOption}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SaveFilterModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    height: 220,
    width: 350,
  },
  titleContainer: {
    height: '20%',
  },
  messageContainer: {
    height: '60%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  optionContainer: {
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
  },
  buttonOption: {
    borderRadius: 20,
    minWidth: 80,
  },
  textOption: {
    fontSize: 14,
    fontWeight: '500',
    margin: 6,
    textAlign: 'center',
    minWidth: 70,
    color: 'white',
  },
  input: {
    height: 50,
    margin: 5,
    color: '#000000',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#DFDFDF',
  },
});
