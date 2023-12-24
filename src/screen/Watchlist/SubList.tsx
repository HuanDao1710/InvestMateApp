import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {View, Text, TouchableOpacity} from 'react-native'
import { TrackingStockEntity } from "../../type";
import IconBlackAdd from '../../iconSVG/IconBlackAdd';
import IconEdit from '../../iconSVG/IconEdit';
import IconAddWhite from '../../iconSVG/IconAddWhite';
import { Colors } from "react-native/Libraries/NewAppScreen";


export type ParamList = {
    trackingStocks: {
        title : string,
        listTrackingStock : TrackingStockEntity[]
    },
};

export const SublistHeader = (props: {onPressAdd : any, onPressEdit: any}) => {
    return (
        <View style={{height: "100%", width: "auto", flexDirection: "row", justifyContent:"center", alignItems:"center"}}>
            <TouchableOpacity>
                <IconBlackAdd style={{height: "35%", aspectRatio: 1, margin: "3%"}}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <IconEdit style={{height: "35%", aspectRatio: 1, margin: "3%"}}/>
            </TouchableOpacity>
        </View>
    );
}

const SubList = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<ParamList>>();
    const {title, listTrackingStock} = route.params;

    useLayoutEffect(()=> {
        navigation.setOptions({
            title: title,
            headerTitleStyle: {fontSize : 18},
            headerRight : ()=> <SublistHeader onPressAdd={()=>{}} onPressEdit={()=>{}}/>
        })
    })

    return (
        (listTrackingStock.length === 0 ? 
            (<View style={{width:"100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity
                    style= {{minWidth: 80, height: "auto", flexDirection:"row", justifyContent: "space-around", alignItems: "center", backgroundColor: "blue", borderRadius: 10}}>
                    <IconAddWhite style={{height: 20, aspectRatio: 1, margin: 5}}/>
                    <Text style={{color :"white", fontSize: 16, marginRight: 5, marginVertical: 5}}>
                        Thêm mã
                    </Text>
                </TouchableOpacity>
            </View>) 
            : 
            (<View>
                
            </View>)
        )
        
    )
}

export default SubList;