import React from "react";
import {View, ViewStyle, Text, StyleSheet} from 'react-native';

interface SMGPropsStyle {
    style? : ViewStyle,
    smg: number,
    dimension: number,
}


const SMG = (props : SMGPropsStyle) => {
    const dimension = props.dimension;
    return (
        <View style={[styles.border, {borderWidth: dimension / 5, width: dimension * 3}, props.style]}>
            <Text style={[styles.text, {fontSize: dimension}]}>{props.smg}</Text>
        </View>
    );
}

export default SMG;

const styles = StyleSheet.create({
    border: {
        borderRadius: 1000, 
        aspectRatio: 1,
        borderColor: "#1DC787",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "#1DC787",
        margin: "5%",
        fontWeight:"bold"
    }
})
