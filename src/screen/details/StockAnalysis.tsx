import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import {ScrollView, Text, View, TouchableOpacity, StyleSheet, Dimensions, processColor} from 'react-native';
// import { StackedBarChart, BarChart } from "react-native-chart-kit";
import { LineChart,BarChart, CombinedChart } from 'react-native-charts-wrapper';
import RevenueChart from '../../charts/ReveneuChart';
import ProfitChart from '../../charts/ProfitChart';
import AssetChart from '../../charts/AssetChart';




// const data = [50, 10, -40, 95, -30, 85, 91, -35, 53, -53, 24, 50, -20, -80];
const revenue = []
enum ViewModeType{
    CHART = 1,
    DATA = 2
}
/* 
doanh thu : revenue , shareHolder
Tài sản : shortAsset + longAsset
dòng tiền : fromInvest, fromFinancial, fromSale

*/



const StockAnanlysis = () => {
    const navigation = useNavigation<any>();
    const [viewMode, setViewMode] = useState<ViewModeType>(ViewModeType.CHART);
    const [data, setData] = useState({});
    
    React.useEffect(() => {
        setData({
        lineData: {
            dataSets: [{
                values: [{y: 30}, {y: 20}, {y: -10}, {y: -10}],
                label: 'Line dataset',
                config: {
                    drawValues: false,
                    colors: [processColor('red')],
                    axisDependency: 'RIGHT',
                    mode : "CUBIC_BEZIER",
                    lineWidth: 2
                },
            }],
        },
        barData: {
            dataSets: [{
            values: [{y: 1}, {y: 2}, {y: 1}, {y: 1}],
            label: 'Bar dataset',
            config: {
                drawValues: false,
                colors: [processColor('blue')],
                axisDependency: 'LEFT',
            }
            }],
            config: {
                barWidth: 0.6, // Set the bar width here
            }
        },
        
        });
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({ title: 'Tài chính'});
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
                    <View style={{width: "96%", }}>
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
                            <RevenueChart/>
                            {/* <BarChart
                                style={{width: "100%", height: "80%",}}
                                xAxis={{
                                valueFormatter: ['Q1', 'Q2', 'Q3'],
                                granularityEnabled: true,
                                granularity: 1,
                                }}
                                chartDescription={{ text: '' }}
                                legend={{ enabled: true , textSize: 12}}
                                data={data}
                                drawValueAboveBar={false}
                                drawBarShadow={false}
                            />     */}
                        </View>
                        <View style={styles.chartContainer}>
                            <ProfitChart/>                            
                        </View>
                        <View style={styles.chartContainer}>
                            <AssetChart/>
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
        width: "auto",
        height: "auto",
        backgroundColor: "transparent",
        borderRadius: 10,
        marginVertical: 8,
        justifyContent:"center",
    }
});