import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
// import { StackedBarChart, BarChart } from "react-native-chart-kit";
import RevenueChart from '../../charts/ReveneuChart';
import ProfitChart from '../../charts/ProfitChart';
import AssetChart from '../../charts/AssetChart';
import CashFlowChart from '../../charts/CashFlowChart';
import EPSChart from '../../charts/EPSChart';
import { API_CORE } from '../../api';
import { ParamList } from './StockDetail';
import { IP, ROOT_PATH } from '../../constants';

const StockAnanlysis = () => {
    const route = useRoute<RouteProp<ParamList>>();
    const [incomeStatmentData, setInComeStatementData] = React.useState<any[]>([]);
    const [cashFlowData, setCashFlowData] = React.useState<any[]>([]);
    const [balanceSheetData, setBalanceSheetData] = React.useState<any[]>([]);
    const [financialRatioData, setFinancialRatioData] = React.useState<any[]>([]);
    const {item} = route.params;

    const getData = async () => {
        try {
          const res = await API_CORE.get<any>(
            `${ROOT_PATH}/invest_mate/api/stock_detail/income_statement_data`,
            {
              params: {
                code: item.code,
              },
            },
          );
          if (res.status === 200) {
            setInComeStatementData(res.data);
          } else {
            console.log('FETCH FAIL! Status Code: ' + res.status);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        try {
            const res = await API_CORE.get<any>(
              `${ROOT_PATH}/invest_mate/api/stock_detail/cash_flow_data`,
              {
                params: {
                  code: item.code,
                },
              },
            );
            if (res.status === 200) {
                setCashFlowData(res.data)
                // console.log(res.data)
              //   setUpdateTime(convertEpochToDateString(res.data[0].updateTime));
            } else {
              console.log('FETCH FAIL! Status Code: ' + res.status);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
          try {
            const res = await API_CORE.get<any>(
              `${ROOT_PATH}/invest_mate/api/stock_detail/financial_data`,
              {
                params: {
                  code: item.code,
                },
              },
            );
            if (res.status === 200) {
                setFinancialRatioData(res.data)
              //   setUpdateTime(convertEpochToDateString(res.data[0].updateTime));
            } else {
              console.log('FETCH FAIL! Status Code: ' + res.status);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
          try {
            const res = await API_CORE.get<any>(
              `${ROOT_PATH}/invest_mate/api/stock_detail/balance_sheet_data`,
              {
                params: {
                  code: item.code,
                },
              },
            );
            if (res.status === 200) {
                setBalanceSheetData(res.data)
              //   setUpdateTime(convertEpochToDateString(res.data[0].updateTime));
            } else {
              console.log('FETCH FAIL! Status Code: ' + res.status);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    };

    useEffect(()=> {
        getData();
    },[])


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
                        {incomeStatmentData.length > 0 && (
                            <>
                            <View style={styles.chartContainer}>
                                <RevenueChart raws={incomeStatmentData}/>
                            </View>
                            <View style={styles.chartContainer}>
                                <ProfitChart raws={incomeStatmentData}/>                            
                            </View>
                            </>
                        )}
                        {balanceSheetData.length > 0 && (
                            <View style={styles.chartContainer}>
                                <AssetChart raws={balanceSheetData}/>
                            </View>
                        )}                                         
                        {cashFlowData.length > 0 && (
                            <View style={styles.chartContainer}>
                                <CashFlowChart raws={cashFlowData}/>
                            </View>
                        )}
                        {financialRatioData.length > 0 && (
                            <View style={styles.chartContainer}>
                                <EPSChart raws={financialRatioData}/>
                            </View>
                        )}
                    </View>
                    <View style={{height: 50}}/>
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