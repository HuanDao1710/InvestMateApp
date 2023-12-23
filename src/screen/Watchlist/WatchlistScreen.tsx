import React from 'react';
import {Text, View, StyleSheet, ScrollView, Dimensions, Modal, TouchableOpacity, TouchableHighlight} from 'react-native';
import { DataTable } from 'react-native-paper';
import IconTime from '../../iconSVG/IconTime';
import IconChart from '../../iconSVG/IconChart';
import SMG from '../../common/SMG';
import IconThreeDot from '../../iconSVG/IconThreeDot';
import IconStar from '../../iconSVG/IconStar';
import IconBlackAdd from '../../iconSVG/IconBlackAdd';
import IconEdit from '../../iconSVG/IconEdit';
import { Menu, MenuOptions, MenuTrigger, MenuOption } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export const WatchlistHeader =() => {
    return (
        <View style={{height: "100%", width: "auto", flexDirection: "row", justifyContent:"center", alignItems:"center"}}>
            <TouchableOpacity>
                <IconEdit style={{height: "40%", aspectRatio: 1, margin: "3%"}}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <IconBlackAdd style={{height: "40%", aspectRatio: 1, margin: "7%"}}/>
            </TouchableOpacity>
        </View>
    );
}

const listGroup = [
    {
        id: "group_0",
        name: "Default",
        numItem: 0
    },
    {
        id: "group_1",
        name: "Test",
        numItem: 0
    }
]

interface GroupStockProps {
    id: string,
    name: string,
    numItem: number
}

const renderGroupStock = (item : GroupStockProps) => {
    const navigation = useNavigation<any>();
    const handleViewSubList = () => {
        navigation.navigate("SubList");
    }
    return (
        <TouchableOpacity key={item.id} style={styles.groupStock}
            onPress={handleViewSubList}>
            <View style={styles.groupContent}>
                <IconStar style={{height: "50%", aspectRatio: 1, margin: "5%"}}/>
                <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text style={{color: "black", fontWeight: "700", fontSize: 15}}>{item.name}</Text>
                    <Text style={{color: "black"}}>{item.numItem} Mã CP</Text>
                </View>
            </View>
            <Menu  style={{width:"30%", justifyContent: "center", alignItems: "flex-end", height: "100%"}}>
                <MenuTrigger style={{width: 'auto', height: "100%", justifyContent: "center"}}>
                    <IconThreeDot style={{height: "35%", aspectRatio: 1, margin: "5%", }}/>
                </MenuTrigger>
                <MenuOptions customStyles={{optionsContainer:{borderRadius: 10, width: "30%"}}}>
                    <MenuOption 
                        onSelect={()=>{console.log("do something!")}}>
                        <Text style={{color: "black", fontSize: 14}}>
                            Chỉnh sửa
                        </Text>
                    </MenuOption>
                    <MenuOption 
                        onSelect={()=>{console.log("do something!")}}>
                        <Text style={{color: "black", fontSize: 12}}>
                            Xoá
                        </Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </TouchableOpacity>
    );
}


const WatchlistScreen = () =>{
    return (
        <ScrollView>
            <View style={{width: windowWidth, height: "auto", alignItems: "center", backgroundColor: "#f0f0f0",}}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Danh sách theo dõi
                    </Text>
                    <View/>
                </View>
                <View style={styles.listGroup}>
                    {listGroup.map((item: any)=> renderGroupStock(item))}
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
    listGroup: {
        width: "100%",
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    groupStock: {
        width:"97%",
        height: 65,
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        margin: "1%",
        shadowColor: '#000000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    groupContent: {
        width: "70%", 
        flexDirection: "row", 
        height: "100%", 
        justifyContent: "flex-start", 
        alignItems: "center"
    }
});
