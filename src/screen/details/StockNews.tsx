import { NavigationContainer, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import WebView from 'react-native-webview';
import { ParamList } from './StockDetail';
import { COLOR } from '../../constants';

const screenWidth= Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const NewsView = () => {
    const route = useRoute<any>();
    const {link} = route.params;
    const navigation = useNavigation<any>();
    const [loading, setLoading] = React.useState(true);
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: "Tin tức",
            headerTitleStyle: {color:"black"}
        })
    },[])
    // const link ="https://vietstock.vn/2023/11/phan-tich-ky-thuat-phien-chieu-1711-chi-so-va-khoi-luong-cung-giam-585-1123120.htm"

    const runFirst = `
        const element = document.querySelector('div.article-content');
        const body = document.body;
        while(body.firstChild) {
        body.removeChild(body.firstChild);
        }
        body.appendChild(element);
        window.ReactNativeWebView.postMessage('done');
        true; //
    `;
    
    return (
        <SafeAreaView style={{flex: 1, alignItems:"center", backgroundColor:'white'}}>
            <View style={{width:"94%", height: "100%", borderTopWidth: 1, borderColor: "#DADADA"}}>
                {loading&&(
                    <View style={{position:"absolute", width: "100%", height:"100%", alignItems:"center", top: screenHeight /2 - 100}}>
                        ActivityIndicator
                        <Text style={{color: "grey", margin: 5, fontSize: 14, fontWeight: "500"}}>Đang tải...</Text>
                    </View>
                    )}
                <WebView
                    source={{ uri: link}}
                    injectedJavaScript={runFirst}
                    onMessage={({ nativeEvent }) => {
                        if (nativeEvent.data === 'done') {
                            setLoading(false);
                        }
                    }}
                    style={{ opacity: loading ? 0 : 1 }}/>
            </View>            
        </SafeAreaView>
    );
}




const StockNews = () => {
    const navigation = useNavigation<any>();
    const [loading, setLoading] = React.useState(true);
    const route = useRoute<RouteProp<ParamList>>();
    const {item} = route.params;

    const link = `https://finance.vietstock.vn/${item.code}/tin-moi-nhat.htm`

    useLayoutEffect(() => {
        navigation.setOptions({ 
            title: 'Tin tức',
            headerStyles: {}
        });
    })

    const runFirst = `
        const element = document.querySelector('div.table-responsive.m-b#latest-news table');
        const body = document.body;
        while(body.firstChild) {
        body.removeChild(body.firstChild);
        }
        body.appendChild(element);
        window.ReactNativeWebView.postMessage('done');
        element.style.width = '100%';
        element.style.height = '100%';
        element.style.overflow = 'hidden';
        element.style.width = 'medium';
        true; //
    `;

    const handleNavigationStateChange = (navState : any) => {
        if (navState.url !== link) {
            console.log('User clicked a link:', navState.url);
            navigation.navigate("NewsView", {link : navState.url})
        return false; // prevent WebView from loading the new URL
        }
        return true;
    };


    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View style={{width: screenWidth, height: 1400, paddingTop: 5}}>
            {loading && (
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  top: screenHeight / 2 - 120,
                }}>
                <ActivityIndicator size="small" color={COLOR.secoundaryColor} />
                <Text
                  style={{
                    color: 'grey',
                    margin: 5,
                    fontSize: 14,
                    fontWeight: '500',
                  }}>
                  Đang tải...
                </Text>
              </View>
            )}
            <WebView
              source={{uri: link}}
              injectedJavaScript={runFirst}
              onMessage={({nativeEvent}) => {
                if (nativeEvent.data === 'done') {
                  setLoading(false);
                }
              }}
              setSupportMultipleWindows={false}
              onShouldStartLoadWithRequest={handleNavigationStateChange}
              style={{opacity: loading ? 0 : 1}}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
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