import React from "react";
import {View, StyleSheet, Text, TextInput, SafeAreaView, Touchable, TouchableOpacity} from 'react-native';
import IconMicro from "../IconSVG/IconMicro";
import IconSearch from "../IconSVG/IconSearch";


const SearceBar = () => {

    const [text, setText] = React.useState('');

    const handleTextChange = (inputText: string) => {
        setText(inputText);
        console.log("Text Change!");
    }

    return (
    <View style={styles.container}>
        <View style={styles.subContainer}>
            <IconSearch style={{width: "9%", aspectRatio: 1, marginRight: "5%"}}/>      
            <TextInput
                style={styles.input}
                onChangeText={handleTextChange}
                value={text}
                placeholder="Tìm kiếm..."
                placeholderTextColor={"#7D7C7C"}
                cursorColor="black"
            ></TextInput>
            <TouchableOpacity 
                style={{width: "9%", aspectRatio: 1, position: "absolute", right: 0,}}
                onPress={()=> {console.log("mic pressed!")}}>
                <IconMicro style={{width: "100%", aspectRatio: 1,}}/>
            </TouchableOpacity>   
        </View>
    </View>
    )
}

export default SearceBar;

const styles = StyleSheet.create({
    container: {
        width: "95%", 
        height: "65%", 
        right: "5%", 
        borderRadius: 100, 
        alignItems: "center",
        backgroundColor: "#D5D5D5",
        justifyContent: "center"
    },
    subContainer: {
        width: "88%", 
        borderBottomWidth: 1, 
        height: "70%", 
        alignItems:"center",
        flexDirection:"row",
    },
    input: {
        height: 100,
        width: "90%",
        color: "#000000",
        position: "absolute",
        left: 0,
        padding: 30,
        flexDirection: "column"
    },

})
