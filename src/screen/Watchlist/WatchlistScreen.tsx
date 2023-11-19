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

const listSortOption = [
    {
        code: "highest_RS",
        name: "SMG cao nhất"
    },
    {
        code: "lowest_RS",
        name: "SMG thấp nhất"
    },
    {
        code: "most_active",
        name: "Hoạt động mạnh nhất"
    },
    {
        code: "strongest_point_increase",
        name: "Tăng điểm mạnh nhất"
    },
    {
        code: "strongest_point_reduction",
        name: "Giảm điểm mạnh nhất"
    },
    {
        code: "52-week_high",
        name: "Mức đỉnh 52 tuần"
    },
    {
        code: "52-week_low",
        name: "Mức đáy 52 tuần"
    },
]

const WatchlistScreen = () =>{
    const [updateTime, setUpdateTime] = React.useState<string>("18/11/2023");
    const [sortOption, setSortOption] = React.useState<string>("highest_RS");
    const [optionSortName, setOptionSortName] = React.useState<string>("");
    React.useEffect (()=>{
        const name = listSortOption.find(item => item.code===sortOption)?.name
        setOptionSortName(name? name : "");
    }, [sortOption])
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

export default WatchlistScreen;

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
