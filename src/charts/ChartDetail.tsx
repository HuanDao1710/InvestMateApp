import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { hexToRgb } from '../utils/utils';
import Svg, { Line } from 'react-native-svg';


const width = Dimensions.get('screen').width;

const LineChartDetail = (props : {data : number[], changePrice : number}) => {
  const data = {
    labels: [],
    datasets: [
      {
        data: props.data,
        color: (opacity = 1) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`,
      },
    ],
  };

  const lineColor = props.changePrice >= 0? "#37c284" : "#fc8181";

  const rgb = hexToRgb(lineColor);

  return (
    <View style={{width: width * 0.7, height: "auto", }}>
      <Svg height="100%" width="100%" style={{position: "absolute"}}>
        {/* Đường thẳng nằm ngang với trục y */}
      </Svg>
      <LineChart
        data={data}
        width={width * 0.7}
        height={100}
        chartConfig={{
          backgroundColor: '#f4f5f7',
          backgroundGradientFrom: '#f4f5f7',
          backgroundGradientTo: '#f4f5f7',
          decimalPlaces: 0,
          color: (opacity = 1,) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        withHorizontalLabels={true}
        withHorizontalLines={false}
        withVerticalLines={false}
        withDots={false}    
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default LineChartDetail;