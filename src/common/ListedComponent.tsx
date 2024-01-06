import React, { ReactNode } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

const screenWidth = Dimensions.get("screen").width;

type ListedComponentProps = {
    title: string;
    children?: ReactNode;
}

const ListedComponent : React.FC<ListedComponentProps> = (props: ListedComponentProps)  => {
    const {title} = props;
    return (
        <View style={{width: screenWidth - 20, height: "auto",  borderRadius: 15, margin: "2%", marginVertical: 10,  overflow:"hidden", elevation: 2, backgroundColor:'#B8C4FF',}}>
            <View style={{elevation: 1, borderBottomWidth: 1, borderColor: "#DCDCDC", borderTopStartRadius: 15, borderTopEndRadius: 15, height: 40, justifyContent:"space-between", backgroundColor:"white", flexDirection: "row", alignItems: "center", width: screenWidth - 25 }}>
                <Text style={{color:"#3961F8", fontWeight:"800", marginHorizontal: 15, fontSize: 15,}}>{title}</Text>
            </View>
            <View style={{width: '100%', height: "auto", borderBottomStartRadius: 15, borderBottomEndRadius: 15, overflow:"hidden", backgroundColor:'white', justifyContent:'center', alignItems:'center' }}>
                {props.children}
            </View>
        <View style={{height: 3}}/>
    </View>
    )
}

export default ListedComponent;