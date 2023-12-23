import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';


const StockNews = () => {
    const navigation = useNavigation<any>();
    useLayoutEffect(() => {
        navigation.setOptions({ 
            title: 'Tin tức',
            headerStyles: {}
        });
    })

    return (
        <View style={{width: "100%", height: "100%",}}>
            <ScrollView>
                <View>
                    <Text style={{fontSize: 10, color: "grey", position:"absolute", right: 0, margin: 6}}>
                        Ngày cập nhật: 10/11/2023
                    </Text>
                </View>
                <View style={{width: "100%", height: "auto", marginTop: 28, alignItems: 'center', paddingBottom: 30}}>
                    <View style={styles.newsContainer}>
                        <View style={styles.newsImageContainer}>
                            <Text style={{color:"black"}}>(IMAGE)</Text>
                        </View>
                        <View style={styles.newsContentContainer}>
                            <Text style={{color: "black", fontSize: 16, fontWeight: '500',  marginLeft: 10}}>Title</Text>
                            <Text style={{color: "black", fontSize: 14, marginLeft: 10}}>Spitnet</Text>
                            <Text style={{color: "grey",  marginLeft: 10}}>(source)</Text>
                        </View>
                    </View>
                    <View style={styles.newsContainer}>
                        <View style={styles.newsImageContainer}>
                            <Text style={{color:"black"}}>(IMAGE)</Text>
                        </View>
                        <View style={styles.newsContentContainer}>
                            <Text style={{color: "black", fontSize: 16, fontWeight: '500',  marginLeft: 10}}>Title</Text>
                            <Text style={{color: "black", fontSize: 14, marginLeft: 10}}>Spitnet</Text>
                            <Text style={{color: "grey",  marginLeft: 10}}>(source)</Text>
                        </View>
                    </View>
                    <View style={styles.newsContainer}>
                        <View style={styles.newsImageContainer}>
                            <Text style={{color:"black"}}>(IMAGE)</Text>
                        </View>
                        <View style={styles.newsContentContainer}>
                            <Text style={{color: "black", fontSize: 16, fontWeight: '500',  marginLeft: 10}}>Title</Text>
                            <Text style={{color: "black", fontSize: 14, marginLeft: 10}}>Spitnet</Text>
                            <Text style={{color: "grey",  marginLeft: 10}}>(source)</Text>
                        </View>
                    </View>
                    <View style={styles.newsContainer}>
                        <View style={styles.newsImageContainer}>
                            <Text style={{color:"black"}}>(IMAGE)</Text>
                        </View>
                        <View style={styles.newsContentContainer}>
                            <Text style={{color: "black", fontSize: 16, fontWeight: '500',  marginLeft: 10}}>Title</Text>
                            <Text style={{color: "black", fontSize: 14, marginLeft: 10}}>Spitnet</Text>
                            <Text style={{color: "grey",  marginLeft: 10}}>(source)</Text>
                        </View>
                    </View>
                    <View style={styles.newsContainer}>
                        <View style={styles.newsImageContainer}>
                            <Text style={{color:"black"}}>(IMAGE)</Text>
                        </View>
                        <View style={styles.newsContentContainer}>
                            <Text style={{color: "black", fontSize: 16, fontWeight: '500',  marginLeft: 10}}>Title</Text>
                            <Text style={{color: "black", fontSize: 14, marginLeft: 10}}>Spitnet</Text>
                            <Text style={{color: "grey",  marginLeft: 10}}>(source)</Text>
                        </View>
                    </View>
                    <View style={styles.newsContainer}>
                        <View style={styles.newsImageContainer}>
                            <Text style={{color:"black"}}>(IMAGE)</Text>
                        </View>
                        <View style={styles.newsContentContainer}>
                            <Text style={{color: "black", fontSize: 16, fontWeight: '500',  marginLeft: 10}}>Title</Text>
                            <Text style={{color: "black", fontSize: 14, marginLeft: 10}}>Spitnet</Text>
                            <Text style={{color: "grey",  marginLeft: 10}}>(source)</Text>
                        </View>
                    </View>
                    <View style={styles.newsContainer}>
                        <View style={styles.newsImageContainer}>
                            <Text style={{color:"black"}}>(IMAGE)</Text>
                        </View>
                        <View style={styles.newsContentContainer}>
                            <Text style={{color: "black", fontSize: 16, fontWeight: '500',  marginLeft: 10}}>Title</Text>
                            <Text style={{color: "black", fontSize: 14, marginLeft: 10}}>Spitnet</Text>
                            <Text style={{color: "grey",  marginLeft: 10}}>(source)</Text>
                        </View>
                    </View>
                    
                </View>
            </ScrollView>
        </View>
    )
}

export default StockNews;

const styles = StyleSheet.create({
    newsContainer: {
        width: "96%",
        height: 'auto',
        backgroundColor: "white",
        margin: 5,
        flexDirection: "row"   
    },
    newsImageContainer: {
        borderWidth: 1, 
        height: 100, 
        aspectRatio: 1.5,
        justifyContent: "center",
        alignItems: "center"
    },
    newsContentContainer: {
        flex: 1,
        justifyContent: 'center'
    }
});