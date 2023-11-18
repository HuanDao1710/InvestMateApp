import React from 'react';
import {Text, View, StyleSheet, ScrollView, Dimensions} from 'react-native';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;


const HomeScreen = () =>{
    const [updateTime, setUpdateTime] = React.useState<String>("18/11/2023");
    return (
        <ScrollView>
            <View style={{width: windowWidth, height: windowHeight, alignItems: "center",}}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Tổng quan
                    </Text>
                    <Text style={styles.updateTime}>
                        Ngày cập nhật: {updateTime}
                    </Text>
                </View>
                <View style={styles.index}>

                </View>
                <View style={styles.topStock}>

                </View>
            </View>
        </ScrollView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    titleContainer: {
        width: "100%", 
        height: "5%", 
        justifyContent:"space-between", 
        alignItems: "center", 
        flexDirection: "row"
    },
    title: {
        fontSize: 15, 
        color: "black", 
        fontWeight: "700", 
        marginLeft: 10, 
        fontFamily: "Roboto", 
        borderBottomWidth: 1
    },
    updateTime: {
        marginRight: 10,
        color: "black",
        fontSize: 10,
        bottom: -5,
    },
    index: {
        backgroundColor: "white",
        width: "100%",
        height: "30%",
        margin: "1%",
        borderRadius: 20,
    },
    topStock : {
        backgroundColor: "white",
        width: "100%",
        height: "60%",
        margin: "1%",
        borderRadius: 20,
    }
});


