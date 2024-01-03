import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { createContext, useContext, useLayoutEffect } from "react";
import {View, Text, SafeAreaView, ScrollView, Dimensions, StyleSheet,} from 'react-native'
import { API_CORE } from "../../api";
import { CompanyOverviewDTO } from "../../type";
import RenderHTML from "react-native-render-html";
import CollapseIcon from '../../iconSVG/CollapseIcon';
import { TouchableOpacity } from "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PieChart } from "react-native-chart-kit";
import { ParamList } from "./StockDetail";
import { IP } from "../../constants";


const screenWidth = Dimensions.get("screen").width;

const HTML = (props:{title: string ,source: string}) => {
    const {title, source} = props;
    const [isExpanded, setIsExpanded] = React.useState(false);
    if(!source) return <></>
    const text = isExpanded ? source : source.slice(0, 10 * 50) + '...';
    return (
        <View style={{width: screenWidth - 20, height: "auto",  borderRadius: 15, margin: "2%", marginVertical: 10,  overflow:"hidden", elevation: 2, backgroundColor:'#B8C4FF',}}>
            <View style={{elevation: 1, borderBottomWidth: 1, borderColor: "#DCDCDC", borderTopStartRadius: 15, borderTopEndRadius: 15, height: 40, justifyContent:"space-between", backgroundColor:"white", flexDirection: "row", alignItems: "center", width: screenWidth - 25 }}>
                <Text style={{color:"#4456AD", fontWeight:"600", marginHorizontal: 15, fontSize: 15,}}>{title}</Text>
                <TouchableOpacity style={{margin: 5}}
                    onPress={() =>setIsExpanded(!isExpanded)}>
                    <CollapseIcon style={[{width: 24, aspectRatio: 1, }, (isExpanded && {transform: [{ rotate: '180deg' }]})]}/>
                </TouchableOpacity>
            </View>
            <View style={{width: '100%', height: "auto", borderBottomStartRadius: 15, borderBottomEndRadius: 15, overflow:"hidden", backgroundColor:'white' }}>
                <RenderHTML
                contentWidth={screenWidth - 20}
                source={{ html: `<div style="font-size: 38; margin-left: 10px;  margin-right: 10px; font-family: 'Arial', sans-serif; color: black;>${text}</div>`}} 
                />
            </View>
            <View style={{height: 5}}/>
        </View>
    )
};

const OverView = () => {
    const companyInfoContext = useContext(CompanyInfoContext);
    const companyInfo = companyInfoContext.companyInfo;
    return(
        <SafeAreaView style={{ flex: 1, alignItems: "center"}}>
            {companyInfo && (
                <ScrollView >
                <View style={{height:10}}/>
                <HTML title ="Tổng quan" source={companyInfo.companyProfile}/>
                <HTML title ="Lịch sử hình thành" source={companyInfo.historyDev}/>
                <HTML title ="Sự kiện quan trọng" source={companyInfo.keyDevelopments}/>
                <HTML title ="Chiến lược kinh doanh" source={companyInfo.businessStrategies}/>
                <HTML title ="Cam kết công ty" source={companyInfo.companyPromise}/>
                <HTML title ="Rủi ro kinh doanh" source={companyInfo.businessRisk}/>
                <View style={{height:50}}/>
            </ScrollView>
            )}
      </SafeAreaView>
    )

}

const BasicInfo = () => {
    const companyInfoContext = useContext(CompanyInfoContext);
    const companyInfo = companyInfoContext.companyInfo;

    return (
        <SafeAreaView style={{flex: 1,}}>
            {companyInfo&& (
                <ScrollView>
                <View style={{width: screenWidth, alignItems:"center"}}>
                <View style={{width: "70%", justifyContent:"center", alignItems:"center", margin: 20}}>
                    <Text style={{color: "#468ae1", fontSize: 20, fontWeight: "800", textAlign:"center"}}>
                        {companyInfo.companyName}
                    </Text>
                </View>
                <View style={{width: screenWidth - 20, height: "auto",  borderRadius: 15, margin: "2%", marginVertical: 10,  overflow:"hidden", elevation: 2, backgroundColor:'#B8C4FF',}}>
                    <View style={{elevation: 1, borderBottomWidth: 1, borderColor: "#DCDCDC", borderTopStartRadius: 15, borderTopEndRadius: 15, height: 40, justifyContent:"space-between", backgroundColor:"white", flexDirection: "row", alignItems: "center", width: screenWidth - 25 }}>
                        <Text style={{color:"#4456AD", fontWeight:"600", marginHorizontal: 15, fontSize: 15,}}>{"Cơ bản"}</Text>
                    </View>
                    <View style={{width: '100%', height: "auto", borderBottomStartRadius: 15, borderBottomEndRadius: 15, overflow:"hidden", backgroundColor:'white', alignItems:'center'}}>
                        <View style={styles.basicInfoContainer}>
                            <Text style={styles.basicInfoTxtKey}>Tên ngắn: </Text>
                            <Text style={styles.basicInfoTxtValue}>{companyInfo.shortName}</Text>
                        </View>
                        <View style={styles.basicInfoContainer}>
                            <Text style={styles.basicInfoTxtKey}>Website: </Text>
                            <Text style={[styles.basicInfoTxtValue, {textDecorationLine:"underline"}]}>{companyInfo.website}</Text>
                        </View>
                        <View style={styles.basicInfoContainer}>
                            <Text style={styles.basicInfoTxtKey}>Mã cổ phiếu: </Text>
                            <Text style={styles.basicInfoTxtValue}>{companyInfo.code}</Text>
                        </View>
                        <View style={styles.basicInfoContainer}>
                            <Text style={styles.basicInfoTxtKey}>Sàn giao dịch: </Text>
                            <Text style={styles.basicInfoTxtValue}>{companyInfo.exchange}</Text>
                        </View>
                        <View style={styles.basicInfoContainer}>
                            <Text style={styles.basicInfoTxtKey}>Số lượng nhân viên: </Text>
                            <Text style={styles.basicInfoTxtValue}>{companyInfo.noEmployees}</Text>
                        </View>
                        <View style={styles.basicInfoContainer}>
                            <Text style={styles.basicInfoTxtKey}>Số lượng cổ đông: </Text>
                            <Text style={styles.basicInfoTxtValue}>{companyInfo.noShareholders}</Text>
                        </View>
                        <View style={styles.basicInfoContainer}>
                            <Text style={styles.basicInfoTxtKey}>Tên nghành: </Text>
                            <Text style={styles.basicInfoTxtValue}>{companyInfo.industry}</Text>
                        </View> 
                        <View style={styles.basicInfoContainer}>
                            <Text style={styles.basicInfoTxtKey}>Tên nghành(Tiếng anh): </Text>
                            <Text style={styles.basicInfoTxtValue}>{companyInfo.industryEn}</Text>
                        </View> 
                        <View style={styles.basicInfoContainer}>
                            <Text style={styles.basicInfoTxtKey}>Năm thành lập: </Text>
                            <Text style={styles.basicInfoTxtValue}>{companyInfo.establishedYear}</Text>
                        </View>
                    </View>
                    <View style={{height: 5}}/>
                </View>
                <View style={{width: screenWidth - 20, height: "auto",  borderRadius: 15, margin: "2%", marginVertical: 10,  overflow:"hidden", elevation: 2, backgroundColor:'#B8C4FF',}}>
                    <View style={{elevation: 1, borderBottomWidth: 1, borderColor: "#DCDCDC", borderTopStartRadius: 15, borderTopEndRadius: 15, height: 40, justifyContent:"space-between", backgroundColor:"white", flexDirection: "row", alignItems: "center", width: screenWidth - 25 }}>
                        <Text style={{color:"#4456AD", fontWeight:"600", marginHorizontal: 15, fontSize: 15,}}>Cổ phiếu và doanh nghiệp</Text>
                    </View>
                    <View style={{width: '100%', height: "auto", borderBottomStartRadius: 15, borderBottomEndRadius: 15, overflow:"hidden", backgroundColor:'white', alignItems:'center'}}>
                    <View style={styles.basicInfoContainer}>
                    <Text style={styles.basicInfoTxtKey}>Số lượng cổ phiếu đã phát hành: </Text>
                    <Text style={styles.basicInfoTxtValue}>{companyInfo.issueShare} triệu</Text>
                </View>
                <View style={styles.basicInfoContainer}>
                    <Text style={styles.basicInfoTxtKey}>Số lượng cổ phiếu đang lưu hành: </Text>
                    <Text style={styles.basicInfoTxtValue}>{companyInfo.outstandingShare} triệu</Text>
                </View>
                <View style={styles.basicInfoContainer}>
                    <Text style={styles.basicInfoTxtKey}>Loai công ty: </Text>
                    <Text style={styles.basicInfoTxtValue}>{companyInfo.companyType}</Text>
                </View> 
                <View style={styles.basicInfoContainer}>
                    <Text style={styles.basicInfoTxtKey}>Loại doanh nghiệp: </Text>
                    <Text style={styles.basicInfoTxtValue}>{companyInfo.businessType}</Text>
                </View>
                
                </View>
                <View style={{height: 5}}/>
            </View>
                <View style={{width: screenWidth - 20, height: "auto",  borderRadius: 15, margin: "2%", marginVertical: 10,  overflow:"hidden", elevation: 2, backgroundColor:'#B8C4FF',}}>
                    <View style={{elevation: 1, borderBottomWidth: 1, borderColor: "#DCDCDC", borderTopStartRadius: 15, borderTopEndRadius: 15, height: 40, justifyContent:"space-between", backgroundColor:"white", flexDirection: "row", alignItems: "center", width: screenWidth - 25 }}>
                        <Text style={{color:"#4456AD", fontWeight:"600", marginHorizontal: 15, fontSize: 15,}}>Khối cơ cấu sở hữu</Text>
                    </View>
                <View style={{width: '100%', height: "auto", borderBottomStartRadius: 15, borderBottomEndRadius: 15, overflow:"hidden", backgroundColor:'white', alignItems:'center'}}>
                <View style={{width: "90%", margin: 3, backgroundColor:"white", borderRadius: 10, padding: 5, justifyContent:"center", alignItems:"center"}}>
                    <PieChart
                        data={[{
                            name: '% Nước ngoài',
                            population: parseFloat((companyInfo.foreignPercent * 100).toFixed(2)),
                            color: 'orange'
                          },
                          {
                            name: '% Trong nước',
                            population: parseFloat(((1 - companyInfo.foreignPercent) * 100).toFixed(2)),
                            color: 'gold'
                        },]}
                        width={screenWidth * 0.8}
                        height={screenWidth * 0.4}
                        chartConfig={{
                            color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                        />
                    </View>
                    </View>
                    <View style={{height: 5}}/>
                </View>
                <View style={{height: 50}}/>
                </View>                
            </ScrollView>
            )}
        </SafeAreaView>
    )
}





const Tab = createMaterialTopTabNavigator();
const CompanyInfoContext = createContext<{
    companyInfo: CompanyOverviewDTO | undefined}
>({
    companyInfo: undefined
});

const CompanyInfo = () => {
    const [companyInfo, setCompanyInfo] = React.useState<CompanyOverviewDTO>();
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<ParamList>>();
    const {item} = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({ 
            title: "Thông tin công ty",
            headerTitleStyle: {fontSize: 18}
        });
    })

    const getOverviewInfo = async () => {
        try {
            const res = await API_CORE.get<any>(
              `http://${IP}:8080/invest_mate/api/stock_detail/overview_info`,
              {
                params : {
                    code: item.code
                }
              }
            );
            if (res.status === 200) {
                // console.log(res.data)
                setCompanyInfo(res.data)
            } else {
              console.log("FETCH FAIL! Status Code: " + res.status);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    React.useEffect(()=> {
        getOverviewInfo();
    },[])

    return(
        <CompanyInfoContext.Provider value={{companyInfo}}>
            <Tab.Navigator screenOptions={{
            tabBarLabelStyle: { fontSize: 14 , textTransform:"none", color:"black", fontWeight:"500",},            
          }}>
            <Tab.Screen name="Thông tin cơ bản" component={BasicInfo} />
            <Tab.Screen name="Thông tin tổng quan" component={OverView} />
        </Tab.Navigator>
        </CompanyInfoContext.Provider>
    )
}
export default CompanyInfo;

const styles = StyleSheet.create({
    basicInfoContainer: {
        width: "98%",
        alignItems:"center",
        flexDirection:'row',
        justifyContent:"space-between",
        borderBottomColor:"#DCDCDC",
        borderBottomWidth: 0.5,
        margin : 2,
        backgroundColor:"white",
        borderRadius: 10, 
        padding: 5
    },
    basicInfoTxtKey : {
        color: "black",
        fontWeight: "500",
        fontSize: 14
    },
    basicInfoTxtValue : {
        color: "#468ae1",
        fontWeight: "500",
        fontSize: 14,
        margin : 5,
        flex: 1,
        textAlign:"right"
    },


})