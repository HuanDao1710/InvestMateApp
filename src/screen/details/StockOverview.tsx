import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import {View, Text, Dimensions, ScrollView, StyleSheet, Modal, SafeAreaView, TouchableOpacity} from 'react-native';
import DetailChart2 from '../../charts/DetailChart2';
import ListedComponent from '../../common/ListedComponent';
import SMG from '../../common/SMG';
import IconAddWhite from '../../iconSVG/IconAddWhite';
import { FinancialRatioDTO, ParamList, } from '../../type';
import { BasicIndexType, FinanacialRatios } from './FinanacialRatioObject';
import { arrayToGraphData, convertEpochToDateString, formatPrice, getColorPrice, getTextChangePrice } from '../../utils/utils';
import IconQuestionMark from '../../iconSVG/IconQuestionMark';
import { openDatabase } from 'react-native-sqlite-storage';
import { API_CORE } from '../../api';
import { IP } from '../../constants';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const FinancialRatioInfoModal = (props : {isModalVisible : boolean, toggleModal: any, item? : BasicIndexType }) => {
    const {isModalVisible, toggleModal, item} = props;
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{height: "10%",  justifyContent:"center", alignItems: "center"}}>
                <Text style={styles.modalText}>
                    {item?.code}
                </Text>
            </View>
            <View style={{height: "80%", width: "100%"}}>
            <ScrollView style={{borderBottomWidth: 1, borderColor: "#ABA9A9", borderTopWidth: 1,}}>
                <View style={{ alignItems: 'center', width:"100%", height: "auto"}}>
                    <View style={{minHeight: 30, width: "94%",  flexDirection:"row"}}>
                        <Text style={{color: "grey", fontSize: 16, fontWeight: "500"}}>Tên :</Text>
                        <Text style={{color: "black", fontSize: 16, fontWeight: "500", maxWidth:"90%"}}> {item?.name}</Text>              
                    </View>
                    <View style={{minHeight: 30, width: "96%",flexDirection:"row"}}>
                        <Text style={{color: "grey", fontSize: 16, fontWeight: "500"}}>Tên viết tắt :</Text>
                        <Text style={{color: "black", fontSize: 16, fontWeight: "500"}}> {item?.code}</Text>              
                    </View>
                    <View style={{height: "auto", width: "96%", }}>
                        <Text style={{color: "grey", fontSize: 16, fontWeight: "500"}}>Ý nghĩa :</Text>
                    </View>
                    <View style={{height: "auto", width: "90%", }}>
                        <Text style={{color: "black", fontSize: 16, fontWeight: "500",}}> {item?.explain}</Text>              
                    </View>
                    <View style={{height: 30}}>

                    </View>
                </View>
            </ScrollView>                
            </View>
            <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
              <Text style={styles.buttonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
}

const FinancialRationItem = (props : {item : BasicIndexType, value : string | number | null, onPress : any}) => {
    const {item, value, onPress} = props
    return (
        <View style={styles.basicParamContainer}>
            <TouchableOpacity style={{flexDirection:'row',}}
                onPress={() => onPress(item)}>
                <Text style={styles.txtBasicParam}>{item.code}</Text>
                <View style={{position:"absolute", top: -8, right: -18,}}>
                    <IconQuestionMark style={{width: 15, aspectRatio: 1}}/>
                </View>
            </TouchableOpacity>
            <Text style={styles.txtBasicValue}>{value? value : <Text style={{fontSize:12, color:"grey"}}>Không có dữ liệu</Text>}</Text>                        
        </View>
    )
}

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
  }

const StockOverview = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<ParamList>>();
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [currentFinancial, setCurrentFinancial] = useState<BasicIndexType>({code: "", name: "", explain: ''});
    const {item} = route.params;
    const [financialData, setFinancialData] = React.useState<FinancialRatioDTO>(temp);

    const getData = async () => {
        try {
            const res = await API_CORE.get<any>(
              `http://${IP}:8080/invest_mate/api/stock_detail/financial_ration_info`,
              {
                params : {
                    code: item.code
                }
              }
            );
            if (res.status === 200) {
              setFinancialData(res.data);
            //   setUpdateTime(convertEpochToDateString(res.data[0].updateTime));
            } else {
              console.log("FETCH FAIL! Status Code: " + res.status);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
    }

    React.useEffect(()=> {
        getData();
    },[])

    

    useLayoutEffect(() => {
        navigation.setOptions({ 
            title: "Tổng quan"
        });
    })

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const handleShowModal = (item : BasicIndexType) => {
        setCurrentFinancial(item);
        toggleModal();
    }

    const handleViewComapnyInfor = () => {
        navigation.navigate('CompanyInfo', {item});
    }

    const handleViewLargeShareHolder = () => {
        navigation.navigate('ListLargeShareHolder', {item});
    }

    return (
        <SafeAreaView style={{flex : 1}}>
            <FinancialRatioInfoModal isModalVisible={isModalVisible} toggleModal={toggleModal} item={currentFinancial}/>
            <ScrollView>
                <View>
                    <Text style={{fontSize: 10, color: "grey", position:"absolute", right: 0, margin: 6}}>
                        Ngày cập nhật: {convertEpochToDateString(item.updateTime)}
                    </Text>
                </View>
                <View style={{width: "100%", height: 220, marginTop: 28, flexDirection:"row", backgroundColor: "white"}}>
                    <View style={{width: "80%", height: "100%",  marginLeft: 10}}>
                        <View style={{height: "15%", width: "100%", marginLeft: 10}}>
                            <Text style={{color:"grey", fontWeight: "600", fontSize: 16}}>
                                Mã CP: <Text style={{color:"black", fontWeight: "600", fontSize: 18}}>{item.code}</Text>
                            </Text>
                        </View>
                        <View style={{height: "60%", width: "100%",  justifyContent:"center", alignItems:"center"}}>
                            <View style={{width:"80%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                                <DetailChart2 data={arrayToGraphData(item.timeSeries, 1)} width={windowWidth * 0.7 - 20} height={windowHeight * 0.13} referencePrices={item.pricePreference} changePrice={item.priceChange} exchange={item.exchange}/>
                            </View>
                        </View>
                        <View style={{height: "25%", width: "100%",  flexDirection:"row", alignItems: "flex-end", justifyContent: "space-between"}}>
                            <View style={{backgroundColor: "#D7D7D7", height: 25, justifyContent: "center", alignItems: 'center', borderRadius: 5, margin: 6}}>
                                <Text style={{color: "black", fontWeight: "500", marginHorizontal: 8, fontSize: 12}}>
                                    {item.exchange}
                                </Text>
                            </View>
                            <View style={{height: '100%', marginRight: 10, justifyContent: "flex-end", marginBottom: 6}}>
                                <Text style={[{color: "black", fontWeight: "500", fontSize: 12}, getColorPrice(item.priceChange)]}>
                                    {getTextChangePrice(item.priceChange, item.priceChange / item.pricePreference)}
                                </Text>
                                <Text style={[{color: "black", fontSize: 18, fontWeight: '600'}, getColorPrice(item.priceChange)]}>
                                    {formatPrice(item.price)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{width: "20%", height: "100%", alignItems:"flex-start", justifyContent: "space-between",}}>
                        <View style={{margin: 10}}>
                            <SMG smg={item.smg} style={{width: 45, aspectRatio: 1}}/>
                        </View>
                        <TouchableOpacity style={{width: 45, height: 20, borderRadius: 20, backgroundColor: "#438DEA", padding: 3, margin: 8}}>
                            <IconAddWhite />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width: "100%", height: 50, flexDirection: "row", justifyContent: 'space-around', alignItems: "center", marginVertical : 10, }}>
                    <TouchableOpacity style={styles.btnInforComapany}
                        onPress={handleViewComapnyInfor}>
                        <Text style={{color: "black", fontWeight:"500"}}>Thông tin công ty</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnInforComapany}
                        onPress={handleViewLargeShareHolder}>
                        <Text style={{color: "black", fontWeight:"500"}}>Danh sách cổ đông lớn</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: "100%"}}>
                    <Text style={{color: "black", fontWeight: "600", marginBottom: 10, marginLeft: 10, fontSize: 16, textDecorationLine: "underline" }}>
                        Số liệu thống kê chính
                    </Text>
                </View>
                <View style={{width: "100%", alignItems: "center"}}>
                    {/* Chỉ giá cổ phiếu */}
                    <ListedComponent title='Chỉ số giá cổ phiếu'>
                        <FinancialRationItem item={FinanacialRatios.percentDay} value={(item.percentChangeDay * 100).toFixed(2) + "%"} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.percentWeek} value={(item.percentChangeWeek * 100).toFixed(2) + "%"} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.percentMonth} value={(item.percentChangeMonth * 100).toFixed(2) + "%"} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.priceToEarning} value={financialData.priceToEarning} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.priceToBook} value={financialData.priceToBook} onPress={handleShowModal}/>
                    </ListedComponent>
                    {/* {Chỉ số lợi nhuận} */}
                    <ListedComponent title='Chỉ số lợi nhuận'>
                        <FinancialRationItem item={FinanacialRatios.roe} value={financialData.roe} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.roa} value={financialData.roa} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.postTaxMargin} value={financialData.postTaxMargin} onPress={handleShowModal}/>
                    </ListedComponent>
                    {/* Chỉ số Lưu Chuyển Tiền và Thanh Toán */}
                    <ListedComponent title="Chỉ số lưu chuyển tiền và thanh toán">
                        <FinancialRationItem item={FinanacialRatios.daysReceivable} value={financialData.daysReceivable} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.daysInventory} value={financialData.daysInventory} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.daysPayable} value={financialData.daysPayable} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.currentPayment} value={financialData.currentPayment} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.quickPayment} value={financialData.quickPayment} onPress={handleShowModal}/>
                    </ListedComponent>
                    {/* Chỉ số Nợ và Vốn Chủ Sở Hữu */}
                    <ListedComponent title="Chỉ số nợ và vốn chủ sở hữu">
                        <FinancialRationItem item={FinanacialRatios.debtOnEquity} value={financialData.debtOnEquity} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.debtOnAsset} value={financialData.debtOnAsset} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.equityOnTotalAsset} value={financialData.equityOnTotalAsset} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.equityOnLoan} value={financialData.equityOnLoan} onPress={handleShowModal}/>
                    </ListedComponent>
                    {/* Chỉ số Lãi Suất và Chi Phí Tài Chính */}
                    <ListedComponent title="Chỉ số lãi suất và chi phí tài chính">
                        <FinancialRationItem item={FinanacialRatios.interestMargin} value={financialData.interestMargin} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.ebitOnInterest} value={financialData.ebitOnInterest} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.costOfFinancing} value={financialData.costOfFinancing} onPress={handleShowModal}/>
                    </ListedComponent>
                    {/* Chỉ số Hiệu Quả Quản Lý Chi Phí */}
                    <ListedComponent title="Chỉ số hiệu quả quản lý chi phí">
                        <FinancialRationItem item={FinanacialRatios.costToIncome} value={financialData.costToIncome} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.nonInterestOnToi} value={financialData.nonInterestOnToi} onPress={handleShowModal}/>
                    </ListedComponent>
                    {/* Chỉ số Tính Thanh Khoản và Tình Hình Tài Chính Ngắn Hạn */}
                    <ListedComponent title="Chỉ số thanh khoản và tài chính ngắn hạn">
                        <FinancialRationItem item={FinanacialRatios.currentPayment} value={financialData.currentPayment} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.quickPayment} value={financialData.quickPayment} onPress={handleShowModal}/>
                    </ListedComponent>
                    {/* Chỉ số Tăng Trưởng và Biến Động */}
                    <ListedComponent title="Chỉ số tăng trưởng và biến động">
                        <FinancialRationItem item={FinanacialRatios.epsChange} value={financialData.epsChange} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.ebitdaOnStockChange} value={financialData.ebitdaOnStockChange} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.bookValuePerShareChange} value={financialData.bookValuePerShareChange} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.creditGrowth} value={financialData.creditGrowth} onPress={handleShowModal}/>
                    </ListedComponent>
                    {/* Chỉ số Quản Lý Nợ và Rủi Ro Nợ */}
                    <ListedComponent title="Chỉ số quản lý nợ và rủi ro nợ">
                        <FinancialRationItem item={FinanacialRatios.badDebtPercentage} value={financialData.badDebtPercentage} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.provisionOnBadDebt} value={financialData.provisionOnBadDebt} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.liquidityOnLiability} value={financialData.liquidityOnLiability} onPress={handleShowModal}/>
                    </ListedComponent>
                    {/* Chỉ số Tổng Hợp và Tính Toán */}
                    <ListedComponent title="Chỉ số tổng hợp và tính toán">
                        <FinancialRationItem item={FinanacialRatios.earningPerShare} value={financialData.earningPerShare} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.bookValuePerShare} value={financialData.bookValuePerShare} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.cashOnEquity} value={financialData.cashOnEquity} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.cashOnCapitalize} value={financialData.cashOnCapitalize} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.revenueOnWorkCapital} value={financialData.revenueOnWorkCapital} onPress={handleShowModal}/>
                        <FinancialRationItem item={FinanacialRatios.revenueOnAsset} value={financialData.revenueOnAsset} onPress={handleShowModal}/>
                    </ListedComponent>
                </View>
                <View style={{height: 50}}/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default StockOverview;


const styles = StyleSheet.create({
    btnInforComapany: {
        width: windowWidth * 0.45, 
        height: "70%", 
        backgroundColor:"white", 
        alignItems: 'center', 
        justifyContent: "center",
        elevation: 5,
        borderRadius: 10,
        borderColor: "grey",
    },
    basicParamContainer: {
        width: "85%", 
        borderBottomWidth: 1, 
        height: 50,
        justifyContent:"space-between",
        flexDirection: "row",
        alignItems: "center",
        borderColor:  "#D4D4D4",
    },
    txtBasicParam : {
        color: "black",
        fontSize: 13,
        fontWeight: '600',
    },
    txtBasicValue: {
        fontSize: 13,
        fontWeight: '600',
        color:"#468ae1"
    },
    subtitle: {
        marginLeft: 6, 
        marginRight: 6, 
        fontWeight:"600", 
        fontSize: 14, 
        color: "#141ffc",
        textDecorationLine: "underline"
    },
    subTitleContainer: {
        margin: "2%", 
        alignSelf:'baseline', 
        // backgroundColor: "#b8c4ff", 
        borderRadius: 10
    },
    groupContainer : {
        width: "96%", 
        backgroundColor: "white", 
        height: "auto", 
        paddingBottom: 30, 
        alignItems: "center",
        marginVertical: 5,
        borderRadius: 15
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: '#DCDCDC',
        borderRadius: 10,
        alignItems: 'center',
        width: 320,
        height: 400
      },
      modalText: {
        fontSize: 18,
        color:"black",
        fontWeight: "800"
      },
      modalButton: {
        backgroundColor: '#c24f44',
        padding: 5,
        width: 80,
        borderRadius: 10,
        justifyContent:'center',
        alignItems:'center',
        margin: 5,
        zIndex: 1000
      },
});