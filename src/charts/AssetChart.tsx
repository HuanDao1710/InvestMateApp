import React from "react";
import { BalanceSheetDataChartDTO } from "../type";
import { filterFinancialData } from "../utils/utils";
import {StyleSheet, Text, View, TouchableOpacity, processColor} from 'react-native';
import { BarChart } from "react-native-charts-wrapper";
import { DataTable } from "react-native-paper";

const extractAssetData = (listItem: BalanceSheetDataChartDTO[]): any[] =>  {
  return listItem.map(item => ({ y: [item.longAsset, item.shortAsset]}));
}

const extractLableColumn = (listItem : BalanceSheetDataChartDTO[],  yearly : number) : any[] => {
  if(yearly === 0) {
      return listItem.map(item => ("Q"+item.quarter+"/"+ (item.year &&(item.year % 2000))))
  }
  return listItem.map(item => (item.year + ""))        
}

const renderTable = (lables: any[], ...params: any[][]) => {

  return (
    <View style={styles.tableContainer}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title
            style={[styles.tableCell, {backgroundColor: '#F5F5F5'}]}>
            <Text style={styles.tableTxtTilte}>{}</Text>
          </DataTable.Title>
          {lables.map((value, index) => (
            <DataTable.Title
              key={index}
              style={[styles.tableCell, {backgroundColor: '#F5F5F5'}]}>
              <Text style={styles.tableTxtTilte}>{value}</Text>
            </DataTable.Title>
          ))}
        </DataTable.Header>
        {params.map((list, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={styles.tableCell}>
              <Text style={styles.tableTxtTilte}>{list[0]}</Text>
            </DataTable.Cell>
            {list.slice(1).map((value, index) => (
              <DataTable.Cell key={index} style={styles.tableCell}>
                <Text style={styles.tableTxtContent}>{value}</Text>
              </DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};


const AssetChart = (props : {raws : BalanceSheetDataChartDTO[]}) => {
  const [yearly, setYearly] = React.useState<number>(0);
  const [lables, setLables] = React.useState<any[]>([]);
  const [data, setData] = React.useState({});
  const [shortAsset, setShortAsset] = React.useState<any[]>([]);
  const [longAsset, setLongAsset] = React.useState<any[]>([]);
  const [total, setTotal] = React.useState<any[]>([]);
  const [hasData, setHasData] = React.useState(false);

  React.useEffect(()=> {
    const raws = filterFinancialData(props.raws, yearly);
    if(raws.length > 0) setHasData(true);
    const size = yearly === 1 ?  raws.length - 4 : raws.length - 7;
    const assets = extractAssetData(raws).slice(size);
    setLongAsset(["TS Ng.Hạn",...assets.map(a => a.y[0])])
    setShortAsset(["TS D.Hạn",...assets.map(a => a.y[1])])
    setTotal(["Tổng TS",...assets.map(a => (a.y[0] + a.y[1]))])
    setLables(extractLableColumn(raws, yearly).slice(size));

    setData({
      dataSets: [{
        values: assets,
        label: '',
        config: {
          colors: ['#f7e016', '#e91ddc',].map((color) => processColor(color)),
          stackLabels: ['Tài sản dài hạn', 'Tài sản ngắn hạn']
        }
      }],
      config: {
        barWidth: 0.6, // Set the bar width here
      },
    })
  }, [yearly])

   
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
            Tài sản
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
              {hasData?
            <BarChart
              style={{width:"96%", aspectRatio: 1.8}}
              xAxis={{
                valueFormatter: lables,
                granularityEnabled: true,
                granularity: 1,
              }}
              data={data}
              legend={{
                enabled: true,
                textSize: 10,
                form: "SQUARE",
                formSize: 14,
                xEntrySpace: 10,
                yEntrySpace: 5,
                wordWrapEnabled: true,
                horizontalAlignment: 'CENTER',
              }}
              drawValueAboveBar={false}
              // onChange={(event) => console.log(event.nativeEvent)}
            /> 
            :
            <Text style={{color:"grey"}}>Không có dữ liệu!</Text>
          }
          </View>
          <View
            style={{
              width: '96%',
              height: 'auto',
              margin: 5,
              borderTopWidth: 1,
              borderColor: '#F1F2F3',
            }}>
            {renderTable(lables, longAsset, shortAsset, total)}
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