import React from "react";
import { BalanceSheetDataChartDTO } from "../type";
import { BalanceData } from "./data";
import { filterFinancialData } from "../utils/utils";
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';


const AssetChart = () => {
    const [yearly, setYearly] = React.useState(0);
    const raws = filterFinancialData(BalanceData, yearly);

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text
            style={{
              color: '#3961F8',
              fontWeight: '800',
              marginHorizontal: 15,
              fontSize: 15,
            }}>
            Lợi nhuận
          </Text>
          <View
            style={{
              height: '65%',
              width: 90,
              borderWidth: 1,
              marginHorizontal: 10,
              flexDirection: 'row',
              borderColor: '#3961F8',
            }}>
            <TouchableOpacity
              style={[
                styles.btnYearly,
                {backgroundColor: yearly === 1 ? 'white' : '#3961F8'},
              ]}
              onPress={() => setYearly(0)}>
              <Text
                style={[
                  styles.txtYearly,
                  {color: yearly === 0 ? 'white' : '#3961F8'},
                ]}>
                QUÝ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btnYearly,
                {backgroundColor: yearly === 0 ? 'white' : '#3961F8'},
              ]}
              onPress={() => setYearly(1)}>
              <Text
                style={[
                  styles.txtYearly,
                  {color: yearly === 1 ? 'white' : '#3961F8'},
                ]}>
                NĂM
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View
            style={{
              width: '96%',
              aspectRatio: 1.8,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <CombinedChart
              style={{width: '96%', height: '90%'}}
              data={data}
              xAxis={{valueFormatter: lables}}
              yAxis={{
                left: yAxisLeft,
                right: yAxisRight,
              }}
              chartDescription={{text: ''}}
              legend={{
                enabled: true,
                horizontalAlignment: 'CENTER',
                verticalAlignment: 'BOTTOM',
              }}
              drawOrder={['BAR', 'LINE']}
            /> */}
          </View>
          <View
            style={{
              width: '96%',
              height: 'auto',
              margin: 5,
              borderTopWidth: 1,
              borderColor: '#F1F2F3',
            }}>
            {/* {renderTable(lables, revenues, lines)} */}
          </View>
        </View>
        <View style={{height: 5}} />
      </View>
    );
}

export default AssetChart;


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    borderRadius: 15,
    marginVertical: 10,
    overflow: 'hidden',
    elevation: 2,
    backgroundColor: '#B8C4FF',
  },
  titleContainer: {
    elevation: 1,
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    height: 40,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    width: '99%',
  },
  contentContainer: {
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  btnYearly: {
    width: "50%",
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtYearly: {
    color: 'black',
    fontSize: 10,
    fontWeight: '500',
  },
  tableContainer: {
    width: '100%',
    height: 'auto',
  },
  tableTxtTilte: {
    color: 'black',
    fontWeight: '600',
    fontSize: 10,
  },
  tableTxtContent: {
    color: 'black',
    fontSize: 10,
  },
  tableCell: {
    borderColor: '#F1F2F3',
    borderRightWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});