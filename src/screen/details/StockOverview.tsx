import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import DetailChart2 from '../../charts/DetailChart2';
import ListedComponent from '../../common/ListedComponent';
import SMG from '../../common/SMG';
import IconAddWhite from '../../icons/IconAddWhite';
import {FinancialRatioDTO, ParamList} from '../../type';
import {BasicIndexType, FinancialRatios} from './FinanacialRatioObject';
import {
  arrayToGraphData,
  convertEpochToDateString,
  formatPrice,
  getColorPrice,
  getTextChangePrice,
} from '../../utils/utils';
import IconQuestionMark from '../../icons/IconQuestionMark';
import {API_CORE} from '../../api';
import {ROOT_PATH} from '../../constants';
import ModalBaseSlide from '../../common/ModalBaseSlide';
import ModalBase, {ModalBaseRefType} from '../../common/ModalBase';
import ModalAddToWatchlist from '../../common/ModalAddToWatchList';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FinancialRatioInfoModal = (props: {
  // isModalVisible: boolean;
  // toggleModal: any;
  onClose: () => void;
  item?: BasicIndexType;
}) => {
  const {onClose, item} = props;
  return (
    // <Modal
    //   animationType="slide"
    //   transparent={true}
    //   visible={isModalVisible}
    //   onRequestClose={toggleModal}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View
          style={{
            // height: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.modalText}>{item?.code}</Text>
        </View>
        <View style={{width: '100%', maxHeight: 500}}>
          <ScrollView
            style={{
              borderBottomWidth: 1,
              borderColor: '#ABA9A9',
              borderTopWidth: 1,
            }}>
            <View style={{alignItems: 'center', width: '100%', height: 'auto'}}>
              <View style={{minHeight: 30, width: '94%', flexDirection: 'row'}}>
                <Text style={{color: 'grey', fontSize: 16, fontWeight: '500'}}>
                  Tên :
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: '500',
                    maxWidth: '90%',
                  }}>
                  {' '}
                  {item?.name}
                </Text>
              </View>
              <View style={{minHeight: 30, width: '96%', flexDirection: 'row'}}>
                <Text style={{color: 'grey', fontSize: 16, fontWeight: '500'}}>
                  Tên viết tắt :
                </Text>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
                  {' '}
                  {item?.code}
                </Text>
              </View>
              <View style={{height: 'auto', width: '96%'}}>
                <Text style={{color: 'grey', fontSize: 16, fontWeight: '500'}}>
                  Ý nghĩa :
                </Text>
              </View>
              <View style={{height: 'auto', width: '90%'}}>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
                  {' '}
                  {item?.explain}
                </Text>
              </View>
              <View style={{height: 30}}></View>
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.modalButton}>
          <Text style={styles.buttonText}>Đóng</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </Modal>
  );
};

const temp = {
  yearly: 2023,
  ticker: 'AAPL',
  quarter: 1,
  year: 2023,
  priceToEarning: null,
  priceToBook: null,
  valueBeforeEbitda: null,
  dividend: null,
  roe: null,
  roa: null,
  daysReceivable: null,
  daysInventory: null,
  daysPayable: null,
  ebitOnInterest: null,
  earningPerShare: null,
  bookValuePerShare: null,
  interestMargin: null,
  nonInterestOnToi: null,
  badDebtPercentage: null,
  provisionOnBadDebt: null,
  costOfFinancing: null,
  equityOnTotalAsset: null,
  equityOnLoan: null,
  costToIncome: null,
  equityOnLiability: null,
  currentPayment: null,
  quickPayment: null,
  epsChange: null,
  ebitdaOnStock: null,
  grossProfitMargin: null,
  operatingProfitMargin: null,
  postTaxMargin: null,
  debtOnEquity: null,
  debtOnAsset: null,
  debtOnEbitda: null,
  shortOnLongDebt: null,
  assetOnEquity: null,
  capitalBalance: null,
  cashOnEquity: null,
  cashOnCapitalize: null,
  cashCirculation: null,
  revenueOnWorkCapital: null,
  capexOnFixedAsset: null,
  revenueOnAsset: null,
  postTaxOnPreTax: null,
  ebitOnRevenue: null,
  preTaxOnEbit: null,
  preProvisionOnToi: null,
  postTaxOnToi: null,
  loanOnEarnAsset: null,
  loanOnAsset: null,
  loanOnDeposit: null,
  depositOnEarnAsset: null,
  badDebtOnAsset: null,
  liquidityOnLiability: null,
  payableOnEquity: null,
  cancelDebt: null,
  ebitdaOnStockChange: null,
  bookValuePerShareChange: null,
  creditGrowth: null,
  code: 'ABC123',
};

const StockOverview = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<ParamList>>();
  const {item} = route.params;
  const financialIntorRef = React.useRef<ModalBaseRefType | null>(null);
  const [currentFinancial, setCurrentFinancial] = useState<BasicIndexType>({
    code: '',
    name: '',
    explain: '',
  });
  const ModalAddToWatchlistRef = React.useRef<ModalBaseRefType | null>(null);

  const [financialData, setFinancialData] =
    React.useState<FinancialRatioDTO>(temp);

  const getData = async () => {
    try {
      const res = await API_CORE.get<any>(
        `${ROOT_PATH}/invest_mate/api/stock_detail/financial_ration_info`,
        {
          params: {
            code: item.code,
          },
        },
      );
      if (res.status === 200) {
        setFinancialData(res.data);
        //   setUpdateTime(convertEpochToDateString(res.data[0].updateTime));
      } else {
        console.log('FETCH FAIL! Status Code: ' + res.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Tổng quan',
    });
  });

  const handleShowModal = (item: BasicIndexType) => {
    financialIntorRef.current?.show();
    setCurrentFinancial(item);
  };

  const handleViewComapnyInfor = () => {
    navigation.navigate('CompanyInfo', {item});
  };

  const handleViewLargeShareHolder = () => {
    navigation.navigate('ListLargeShareHolder', {item});
  };

  const FinancialRatioItem = (props: {
    item: BasicIndexType;
    value: string | number | null;
  }) => {
    const {item, value} = props;
    return (
      <View style={styles.basicParamContainer}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => handleShowModal(item)}>
          <Text style={styles.txtBasicParam}>{item.code}</Text>
          <View style={{position: 'absolute', top: -8, right: -18}}>
            <IconQuestionMark style={{width: 15, aspectRatio: 1}} />
          </View>
        </TouchableOpacity>
        <Text style={styles.txtBasicValue}>
          {value ? (
            value
          ) : (
            <Text style={{fontSize: 12, color: 'grey'}}>Không có dữ liệu</Text>
          )}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ModalBaseSlide ref={financialIntorRef}>
        <FinancialRatioInfoModal
          onClose={() => financialIntorRef.current?.hide()}
          item={currentFinancial}
        />
      </ModalBaseSlide>
      <ModalBase ref={ModalAddToWatchlistRef}>
        <ModalAddToWatchlist
          item={item}
          onClose={() => ModalAddToWatchlistRef.current?.hide()}
        />
      </ModalBase>
      <ScrollView>
        <View>
          <Text
            style={{
              fontSize: 10,
              color: 'grey',
              position: 'absolute',
              right: 0,
              margin: 6,
            }}>
            Ngày cập nhật: {convertEpochToDateString(item.updateTime)}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            height: 180,
            marginTop: 28,
            flexDirection: 'row',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            // borderWidth: 1
          }}>
          <View style={{width: '75%', height: '100%', marginLeft: 10}}>
            <View style={{height: '15%', width: '100%', marginLeft: 10}}>
              <Text style={{color: 'grey', fontWeight: '600', fontSize: 14}}>
                Mã CP:{' '}
                <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
                  {item.code}
                </Text>
              </Text>
            </View>
            <View
              style={{
                height: '60%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // borderWidth: 1
                }}>
                <DetailChart2
                  data={arrayToGraphData(item.timeSeries, 1)}
                  width={windowWidth * 0.7 - 60}
                  height={100}
                  referencePrices={item.pricePreference}
                  changePrice={item.priceChange}
                  exchange={item.exchange}
                />
              </View>
            </View>
            <View
              style={{
                height: '25%',
                width: '100%',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                // borderWidth: 1
              }}>
              <View
                style={{
                  backgroundColor: '#D7D7D7',
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  margin: 6,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: '500',
                    marginHorizontal: 8,
                    fontSize: 12,
                  }}>
                  {item.exchange}
                </Text>
              </View>
              <View
                style={{
                  height: '100%',
                  marginRight: 10,
                  justifyContent: 'flex-end',
                  marginBottom: 3,
                }}>
                <Text
                  style={[
                    {color: 'black', fontWeight: '500', fontSize: 12},
                    getColorPrice(item.priceChange),
                  ]}>
                  {getTextChangePrice(
                    item.priceChange,
                    item.priceChange / item.pricePreference,
                  )}
                </Text>
                <Text
                  style={[
                    {color: 'black', fontSize: 16, fontWeight: '600'},
                    getColorPrice(item.priceChange),
                  ]}>
                  {formatPrice(item.price)}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '15%',
              height: '100%',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              // borderWidth: 1
            }}>
            <View style={{margin: 10}}>
              <SMG smg={item.smg} style={{width: 40, aspectRatio: 1}} />
            </View>
            <TouchableOpacity
              style={{
                width: 45,
                height: 20,
                borderRadius: 20,
                backgroundColor: '#3961F8',
                padding: 3,
                margin: 8,
                elevation: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => ModalAddToWatchlistRef.current?.show()}>
              <IconAddWhite height={12} width={12} fill={'white'} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            style={styles.btnInforComapany}
            onPress={handleViewComapnyInfor}>
            <Text style={{color: 'black', fontWeight: '500'}}>
              Thông tin công ty
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnInforComapany}
            onPress={handleViewLargeShareHolder}>
            <Text style={{color: 'black', fontWeight: '500'}}>
              Danh sách cổ đông lớn
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '100%'}}>
          <Text
            style={{
              color: 'black',
              fontWeight: '600',
              marginBottom: 10,
              marginLeft: 10,
              fontSize: 16,
              textDecorationLine: 'underline',
            }}>
            Số liệu thống kê chính
          </Text>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          {/* Chỉ giá cổ phiếu */}
          <ListedComponent title="Chỉ số giá cổ phiếu">
            <FinancialRatioItem
              item={FinancialRatios.percentDay}
              value={(item.percentChangeDay * 100).toFixed(2) + '%'}
            />
            <FinancialRatioItem
              item={FinancialRatios.percentWeek}
              value={(item.percentChangeWeek * 100).toFixed(2) + '%'}
            />
            <FinancialRatioItem
              item={FinancialRatios.percentMonth}
              value={(item.percentChangeMonth * 100).toFixed(2) + '%'}
            />
            <FinancialRatioItem
              item={FinancialRatios.marketCap}
              value={item.marketCap?.toFixed(2) + ''}
            />
          </ListedComponent>
          <ListedComponent title="Chỉ số giá trị">
            <FinancialRatioItem
              item={FinancialRatios.priceToEarning}
              value={financialData.priceToEarning}
            />
            <FinancialRatioItem
              item={FinancialRatios.priceToBook}
              value={financialData.priceToBook}
            />
            {/* <FinancialRatioItem item={FinancialRatios.valueBeforeEbitda} value={financialData.valueBeforeEbitda} /> */}
            <FinancialRatioItem
              item={FinancialRatios.dividend}
              value={financialData.dividend}
            />
          </ListedComponent>

          <ListedComponent title="Chỉ số hiệu quả">
            <FinancialRatioItem
              item={FinancialRatios.roe}
              value={financialData.roe}
            />
            <FinancialRatioItem
              item={FinancialRatios.roa}
              value={financialData.roa}
            />
          </ListedComponent>

          <ListedComponent title="Chỉ số vòng quay">
            <FinancialRatioItem
              item={FinancialRatios.daysReceivable}
              value={financialData.daysReceivable}
            />
            <FinancialRatioItem
              item={FinancialRatios.daysInventory}
              value={financialData.daysInventory}
            />
            <FinancialRatioItem
              item={FinancialRatios.daysPayable}
              value={financialData.daysPayable}
            />
          </ListedComponent>

          <ListedComponent title="Chỉ số lợi nhuận">
            <FinancialRatioItem
              item={FinancialRatios.ebitOnInterest}
              value={financialData.ebitOnInterest}
            />
            <FinancialRatioItem
              item={FinancialRatios.earningPerShare}
              value={financialData.earningPerShare}
            />
            <FinancialRatioItem
              item={FinancialRatios.bookValuePerShare}
              value={financialData.bookValuePerShare}
            />
          </ListedComponent>

          <ListedComponent title="Chỉ số lãi suất và nợ xấu">
            <FinancialRatioItem
              item={FinancialRatios.interestMargin}
              value={financialData.interestMargin}
            />
            <FinancialRatioItem
              item={FinancialRatios.nonInterestOnToi}
              value={financialData.nonInterestOnToi}
            />
            <FinancialRatioItem
              item={FinancialRatios.badDebtPercentage}
              value={financialData.badDebtPercentage}
            />
            <FinancialRatioItem
              item={FinancialRatios.provisionOnBadDebt}
              value={financialData.provisionOnBadDebt}
            />
          </ListedComponent>

          <ListedComponent title="Chỉ số chi phí và tài sản">
            <FinancialRatioItem
              item={FinancialRatios.costOfFinancing}
              value={financialData.costOfFinancing}
            />
            <FinancialRatioItem
              item={FinancialRatios.equityOnTotalAsset}
              value={financialData.equityOnTotalAsset}
            />
            <FinancialRatioItem
              item={FinancialRatios.equityOnLoan}
              value={financialData.equityOnLoan}
            />
            <FinancialRatioItem
              item={FinancialRatios.costToIncome}
              value={financialData.costToIncome}
            />
            <FinancialRatioItem
              item={FinancialRatios.equityOnLiability}
              value={financialData.equityOnLiability}
            />
          </ListedComponent>

          <ListedComponent title="Chỉ số thanh toán">
            <FinancialRatioItem
              item={FinancialRatios.currentPayment}
              value={financialData.currentPayment}
            />
            <FinancialRatioItem
              item={FinancialRatios.quickPayment}
              value={financialData.quickPayment}
            />
          </ListedComponent>

          <ListedComponent title="Chỉ số thay đổi">
            <FinancialRatioItem
              item={FinancialRatios.epsChange}
              value={financialData.epsChange}
            />
            <FinancialRatioItem
              item={FinancialRatios.ebitdaOnStock}
              value={financialData.ebitdaOnStock}
            />
            <FinancialRatioItem
              item={FinancialRatios.ebitdaOnStockChange}
              value={financialData.ebitdaOnStockChange}
            />
            <FinancialRatioItem
              item={FinancialRatios.bookValuePerShareChange}
              value={financialData.bookValuePerShareChange}
            />
            <FinancialRatioItem
              item={FinancialRatios.creditGrowth}
              value={financialData.creditGrowth}
            />
          </ListedComponent>

          <ListedComponent title="Chỉ số lợi nhuận gộp và lợi nhuận hoạt động">
            <FinancialRatioItem
              item={FinancialRatios.grossProfitMargin}
              value={financialData.grossProfitMargin}
            />
            <FinancialRatioItem
              item={FinancialRatios.operatingProfitMargin}
              value={financialData.operatingProfitMargin}
            />
            <FinancialRatioItem
              item={FinancialRatios.postTaxMargin}
              value={financialData.postTaxMargin}
            />
          </ListedComponent>

          <ListedComponent title="Chỉ số nợ">
            <FinancialRatioItem
              item={FinancialRatios.debtOnEquity}
              value={financialData.debtOnEquity}
            />
            <FinancialRatioItem
              item={FinancialRatios.debtOnAsset}
              value={financialData.debtOnAsset}
            />
            <FinancialRatioItem
              item={FinancialRatios.debtOnEbitda}
              value={financialData.debtOnEbitda}
            />
            <FinancialRatioItem
              item={FinancialRatios.shortOnLongDebt}
              value={financialData.shortOnLongDebt}
            />
          </ListedComponent>

          <ListedComponent title="Chỉ số tài sản và vốn">
            <FinancialRatioItem
              item={FinancialRatios.assetOnEquity}
              value={financialData.assetOnEquity}
            />
            <FinancialRatioItem
              item={FinancialRatios.capitalBalance}
              value={financialData.capitalBalance}
            />
            <FinancialRatioItem
              item={FinancialRatios.cashOnEquity}
              value={financialData.cashOnEquity}
            />
            <FinancialRatioItem
              item={FinancialRatios.cashOnCapitalize}
              value={financialData.cashOnCapitalize}
            />
            <FinancialRatioItem
              item={FinancialRatios.cashCirculation}
              value={financialData.cashCirculation}
            />
          </ListedComponent>

          <ListedComponent title="Chỉ số doanh thu và chi phí">
            <FinancialRatioItem
              item={FinancialRatios.revenueOnWorkCapital}
              value={financialData.revenueOnWorkCapital}
            />
            <FinancialRatioItem
              item={FinancialRatios.capexOnFixedAsset}
              value={financialData.capexOnFixedAsset}
            />
            <FinancialRatioItem
              item={FinancialRatios.revenueOnAsset}
              value={financialData.revenueOnAsset}
            />
            <FinancialRatioItem
              item={FinancialRatios.postTaxOnPreTax}
              value={financialData.postTaxOnPreTax}
            />
            <FinancialRatioItem
              item={FinancialRatios.ebitOnRevenue}
              value={financialData.ebitOnRevenue}
            />
            <FinancialRatioItem
              item={FinancialRatios.preTaxOnEbit}
              value={financialData.preTaxOnEbit}
            />
            <FinancialRatioItem
              item={FinancialRatios.preProvisionOnToi}
              value={financialData.preProvisionOnToi}
            />
            <FinancialRatioItem
              item={FinancialRatios.postTaxOnToi}
              value={financialData.postTaxOnToi}
            />
          </ListedComponent>

          <ListedComponent title="Chỉ số cho vay và tiền gửi">
            <FinancialRatioItem
              item={FinancialRatios.loanOnEarnAsset}
              value={financialData.loanOnEarnAsset}
            />
            <FinancialRatioItem
              item={FinancialRatios.loanOnAsset}
              value={financialData.loanOnAsset}
            />
            <FinancialRatioItem
              item={FinancialRatios.loanOnDeposit}
              value={financialData.loanOnDeposit}
            />
            <FinancialRatioItem
              item={FinancialRatios.depositOnEarnAsset}
              value={financialData.depositOnEarnAsset}
            />
          </ListedComponent>

          <ListedComponent title="Chỉ số nợ xấu và thanh toán">
            <FinancialRatioItem
              item={FinancialRatios.badDebtOnAsset}
              value={financialData.badDebtOnAsset}
            />
            <FinancialRatioItem
              item={FinancialRatios.liquidityOnLiability}
              value={financialData.liquidityOnLiability}
            />
            <FinancialRatioItem
              item={FinancialRatios.payableOnEquity}
              value={financialData.payableOnEquity}
            />
            <FinancialRatioItem
              item={FinancialRatios.cancelDebt}
              value={financialData.cancelDebt}
            />
          </ListedComponent>
        </View>
        <View style={{height: 50}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StockOverview;

const styles = StyleSheet.create({
  btnInforComapany: {
    width: windowWidth * 0.45,
    height: '70%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderRadius: 10,
    borderColor: 'grey',
  },
  basicParamContainer: {
    width: '88%',
    borderBottomWidth: 1,
    height: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D4D4D4',
  },
  txtBasicParam: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
  },
  txtBasicValue: {
    fontSize: 12,
    fontWeight: '600',
    // color: '#3961F8',
    color: 'black',
  },
  subtitle: {
    marginLeft: 6,
    marginRight: 6,
    fontWeight: '600',
    fontSize: 14,
    color: '#141ffc',
    textDecorationLine: 'underline',
  },
  subTitleContainer: {
    margin: '2%',
    alignSelf: 'baseline',
    // backgroundColor: "#b8c4ff",
    borderRadius: 10,
  },
  groupContainer: {
    width: '96%',
    backgroundColor: 'white',
    height: 'auto',
    paddingBottom: 30,
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    gap: 10,

    // height: 400,
  },
  modalText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '800',
  },
  modalButton: {
    backgroundColor: '#c24f44',
    padding: 5,
    width: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    zIndex: 1000,
  },
});
