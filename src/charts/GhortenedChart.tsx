import React from 'react';
import {Line, Path, Svg} from 'react-native-svg';
import {View, StyleSheet,} from 'react-native';
import { Exchange } from '../type';
import { calculateHorizontalLineY } from './DetailChart2';

interface ChartData {
    x : number,
    y : number
}
export const maxPercentChange = (exchange? : string) => {
  if(exchange === Exchange.HNX) {
    return 0.1;
  } else if(exchange === Exchange.UPCOM) {
    return 0.15;
  } else if ( exchange === Exchange.HOSE) {
    return 0.7;
  } 
  return 0;  
}
const ShortenedGraph = (props : { data : ChartData[], width : number, height: number, priceReference : number, exchange : string }) => {
    const {data, width, height, priceReference, exchange} = props;
    const minValue = Math.min(...data.map((point) => point.y));
    const maxValue = Math.max(...data.map((point) => point.y));

    const Ymin = Math.min(priceReference * (1 - maxPercentChange(exchange)), minValue);
    const Ymax = Math.max(priceReference * (1 + maxPercentChange(exchange)), maxValue);
  
    // Tính toán dữ liệu cho đường curve
    const pathData = data
      .map((point, index) => {
        if(data.length > 1) {
          return `${index === 0 ? 'M' : 'L'} ${index * (width / (data.length - 1))} ${(Ymax - point.y) / (Ymax - Ymin) * height}`;
        } else {
          return "";
        }
      })
      .join(' ');

    const horizontalLineY = calculateHorizontalLineY(priceReference, Ymin, Ymax, height);
  
    return (
      <View style={styles.container}>
        <Svg width={width} height={height}>
          {data.length > 1 ?
          <Path d={pathData} fill="none" stroke={"#3961F8"} strokeWidth="2" />
          :
          <Line
          x1={0}
          y1={horizontalLineY}
          x2={width}
          y2={horizontalLineY}
          stroke="orange" // Màu của đường thẳng ngang
          strokeWidth="1"
          strokeDasharray="5 5"
        />}
        </Svg>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      // Add any additional styles for the container if needed
    },
  });
  
  export default ShortenedGraph;