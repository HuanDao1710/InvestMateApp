import React, { useLayoutEffect } from "react";
import {View, TouchableOpacity, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StockOverview from "./StockOverview";
import StockAnanlysis from "./StockAnalysis";
import StockNews from "./StockNews";
import IconSearch from '../../iconSVG/IconSearch';
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ParamList } from "../../type";
import { StockInfoProps } from "../../type";

const Tab = createMaterialTopTabNavigator();

const Header = (props : {name : string, exchange : string}) => {
    return(
        <View style={{width: "100%", height: "100%", }}>
            <Text style={{color: "black", fontSize: 16, fontWeight:"600"}}>{props.name}</Text>
            <Text style={{color: "grey", fontSize: 15, fontWeight: "600"}}>{props.exchange}</Text>
        </View>
    )
}

const StockDetail = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<ParamList>>();
    const {item} = route.params;
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA")
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Header name={item.name} exchange={item.exchange}/>, 
            headerTitleStyle: {fontSize: 18},
            headerRight: () => (
            <TouchableOpacity
                style={{margin: 15}}
                onPress={()=>{console.log("do something!")}}>
                <IconSearch style={{width: 30, aspectRatio: 1}}/>                
            </TouchableOpacity> 
            ),
            headerStyle: {
                borderBottomColor: '#F0F0F0', // Màu sắc của ranh giới
                borderBottomWidth: 1, // Độ dày của ranh giới
            },
        }
    );})

    return (
        <Tab.Navigator screenOptions={{
            tabBarLabelStyle: { fontSize: 14 , textTransform:"none", color:"black", fontWeight:"500",},            
          }}>
            <Tab.Screen name="StockOverview" component={StockOverview} initialParams={{item}}/>
            <Tab.Screen name="StockAnalysis" component={StockAnanlysis} initialParams={{item}}/>
            <Tab.Screen name="StockNews" component={StockNews} initialParams={{item}}/>
        </Tab.Navigator>
    )
}
export default StockDetail;