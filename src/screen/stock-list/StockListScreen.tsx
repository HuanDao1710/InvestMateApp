import React from 'react';
import {Text, View, StyleSheet, ScrollView, Dimensions, Modal, TouchableOpacity, TouchableHighlight} from 'react-native';
import { DataTable } from 'react-native-paper';
import IconTime from '../../IconSVG/IconTime';
import IconChart from '../../IconSVG/IconChart';
import SMG from '../../common/SMG';
import IconSmallAdd from '../../IconSVG/IconSmallAdd';
import IconSort from '../../IconSVG/IconSort';
import { Menu, MenuOptions, MenuTrigger, MenuOption } from 'react-native-popup-menu';


const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

interface StockInfoStyle {
    name: string,
    code: string,
    chart: any,
    smg : number,
    price: number,
    changePrice: number,
    changePricePercent: number
}

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

const listStock =[
    {
        name: "Chứng khoán SSI",
        code: "SSI",
        chart: <IconChart style={{height: "90%"}}/>,
        smg : 85,
        price: 28150.0,
        changePrice: 900.0,
        changePricePercent: 0.0328
    },
    {
        name: "Chứng khoán SSI",
        code: "AAA",
        chart: <IconChart style={{height: "90%"}}/>,
        smg : 85,
        price: 28150.0,
        changePrice: -800.0,
        changePricePercent: -0.0328
    }
]

const renderStock = (item : StockInfoStyle) => {

    const colorStyle = item.changePrice >= 0 ? {color: "#059926"} : {color: "#f65959"};
    const textChange = item.changePrice >= 0 ? "+" + item.changePrice + "(" + "+" + (item.changePricePercent * 100).toFixed(2) + "%)"
                                            :  item.changePrice + "(" +  (item.changePricePercent * 100).toFixed(2) + "%)";
    return (
        <TouchableOpacity style={styles.stockItemContainer} key={item.code}
            onPress={()=>{console.log("do something!")}}>
            <View style={styles.stockItemContent}>
                <View style={{width: "35%", height: "100%", justifyContent: "center",}}>
                    <Text style={{color:"black", fontWeight: "600"}}>{item.name}</Text>
                    <Text style={{color:"#646464", fontWeight: "500"}}>Mã CP: {item.code}</Text>
                </View>
                <View style={{width:"20%",  justifyContent: 'center'}}>
                    {item.chart}
                </View>
                <View style={{width:"15%",  justifyContent: 'center', alignItems: 'center'}}>
                    <SMG smg={item.smg} style={{width:"55%", aspectRatio: 1}}/>
                </View>
                <View style={{width:"25%", justifyContent: 'center', alignItems:"flex-end"}}>
                    <Text style={{color:"black", fontSize: 14}}>{item.price}</Text>
                    <Text style={[{fontSize: 12}, colorStyle]}>{textChange}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const ListStockScreen = () =>{
    const [updateTime, setUpdateTime] = React.useState<string>("18/11/2023");
    const [sortOption, setSortOption] = React.useState<string>("highest_RS");
    const [optionSortName, setOptionSortName] = React.useState<string>("");
    React.useEffect (()=>{
        const name = listSortOption.find(item => item.code===sortOption)?.name
        setOptionSortName(name? name : "");
    }, [sortOption])


    const handleSelectSortOption = (item :  any) => {
        setSortOption(item.code);
        //do sth
    }

    return (
        <ScrollView >
            <View style={{width: windowWidth, height: "auto", alignItems: "center", backgroundColor: "#f0f0f0",}}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Danh sách mã cổ phiếu
                    </Text>
                    <Text style={styles.updateTime}>
                        Ngày cập nhật: {updateTime}
                    </Text>
                </View>
                <View style={styles.sortSettingContainer}>
                    <Text style={{color: "#5E5E5E", fontSize: 14, fontWeight: "700"}}>Sắp xếp theo: {optionSortName}</Text>
                    <Menu>
                        <MenuTrigger>
                            <IconSort style={{width: 42, aspectRatio: 1}}/>
                        </MenuTrigger>
                        <MenuOptions customStyles={{optionsContainer:{borderRadius: 10, }}}>
                            {listSortOption.map((item) => (
                                <MenuOption key={item.code}
                                    onSelect={()=>{handleSelectSortOption(item)}}>
                                    <Text style={{color: "black", fontSize: 14}}>
                                        {item.name}
                                    </Text>
                                </MenuOption>
                            ))}
                        </MenuOptions>
                    </Menu>
                </View>
                <View style={styles.listStock}>
                    {listStock.map((item: StockInfoStyle) => renderStock(item))}
                </View>
            </View>
            <View style={{paddingBottom : "15%",}}></View>
        </ScrollView>
    )
}

export default ListStockScreen;

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
    sortSettingContainer: {
        height: windowHeight * 0.04,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "95%",
    },
    listStock: {
        width: "100%",
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        margin: "2%"
    },
    stockItemContainer: {
        width: "97%",
        height: 56,
        borderRadius: 15,
        backgroundColor:"#FFFFFF",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 3
    },
    stockItemContent: {
        justifyContent:"center", 
        alignItems: 'center', 
        height: "100%", 
        width: "97%", 
        flexDirection: 'row'
    }
});
