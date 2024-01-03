import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import {ScrollView, Text, View, TouchableOpacity, StyleSheet} from 'react-native';

enum ViewModeType{
    CHART = 1,
    DATA = 2
}

const StockAnanlysis = () => {
    const navigation = useNavigation<any>();
    const [viewMode, setViewMode] = useState<ViewModeType>(ViewModeType.CHART);

    useLayoutEffect(() => {
        navigation.setOptions({ title: 'Phân tích'});
    })

    const handleModeChart = () => {
        setViewMode(ViewModeType.CHART)
    }

    const handleModeData = () => {
        setViewMode(ViewModeType.DATA)
    }


    return (
        <View style={{width: "100%", height: "100%",}}>
            <ScrollView>
                <View>
                    <Text style={{fontSize: 10, color: "grey", position:"absolute", right: 0, margin: 6}}>
                        Ngày cập nhật: 10/11/2023
                    </Text>
                </View>
                <View style={{width: "100%", marginTop: 20, alignItems: "center" , paddingBottom: 30}}>
                    <View style={{width: "90%", }}>
                        <View style={{flexDirection:"row", height: 40, width: 150, backgroundColor:"white", borderRadius: 50, elevation: 2, overflow: "hidden", marginBottom: 10}}>
                            <TouchableOpacity style={[styles.btnObtions, viewMode === ViewModeType.CHART&&{backgroundColor: "#A6C4FF"}]}
                                onPress={handleModeChart}>
                                <Text style={styles.txtOptions}>Biểu đồ</Text>
                            </TouchableOpacity>
                            <View style={{borderLeftWidth: 1, borderColor: "#9F9F9F", height: "100%"}}/>
                            <TouchableOpacity style={[styles.btnObtions, viewMode === ViewModeType.DATA&&{backgroundColor: "#A6C4FF"}]}
                                onPress={handleModeData}>
                                <Text style={styles.txtOptions}>Số liệu</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chartContainer}>

                        </View>
                        <View style={styles.chartContainer}>

                        </View>
                        <View style={styles.chartContainer}>

                        </View>
                        <View style={styles.chartContainer}>

                        </View>
                        <View style={styles.chartContainer}>

                        </View>
                        <View style={styles.chartContainer}>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default StockAnanlysis;

const styles = StyleSheet.create({
    btnObtions: {
        height: '100%', 
        width:"50%",
        justifyContent: "center",
        alignItems: "center"
    },
    txtOptions: {
        color: "black",
        fontSize: 14,
        fontWeight: "600"
    },
    chartContainer:{
        width: "100%",
        height: 300,
        backgroundColor: "white",
        borderRadius: 10,
        marginVertical: 8
    }
});