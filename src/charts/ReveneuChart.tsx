import { LineChart,BarChart, CombinedChart } from 'react-native-charts-wrapper';
import { ImageBackground, View , processColor, Dimensions, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { IncomeStatementDataChartDTO } from '../type';
import { filterFinancialData } from '../utils/utils';
import { incomeStatmentData } from './data';
import React from 'react';

const screenWidth = Dimensions.get("screen").width;

const extractRevenueData = (listItem: IncomeStatementDataChartDTO[]): any[] =>  {
    return listItem.map(item => ({ y: item.revenue }));
}

const extractLableColumn = (listItem : IncomeStatementDataChartDTO[],  yearly : number) : any[] => {
    if(yearly === 0) {
        return listItem.map(item => ("Q"+item.quarter+"/"+item.year))
    }
    return listItem.map(item => (item.year + ""))        
}

const extractLineData  = (listItem : IncomeStatementDataChartDTO[], yearly : number) : any[] => {
    let lineData : any[];
    if(yearly === 0) {
        lineData = listItem.map(i => ({y : i.quarterRevenueGrowth}));
    } else {
        lineData = listItem.map(i => i.yearRevenueGrowth);
    }
    for(let i = 1; i < lineData.length; i ++) {
        let temp1 = listItem[i - 1].revenue;
        let temp2 = listItem[i].revenue;
        if(temp1 === null || temp2 === null || temp1 === undefined || temp2 == undefined) continue;
        lineData[i] = (temp2 - temp1) / temp1;
    }
    return lineData.map(i => ({y : parseFloat((100*i).toFixed(2))}))
}



const RevenueChart = (props: {data? : IncomeStatementDataChartDTO[]}) => {
    const [yearly, setYearly] = React.useState<number>(0);
    const [lables, setLables] = React.useState<any[]>([]);
    const [data, setData] = React.useState({});
    const [yAxisLeft, setYAxisLeft] = React.useState({});
    const [yAxisRight, setYAxisRight] = React.useState({});


    React.useEffect(()=> {
        const raws = filterFinancialData(incomeStatmentData, yearly);
        const size = yearly === 1 ? raws.length - 4 : raws.length - 7;
        setLables(extractLableColumn(raws, yearly).slice(size,));
        const lines = extractLineData(raws, yearly).slice(size, );
        const revenues = extractRevenueData(raws).slice(size,);
        const maxRevenue =  Math.max(...revenues.map(obj => obj.y));
        const minLine = Math.floor(Math.min(...lines.map(obj => obj.y))/10 - 1);
        const maxLine = Math.ceil(Math.max(...lines.map(obj => obj.y)) / 10)
        const range = maxLine - minLine;
        const minValue = Math.ceil(maxRevenue / 1000);
        
        let results = minValue * range;
        for(let i = minValue; i < minValue * 2 ; i++) {
            if(i % range === 0 ) {
                results = i;
                break;
            }
        }

        setYAxisLeft({
            axisMinimum: 0,
            axisMaximum: results * 1000,
        });
        setYAxisRight({
            axisMinimum: minLine * 10,
            axisMaximum: maxLine * 10,
            valueFormatter: "percent",
        })
        
        setData(
            {
                lineData: {
                    dataSets: [{
                        values: lines,
                        label: 'Doanh thu thuần(TT C.Kỳ)',
                        config: {
                            drawValues: false,
                            colors: [processColor('#e43753')],
                            axisDependency: 'RIGHT',
                            mode : "CUBIC_BEZIER",
                            lineWidth: 2
                        },
                    }],
                },
                barData: {
                    dataSets: [{
                    values: revenues,
                    label: 'Doanh thu thuần',
                    config: {
                        drawValues: false,
                        colors: [processColor('#4062df')],
                        axisDependency: 'LEFT',
                    }
                    }],
                    config: {
                        barWidth: 0.5, // Set the bar width here
                    }
                },
            }
        )
    },[yearly])

    

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{color:"#3961F8", fontWeight:"800", marginHorizontal: 15, fontSize: 15,}}>Doanh thu thuần</Text>
                <View style={{height: "65%", width: 90, borderWidth: 1, marginHorizontal : 10, flexDirection:'row', borderColor: "#3961F8"}}>
                    <TouchableOpacity style={[styles.btnYearly, {backgroundColor:(yearly === 1? "white" : "#3961F8")}]}
                        onPress={()=>setYearly(0)}>
                        <Text style={[styles.txtYearly,{color:(yearly === 0? "white" : "#3961F8")}]}>QUÝ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnYearly, {backgroundColor:(yearly === 0? "white" : "#3961F8")}]}
                        onPress={()=>setYearly(1)}>
                        <Text style={[styles.txtYearly,{color:(yearly === 1? "white" : "#3961F8")}]}>NĂM</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <CombinedChart
                    style={{width: "96%", height: "60%"}}
                    data={data}
                    xAxis={{valueFormatter: lables}}
                    yAxis={{
                        left: yAxisLeft,
                        right: yAxisRight,
                        }}
                    chartDescription={{ text: '' }}
                    legend={{
                        enabled: true,
                        horizontalAlignment: 'CENTER',
                        verticalAlignment: 'BOTTOM',
                    }}
                    drawOrder={['BAR', 'LINE']}
                /> 
            </View>
        <View style={{height: 5}}/>
    </View>
    );
}

export default RevenueChart;

const styles = StyleSheet.create({
    container: {
        width: screenWidth - 20, 
        height: "100%",  
        borderRadius: 15, 
        margin: "2%", 
        marginVertical: 10,  
        overflow:"hidden", 
        elevation: 2, 
        backgroundColor:'#B8C4FF',
    },
    titleContainer: {
        elevation: 1, 
        borderBottomWidth: 1, 
        borderColor: "#DCDCDC", 
        borderTopStartRadius: 15, 
        borderTopEndRadius: 15, 
        height: 40, 
        justifyContent:"space-between", 
        backgroundColor:"white", 
        flexDirection: "row", 
        alignItems: "center", 
        width: screenWidth - 25 
    },
    contentContainer: {
        width: '100%',
        flex: 1,  
        borderBottomStartRadius: 15, 
        borderBottomEndRadius: 15, 
        overflow:"hidden", 
        backgroundColor:'white', 
        justifyContent:'center', 
        alignItems:'center' 
    },
    btnYearly: {
        width:"50%",
        height: "100%",
        justifyContent:'center', 
        alignItems: 'center'
    },
    txtYearly : {
        color:"black", 
        fontSize: 10, 
        fontWeight: "500"
    }
})