import React from 'react';
import {Text, View, StyleSheet, ScrollView, Dimensions, Modal, TouchableOpacity, TouchableHighlight} from 'react-native';
import { DataTable } from 'react-native-paper';
import IconTime from '../../IconSVG/IconTime';
import IconChart from '../../IconSVG/IconChart';
import SMG from '../../common/SMG';
import IconSmallAdd from '../../IconSVG/IconSmallAdd';
import IconSort from '../../IconSVG/IconSort';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;


const StockFilterScreen = () =>{
    const [updateTime, setUpdateTime] = React.useState<string>("18/11/2023");
    
    return (
        <ScrollView>
            <View style={{width: windowWidth, height: "auto", alignItems: "center", backgroundColor: "#f0f0f0",}}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Danh sách mã cổ phiếu
                    </Text>
                    <Text style={styles.updateTime}>
                        Ngày cập nhật: {updateTime}
                    </Text>
                </View>
            </View>
            <View style={{paddingBottom : "15%"}}></View>
        </ScrollView>
    )
}

export default StockFilterScreen;

const styles = StyleSheet.create({
    titleContainer: {
        width: "100%", 
        height: windowHeight * 0.05, 
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
});
