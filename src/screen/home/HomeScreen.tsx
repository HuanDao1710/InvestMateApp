import React from 'react';
import {Text, View, StyleSheet, ScrollView, Dimensions, Touchable, TouchableOpacity} from 'react-native';
import { DataTable } from 'react-native-paper';
import IconTime from '../../IconSVG/IconTime';
import IconChart from '../../IconSVG/IconChart';
import SMG from '../../common/SMG';
import IconSmallAdd from '../../IconSVG/IconSmallAdd';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

interface IndexPropsStyle {
    name: string,
    updateTime: string,
    price: number,
    volume: number,
    transactionValue: number,
    change: number,
    percentChange: string
}

interface TopStockPropsStyle {
    code : string,
    chart: any,
    smg : any,
    price: number,
    changeD : number,
    changeW : number,
    changeM : number    
}

interface TopIndustryPropsStyle {
    id: string,
    name: string,
    smg : number,
    changeD : number,
    changeW : number,
    changeM : number
}

const listStockIndexs = [
    {
        name: "VN INDEX",
        updateTime: "14:58:04",
        price:1125.53,
        volume: 687.40,
        transactionValue: 14.78,
        change: 3.03,
        percentChange: "0.27%"
    },
    {
        name: "HNX30",
        updateTime: "14:58:04",
        price:1125.53,
        volume: 687.40,
        transactionValue: 14.78,
        change: -3.03,
        percentChange: "-0.27%"
    },
]
const listTopStock = [
    {
        code : "EVF",
        chart: <IconChart style={{width: "90%", height: "75%"}}/>,
        smg : 100,
        price: 15400,
        changeD : 0.034,
        changeW : 0.189,
        changeM : 0.363
    },
    {
        code : "NHH",
        chart: <IconChart style={{width: "90%", height: "75%"}}/>,
        smg : 99,
        price: 15400,
        changeD : -0.034,
        changeW : 0.189,
        changeM : -0.363
    },
    {
        code : "VGS",
        chart: <IconChart style={{width: "90%", height: "75%"}}/>,
        smg : 99,
        price: 15400,
        changeD : 0.034,
        changeW : -0.189,
        changeM : 0.363
    },
    {
        code : "PDR",
        chart: <IconChart style={{width: "90%", height: "75%"}}/>,
        smg : 98,
        price: 15400,
        changeD : 0.034,
        changeW : 0.189,
        changeM : 0.363
    },
    {
        code : "CTD",
        chart: <IconChart style={{width: "90%", height: "75%"}}/>,
        smg : 97,
        price: 15400,
        changeD : 0.034,
        changeW : -0.189,
        changeM : 0.363
    },
]

const listTopIndustry= [
    {
        id: "0",
        name: "Dịch vụ viễn thông và truyền hình số",
        smg : 93,
        changeD : 0.034,
        changeW : 0.189,
        changeM : 0.363
    },
    {
        id: "1",
        name: "Mô giới chứng khoán",
        smg : 89,
        changeD : -0.034,
        changeW : 0.189,
        changeM : 0.019
    },
    {
        id: "2",
        name: "Hoá chất",
        smg : 89,
        changeD : 0.034,
        changeW : 0.189,
        changeM : -0.019
    },
    {
        id: "3",
        name: "Kim loại và khai thác",
        smg : 89,
        changeD : 0.034,
        changeW : 0.189,
        changeM : 0.019
    },
    {
        id: "4",
        name: "thiết bị và dịch vụ",
        smg : 89,
        changeD : 0.034,
        changeW : -0.189,
        changeM : 0.019
    }
]

const indexContent = (data : IndexPropsStyle) =>{
    const priceColor = data.change > 0 ? {color: "#37c284"} : {color : "#f65959"}
    return (
        <View style={styles.indexContent}>
            <View style={{height:"60%", width: "100%", borderBottomWidth: 0.5, alignItems: "center", justifyContent: "center"}}>
                <Text style={{color: "black"}}>Chart</Text>
            </View>
            <View style={{width: "100%", height: "40%", justifyContent: "center", alignItems: "center"}}>
                <View style={styles.indexContentDetail}>
                    <Text style={{color: "black", fontSize: 14, fontWeight: "600"}}>{data.name}</Text>
                    <Text style={[{fontSize: 16, fontWeight: "600"}, priceColor]}>{data.price}</Text>
                </View>
                <View style={[styles.indexContentDetail, {height:"30%"}]}>
                    <View style={{width: "auto", height: "auto", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                        <IconTime style={{width: 10, height: 10, marginRight: 5}}/>
                        <Text style={{color: "#7e7e7e", fontSize: 10}}>{data.updateTime}</Text>
                    </View>
                    <Text style={[{fontSize: 10, fontWeight: "600"},priceColor]}>{data.change}/{data.percentChange}</Text>
                </View>
                <View style={[styles.indexContentDetail, {height: "30%"}]}>
                    <Text style={{color:"#7e7e7e", fontSize: 12}}>{data.volume} triệu</Text>
                    <Text style={{color:"#7e7e7e", fontSize: 12}}>{data.transactionValue} nghìn tỷ</Text>
                </View>
            </View>                          
        </View>
    )
}

const renderItemTopStock = (props : TopStockPropsStyle) : React.JSX.Element => {
    const colorStyle = (n : number) => {
        if( n < 0) return {color: "#f65959"}
        return {}
    }
    return (
        <DataTable.Row key={props.code}> 
            <DataTable.Cell style={styles.cell}>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: "center", alignItems: "center",}}>
                    <Text style={[styles.textCell, {color: "black", width: "55%"}]}>{props.code}</Text>
                    <IconSmallAdd style={{width: 12, height: 12, margin: "10%"}}/>
                </TouchableOpacity>
                
            </DataTable.Cell> 
            <DataTable.Cell style={styles.cell}>{props.chart}</DataTable.Cell> 
            <DataTable.Cell style={styles.cell}>
                <SMG dimension={9} smg={props.smg}/>
            </DataTable.Cell>
            <DataTable.Cell style={styles.cell}>
                <Text style={styles.textCell}>{props.price}</Text>
            </DataTable.Cell> 
            <DataTable.Cell style={styles.cell}>
                <Text style={[styles.textCell, colorStyle(props.changeD)]}>{(props.changeD * 100).toFixed(2)}%</Text>
            </DataTable.Cell> 
            <DataTable.Cell style={styles.cell}>
                <Text style={[styles.textCell, colorStyle(props.changeW)]}>{(props.changeW * 100).toFixed(2)}%</Text>
            </DataTable.Cell> 
            <DataTable.Cell style={styles.cell}>
                <Text style={[styles.textCell, colorStyle(props.changeM)]}>{(props.changeM * 100).toFixed(2)}%</Text>
            </DataTable.Cell> 
        </DataTable.Row> 
    );
}

const renderItemTopIndustry = (props : TopIndustryPropsStyle) : React.JSX.Element => {
    const colorStyle = (n : number) => {
        if( n < 0) return {color: "#f65959"}
        return {}
    }
    return (
        <DataTable.Row key={props.id}> 
            <DataTable.Cell style={[styles.cell, {flex: 3}]}>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: "center", alignItems: "center",}}>
                    <Text style={[styles.textCell, {color: "black"}]}>{props.name}</Text>
                </TouchableOpacity>
            </DataTable.Cell>  
            <DataTable.Cell style={styles.cell}>
                <SMG dimension={9} smg={props.smg}/>
            </DataTable.Cell>
            <DataTable.Cell style={styles.cell}>
                <Text style={[styles.textCell, colorStyle(props.changeD)]}>{(props.changeD * 100).toFixed(2)}%</Text>
            </DataTable.Cell> 
            <DataTable.Cell style={styles.cell}>
                <Text style={[styles.textCell, colorStyle(props.changeW)]}>{(props.changeW * 100).toFixed(2)}%</Text>
            </DataTable.Cell> 
            <DataTable.Cell style={styles.cell}>
                <Text style={[styles.textCell, colorStyle(props.changeM)]}>{(props.changeM * 100).toFixed(2)}%</Text>
            </DataTable.Cell> 
        </DataTable.Row> 
    );
}

const HomeScreen = () =>{
    const [updateTime, setUpdateTime] = React.useState<String>("18/11/2023");
    return (
        <ScrollView>
            <View style={{width: windowWidth, height: "auto", alignItems: "center", backgroundColor: "#f0f0f0",}}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Tổng quan
                    </Text>
                    <Text style={styles.updateTime}>
                        Ngày cập nhật: {updateTime}
                    </Text>
                </View>
                <View style={styles.index}>
                    <View style={{height: "auto", width: "100%", marginBottom: "1%", marginTop: '1%'}}>
                        <Text style={{color: "black", fontSize : 16, fontFamily: "roboto",  fontWeight:"600",marginLeft: 20 }}>
                            Chỉ số
                        </Text>
                    </View>
                    <View style={{height: "74%", backgroundColor :"#f4f5f7", flexDirection: "row", alignItems: "center", width: "100%"}}>
                        {indexContent(listStockIndexs[0])}
                        <View style={{width: 1,height: "50%", borderWidth: 0.5, borderColor:"#727272", borderStyle: 'dashed'}}/>                       
                        {indexContent(listStockIndexs[1])}
                    </View>
                </View>
                <View style={styles.topStock}>
                    <View style={{height: "auto", width: "100%",marginBottom: '1%', marginTop: "1%"}}>
                        <Text style={{color: "black", fontSize : 16, fontFamily: "roboto",  fontWeight:"600", marginLeft: 20, }}>
                            Top cổ phiếu
                        </Text>
                    </View>
                    <View style={styles.tableContainer}>
                        <View style={{margin: "2%", alignSelf:'baseline', backgroundColor: "#b8c4ff", borderRadius: 10}}>
                            <Text style={{marginLeft: 6, marginRight: 6, fontWeight:"600", fontSize: 12, color: "#141ffc"}}>
                                Top cổ phiếu mạnh nhất
                            </Text>
                        </View>
                        <View style={{width: "100%", height: "auto",}}>
                            <DataTable>
                                <DataTable.Header> 
                                    <DataTable.Title style={styles.cell}>Mã</DataTable.Title> 
                                    <DataTable.Title style={styles.cell}>Chart</DataTable.Title> 
                                    <DataTable.Title style={styles.cell}>SMG</DataTable.Title> 
                                    <DataTable.Title style={styles.cell}>Giá</DataTable.Title> 
                                    <DataTable.Title style={styles.cell}>%D</DataTable.Title> 
                                    <DataTable.Title style={styles.cell}>%W</DataTable.Title> 
                                    <DataTable.Title style={styles.cell}>%M</DataTable.Title> 
                                </DataTable.Header>
                                {listTopStock.map((item : TopStockPropsStyle) => renderItemTopStock(item))}
                            </DataTable>
                        </View>
                    </View>           
                </View>
                <View style={styles.topStock}>
                    <View style={{height: "auto", width: "100%",marginBottom: '1%', marginTop: "1%"}}>
                        <Text style={{color: "black", fontSize : 16, fontFamily: "roboto",  fontWeight:"600", marginLeft: 20, }}>
                            Top ngành
                        </Text>
                    </View>
                    <View style={styles.tableContainer}>
                        <View style={{margin: "2%", alignSelf:'baseline', backgroundColor: "#b8c4ff", borderRadius: 10}}>
                            <Text style={{marginLeft: 6, marginRight: 6, fontWeight:"600", fontSize: 12, color: "#141ffc"}}>
                                Top ngành mạnh nhất
                            </Text>
                        </View>
                        <View style={{width: "100%", height: "auto",}}>
                            <DataTable>
                                <DataTable.Header> 
                                    <DataTable.Title style={[styles.cell, {flex: 3}]}>Tên ngành</DataTable.Title> 
                                    <DataTable.Title style={styles.cell}>SMG</DataTable.Title> 
                                    <DataTable.Title style={styles.cell}>%D</DataTable.Title> 
                                    <DataTable.Title style={styles.cell}>%W</DataTable.Title> 
                                    <DataTable.Title style={styles.cell}>%M</DataTable.Title> 
                                </DataTable.Header>
                                {listTopIndustry.map((item : TopIndustryPropsStyle) => renderItemTopIndustry(item))}
                            </DataTable>
                        </View>
                    </View>           
                </View>
            </View>
            <View style={{paddingBottom : "15%"}}></View>
        </ScrollView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    titleContainer: {
        width: "100%", 
        height: windowHeight * 0.05, 
        justifyContent:"space-between", 
        alignItems: "center", 
        flexDirection: "row"
    },
    title: {
        fontSize: 15, 
        color: "black", 
        fontWeight: "700", 
        marginLeft: 10, 
        fontFamily: "Roboto", 
        borderBottomWidth: 1
    },
    updateTime: {
        marginRight: 10,
        color: "black",
        fontSize: 10,
        bottom: -5,
    },
    index: {
        backgroundColor: "white",
        width: "100%",
        height: windowHeight * 0.3,
        margin: "1%",
        borderRadius: 20,
    },
    indexContent : {
        height: "100%",
        width: "50%"
    },
    indexContentDetail: {
        height: "40%", 
        width: "90%", 
        alignItems: "center", 
        justifyContent: "space-between", 
        flexDirection:'row'
    }
    ,
    topStock : {
        backgroundColor: "white",
        width: "100%",
        height: "auto",
        margin: "1%",
        borderRadius: 20,
        alignItems : "center",
    },
    tableContainer: {
        width: "90%",
        borderWidth: 1,
        height: "auto",
        borderRadius: 10,
        borderColor : "#b4b4b3",
        marginBottom: 30
    },
    textCell : {
        color : "#1DC787",
        fontSize: 11
    },
    cell: {
        alignItems: "center"
    },
    industyCell: {
        alignItems: "center"
    }
});


