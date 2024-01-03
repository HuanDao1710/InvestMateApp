import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop, Use, Line, Polygon } from 'react-native-svg';
import {View, StyleSheet,} from 'react-native';
import { maxPercentChange } from './GhortenedChart';

interface ChartData {
    x : number,
    y : number
}

export const calculateHorizontalLineY = (y : number, minValue : number, maxY : number, height : number) => {
  // Tính toán vị trí y của đường thẳng ngang
  const normalizedY = (maxY - y) / (maxY - minValue);
  const horizontalLineY = normalizedY * height;
  return horizontalLineY;
};

const DetailChart2 = (props : { data : ChartData[], width : number, height: number, referencePrices: number, changePrice : number, exchange?: string}) => {
  const {data, width, height, referencePrices, exchange, changePrice} = props;
    const minValue = Math.min(...data.map((point) => point.y));
    const maxValue = Math.max(...data.map((point) => point.y));
    const Ymin = Math.min(referencePrices * (1 - maxPercentChange(exchange)), minValue);
    const Ymax = Math.max(referencePrices * (1 + maxPercentChange(exchange)), maxValue);
  
    // Tính toán dữ liệu cho đường curve
    const pathData = data
      .map((point, index) => {
        if(data.length > 1 && Ymax > Ymin) {
          return `${index === 0 ? 'M' : 'L'} ${index * (width / (data.length - 1))} ${(Ymax - point.y) / (Ymax - Ymin) * height}`;
        } else {
          return "";
        }
      })
      .join(' ');

  const polygonPoints = `0 ${height} ${pathData} ${width} ${height} 0 ${height}`;
  const horizontalLineY = calculateHorizontalLineY(referencePrices, Ymin, Ymax, height);
  const stopColorTop = changePrice >= 0? "#c5edd9" : "#fca2a2";
  const stopColorBottom = changePrice >= 0? "#e8f8ef" : "#ffebed";
  const lineColor = changePrice >= 0? "#37c284" : "#fc8181";

  return (
    <View>
      <Svg width={width} height={height}>
        <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={stopColorTop} stopOpacity="1" />
          <Stop offset="100%" stopColor={stopColorBottom} stopOpacity="0.7" />
        </LinearGradient>
        <Polygon points={polygonPoints} fill="url(#gradient)" />
        <Path d={pathData} fill="none" stroke={lineColor} strokeWidth="2" />
        <Line
          x1={0}
          y1={horizontalLineY}
          x2={width}
          y2={horizontalLineY}
          stroke="orange" // Màu của đường thẳng ngang
          strokeWidth="2"
          strokeDasharray="5 5"
        />
      </Svg>
    </View>

  );
  };
  
  const styles = StyleSheet.create({
    container: {
      // Add any additional styles for the container if needed
    },
  });
  
  export default DetailChart2;