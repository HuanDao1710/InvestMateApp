import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import {View, Text, Dimensions, ScrollView, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SMG from '../../common/SMG';
import IconAddWhite from '../../iconSVG/IconAddWhite';
import { ParamList } from '../../type';
import { convertEpochToDateString, formatPrice, getColorPrice, getTextChangePrice } from '../../utils/utils';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const StockOverview = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<ParamList>>();
    const {item} = route.params;
    console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBb")

    useLayoutEffect(() => {
        navigation.setOptions({ 
            title: "Tổng quan"
        });
    })

    const handleViewComapnyInfor = () => {
        navigation.navigate('CompanyInfo');
    }

    const handleViewLargeShareHolder = () => {
        navigation.navigate('ListLargeShareHolder');
    }

    return (
        <View style={{width: "100%", height: "100%",}}>
            <ScrollView>
                <View>
                    <Text style={{fontSize: 10, color: "grey", position:"absolute", right: 0, margin: 6}}>
                        Ngày cập nhật: {convertEpochToDateString(item.time)}
                    </Text>
                </View>
                <View style={{width: "100%", height: 220, marginTop: 28, flexDirection:"row", backgroundColor: "white"}}>
                    <View style={{width: "80%", height: "100%",  marginLeft: 10}}>
                        <View style={{height: "15%", width: "100%", marginLeft: 10}}>
                            <Text style={{color:"grey", fontWeight: "600", fontSize: 16}}>
                                Mã CP: <Text style={{color:"black", fontWeight: "600", fontSize: 18}}>{item.code}</Text>
                            </Text>
                        </View>
                        <View style={{height: "60%", width: "100%",  justifyContent:"center", alignItems:"center"}}>
                            <View style={{width:"80%", height: "100%", borderWidth: 1, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{fontSize: 20, color: "grey", fontWeight: "600"}}>Chart</Text>
                            </View>
                        </View>
                        <View style={{height: "25%", width: "100%",  flexDirection:"row", alignItems: "flex-end", justifyContent: "space-between"}}>
                            <View style={{backgroundColor: "#D7D7D7", height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 5, margin: 6}}>
                                <Text style={{color: "black", fontWeight: "500", marginHorizontal: 8, fontSize: 12}}>
                                    {item.exchange}
                                </Text>
                            </View>
                            <View style={{height: '100%', marginRight: 10, justifyContent: "flex-end", marginBottom: 6}}>
                                <Text style={[{color: "black", fontWeight: "500", fontSize: 12}, getColorPrice(item.changePrice)]}>
                                    {getTextChangePrice(item.changePrice, item.changePricePercent)}
                                </Text>
                                <Text style={[{color: "black", fontSize: 18, fontWeight: '600'}, getColorPrice(item.changePrice)]}>
                                    {formatPrice(item.price)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{width: "20%", height: "100%", alignItems:"flex-start", justifyContent: "space-between",}}>
                        <View style={{margin: 10}}>
                            <SMG smg={85} style={{width: 45, aspectRatio: 1}}/>
                        </View>
                        <TouchableOpacity style={{width: 45, height: 20, borderRadius: 20, backgroundColor: "blue", padding: 3, margin: 8}}>
                            <IconAddWhite />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width: "100%", height: 50, flexDirection: "row", justifyContent: 'space-around', alignItems: "center", }}>
                    <TouchableOpacity style={styles.btnInforComapany}
                        onPress={handleViewComapnyInfor}>
                        <Text style={{color: "black", }}>Thông tin công ty</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnInforComapany}
                        onPress={handleViewLargeShareHolder}>
                        <Text style={{color: "black", }}>Danh sách cổ đông lớn</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: "100%", backgroundColor: "white", height: "auto", paddingBottom: 30, alignItems: "center"}}>
                    <View style={{width: "100%"}}>
                        <Text style={{color: "black", fontWeight: "500", margin: 10, fontSize: 16}}>Số liệu thống kê chính</Text>
                    </View>
                    <View style={styles.basicParamContainer}>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>                        
                    </View>
                    <View style={styles.basicParamContainer}>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>                        
                    </View>
                    <View style={styles.basicParamContainer}>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>                        
                    </View>
                    <View style={styles.basicParamContainer}>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>                        
                    </View>
                    <View style={styles.basicParamContainer}>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>                        
                    </View>
                    <View style={styles.basicParamContainer}>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>                        
                    </View>
                    <View style={styles.basicParamContainer}>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>                        
                    </View>
                    <View style={styles.basicParamContainer}>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>                        
                    </View>
                    <View style={styles.basicParamContainer}>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>                        
                    </View>
                    <View style={styles.basicParamContainer}>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>                        
                    </View>
                    <View style={styles.basicParamContainer}>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>
                        <Text style={styles.txtBasicParam}>Biên độ ngày</Text>                        
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default StockOverview;


const styles = StyleSheet.create({
    btnInforComapany: {
        width: windowWidth * 0.45, 
        height: "70%", 
        backgroundColor:"white", 
        alignItems: 'center', 
        justifyContent: "center",
        elevation: 1,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "grey",
    },
    basicParamContainer: {
        width: "95%", 
        borderBottomWidth: 1, 
        height: 50,
        justifyContent:"space-between",
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#999999"
    },
    txtBasicParam : {
        color: "black",
        fontSize: 14,
        fontWeight: '500',
    }
});