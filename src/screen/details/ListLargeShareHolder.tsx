import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {View, Text} from 'react-native'

const ListLargeShareHolder = () => {
    const navigation = useNavigation<any> ();
    useLayoutEffect(() => {
        navigation.setOptions({ 
            title: "Danh sách cổ đông lớn",
            headerTitleStyle: {fontSize: 18}
        });
    })

    return(
        <View style={{width: "100%", height: "100%", justifyContent: "center", alignItems: 'center'}}>
            <Text style={{color: "black"}}>
                Dánh sách cổ đông lớn
            </Text>
        </View>
    )
}
export default ListLargeShareHolder;