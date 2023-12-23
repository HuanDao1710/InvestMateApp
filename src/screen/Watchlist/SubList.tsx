import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {View, Text, TouchableOpacity} from 'react-native'

const SubList = () => {
    const navigation = useNavigation<any>();
    useLayoutEffect(()=> {
        navigation.setOptions({
            title: "Default",
            
        })
    })

    return (
        <View>

        </View>
    )
}

export default SubList;