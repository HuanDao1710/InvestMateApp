import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {View, Text} from 'react-native'

const CompanyInfo = () => {
    const navigation = useNavigation<any>();
    useLayoutEffect(() => {
        navigation.setOptions({ 
            title: "Thông tin công ty",
            headerTitleStyle: {fontSize: 18}
        });
    })

    return(
        <View style={{width: "100%", height: "100%", justifyContent: "center", alignItems: 'center'}}>
            <Text style={{color: "black"}}>
                Thông tin công ty
            </Text>
        </View>
    )
}
export default CompanyInfo;