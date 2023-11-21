import React, {useLayoutEffect, useState, useRef, useEffect} from "react";
import {View, ViewStyle, Text, StyleSheet, LayoutChangeEvent,} from 'react-native';

interface SMGPropsStyle {
    style? : ViewStyle,
    smg: number,
}


const SMG = (props : SMGPropsStyle) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const getDimesion = ( event : any) => {
        setWidth(event.nativeEvent.layout.width);
        setHeight(event.nativeEvent.layout.width);
    }

    return (
        <View style={[styles.border, {borderWidth: width /15, }, props.style]} onLayout={getDimesion}>
            <Text style={[styles.text, {fontSize: width / 3}]}>{props.smg}</Text>
        </View>
    );
}

export default SMG;

const styles = StyleSheet.create({
    border: {
        borderRadius: 1000, 
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
