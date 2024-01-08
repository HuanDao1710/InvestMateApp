import { LineChart,BarChart, CombinedChart } from 'react-native-charts-wrapper';
import { ImageBackground, View , processColor, Dimensions, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { IncomeStatementDataChartDTO } from '../type';
import { filterFinancialData } from '../utils/utils';
import React from 'react';
import { DataTable } from 'react-native-paper';
import TextInputAffix from 'react-native-paper/lib/typescript/components/TextInput/Adornment/TextInputAffix';

const screenWidth = Dimensions.get("screen").width;

const extractRevenueData = (listItem: IncomeStatementDataChartDTO[]): any[] =>  {
    return listItem.map(item => ({ y: item.revenue }));
}

const extractLableColumn = (listItem : IncomeStatementDataChartDTO[],  yearly : number) : any[] => {
    if(yearly === 0) {
        return listItem.map(item => ("Q"+item.quarter+"/"+ (item.year &&(item.year % 2000))))
    }
    return listItem.map(item => (item.year + ""))        
}

const extractLineData  = (listItem : IncomeStatementDataChartDTO[], yearly : number) : any[] => {
    let lineData : any[];
    if(yearly === 0) {
        lineData = listItem.map(i => i.quarterRevenueGrowth);
    } else {
        lineData = listItem.map(i => i.yearRevenueGrowth);
    }
    for(let i = 1; i < lineData.length; i ++) {
        let temp1 = listItem[i - 1].revenue;
        let temp2 = listItem[i].revenue;
        if(temp1 === null || temp2 === null || temp1 === undefined || temp2 === undefined || temp1 === 0) {
          lineData[i] = 1;
          continue;
        }
        lineData[i] = (temp2 - temp1) / temp1;
    }
    return lineData.map(i => ({y : parseFloat((100*i).toFixed(2))}))
}

const renderTable = (lables : any[], ...params: any[][]) => {

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

}

const getABC = (x: number) => {
  let i = 1;
  while (x > 10) {
    i = i * 10;
    x = x / 10;
  }
  return i;
};

const RevenueChart = (props: {raws: IncomeStatementDataChartDTO[]}) => {
    const [yearly, setYearly] = React.useState<number>(0);
    const [lables, setLables] = React.useState<any[]>([]);
    const [data, setData] = React.useState({});
    const [yAxisLeft, setYAxisLeft] = React.useState({});
    const [yAxisRight, setYAxisRight] = React.useState({});
    const [lines, setLines] = React.useState<any[]>([]);
    const [revenues, setRevenues] = React.useState<any[]>([]);
    const [hasData, setHasData] = React.useState(false);

    React.useEffect(()=> {
        const raws = filterFinancialData(props.raws, yearly);
        if(raws.length > 0) setHasData(true);
        const size = yearly === 1 ? raws.length - 4 : raws.length - 7;
        setLables(extractLableColumn(raws, yearly).slice(size,));
        const _lines = extractLineData(raws, yearly).slice(size);
        const _revenues = extractRevenueData(raws).slice(size);
        setLines(['Doanh thu(TT C.Kỳ)', ..._lines.map(item => item.y + '%')]);
        setRevenues(['Doanh thu', ..._revenues.map(item => item.y)]);
       
        const minLine = Math.floor(Math.min(..._lines.map(obj => obj.y)));
        const maxLine = Math.ceil(Math.max(..._lines.map(obj => obj.y)));

        const maxRevenue = Math.max(..._revenues.map(obj => obj.y));
        const minRevenue = Math.min(Math.min(0,..._revenues.map(obj => obj.y)));
        let unitLine = getABC(maxLine - minLine);
        let unitRevenue = getABC(maxRevenue - minRevenue);

        if(unitLine === 0 || unitRevenue === 0) return;

        const minLinestandardized = Math.floor(
          minLine / unitLine,
        );
        const maxLinestandardized = Math.ceil(
          maxLine / unitLine,
        );
        const minRevenuestandardized = Math.floor(
          minRevenue / unitRevenue,
        );
        const maxRevenuestandardized = Math.ceil(
          maxRevenue / unitRevenue,
        );

        // console.log(
        //   minLinestandardized,
        //   maxLinestandardized,
        //   minRevenuestandardized,
        //   maxRevenuestandardized,
        // );

        const rangeLine = maxLinestandardized - minLinestandardized;
        const rangeRevenue = maxRevenuestandardized - minRevenuestandardized;

        let results = rangeRevenue * rangeLine;
        for (
          let i = rangeLine;
          i < Math.max(rangeLine * 2, rangeRevenue);
          i++
        ) {
          if ((i % rangeRevenue === 0 )) {
            results = i;
            break;
          }
        }
        // console.log(
        //   minRevenuestandardized * getABC(maxRevenue - minRevenue),
        //   maxRevenuestandardized * getABC(maxRevenue - minRevenue),
        // );
        setYAxisLeft({
          axisMinimum: minRevenuestandardized *unitRevenue,
          axisMaximum: maxRevenuestandardized * unitRevenue,
        });
        setYAxisRight({
          axisMinimum: minLinestandardized * unitLine,
          axisMaximum:
            (minLinestandardized + results) * unitLine,
          valueFormatter: 'percent',
        });
        setData(
            {
              lineData: {
                  dataSets: [{
                      values: _lines,
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
                  values: _revenues,
                  label: 'Doanh thu thuần',
                  config: {
                      drawValues: false,
                      colors: [processColor('#65bfd3')],
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
          <Text
            style={{
              color: '#3961F8',
              fontWeight: '800',
              marginHorizontal: 15,
              fontSize: 15,
            }}>
            Doanh thu thuần
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
          <View style={{width: '96%', aspectRatio: 1.8, marginTop: 10, justifyContent:"center", alignItems: 'center'}}>
            {hasData? 
            <CombinedChart
            style={{width: '96%',aspectRatio: 1.8,}}
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
          />:
          <Text style={{color: "grey"}}>Không có dữ liệu!</Text>}
          </View>
            <View style={{width: "96%", height: "auto", margin : 5, borderTopWidth: 1, borderColor:'#F1F2F3'}}>
                {renderTable(lables, revenues, lines)}
            </View>
        </View>
        <View style={{height: 5}} />
      </View>
    );
}

export default RevenueChart;

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
    width: "99%",
  },
  contentContainer: {
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  btnYearly: {
    width: '50%',
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
    width:"100%",
    height:"auto"
  },
  tableTxtTilte : {
    color: "black",
    fontWeight: '600',
    fontSize: 10
  },
  tableTxtContent : {
    color : "black",
    fontSize: 10,
  },
  tableCell : {
    borderColor : "#F1F2F3",
    borderRightWidth: 0.5,
    justifyContent:'center',
    alignItems:'center',
  }
});