import {DataTable} from 'react-native-paper';
import {StockTemporary} from '../../type';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import SMG from '../../common/SMG';
import ShortenedGraph from '../../charts/GhortenedChart';
import IconSmallAdd from '../../icons/IconSmallAdd';
import {arrayToGraphData} from '../../utils/utils';

const renderItemTopStock = (
  stock: StockTemporary,
  onPress: () => void,
): React.JSX.Element => {
  const colorStyle = (n: number) => {
    if (n < 0) return {color: '#f65959'};
    return {};
  };
  //   console.log(stock.code);
  return (
    <DataTable.Row key={stock.code}>
      <DataTable.Cell style={styles.cell}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onPress}>
          <Text
            style={[
              styles.textCell,
              {color: 'black', width: '60%', fontWeight: '500'},
            ]}>
            {stock.code}
          </Text>
          <IconSmallAdd style={{width: 13, aspectRatio: 1, margin: '6%'}} />
        </TouchableOpacity>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <ShortenedGraph
          data={arrayToGraphData(stock.timeSeries, 2)}
          width={35}
          height={25}
          priceReference={stock.pricePreference}
          exchange={stock.exchange}
        />
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <SMG style={{width: '55%', aspectRatio: 1}} smg={stock.smg} />
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <Text style={[styles.textCell]}>{stock.price.toFixed(1)}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <Text style={[styles.textCell, colorStyle(stock.percentChangeDay)]}>
          {(stock.percentChangeDay * 100).toFixed(2)}%
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <Text style={[styles.textCell, colorStyle(stock.percentChangeWeek)]}>
          {(stock.percentChangeWeek * 100).toFixed(2)}%
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <Text style={[styles.textCell, colorStyle(stock.percentChangeMonth)]}>
          {(stock.percentChangeMonth * 100).toFixed(2)}%
        </Text>
      </DataTable.Cell>
    </DataTable.Row>
  );
};

export default renderItemTopStock;

const styles = StyleSheet.create({
  textCell: {
    color: '#1DC787',
    fontSize: 11,
  },
  cell: {
    alignItems: 'center',
  },
  industyCell: {
    alignItems: 'center',
  },
});
