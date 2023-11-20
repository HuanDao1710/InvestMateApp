import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import HomeScreen from './src/screen/home/HomeScreen';
import StockListScreen from './src/screen/stock-list/StockListScreen';
import WatchlistScreen from './src/screen/Watchlist/WatchlistScreen';
import IconTabHome from './src/IconSVG/IconTabHome';
import IconTabStockList from './src/IconSVG/IconTabStockList';
import IconTabWatchlist from './src/IconSVG/IconTabWatchlist';
import IconTabStockFilter from './src/IconSVG/IconTabStockFilter';
import SearchBar from './src/common/SearchBar';
import StockFilterScreen from './src/screen/filter/StockFIlterScreen';
import { MenuProvider } from 'react-native-popup-menu';


const Tab = createBottomTabNavigator();


const App = () => {
  return (
    <MenuProvider>
  <NavigationContainer>
    <Tab.Navigator 
        screenOptions={{
          tabBarStyle: {borderTopLeftRadius: 30,borderTopRightRadius: 30, position: "absolute", overflow:"hidden"},
          tabBarActiveBackgroundColor: "#B8C4FF",
          headerTitle: "InvestMate",
          headerTitleStyle: styles.tiltle,                   
        }}
    >
      <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Tổng quan',     
            tabBarIcon: () => (
              <IconTabHome  style={{width: 22.5, height: 22.5,}}/>
            ),
            headerRight: ()=> (<SearchBar/>),
          }}
        />
        <Tab.Screen
          name="StockList"
          component={StockListScreen}
          options={{
            tabBarLabel: 'Danh sách CP',
            tabBarIcon: () => (
              <IconTabStockList  style={{width: 22.5, height: 22.5,}}/>
            ),
            headerRight: ()=> (<SearchBar/>),
          }}
        />
        <Tab.Screen
          name="Watchlist"
          component={WatchlistScreen}
          options={{
            tabBarLabel: 'DS theo dõi',
            tabBarIcon: () => (
              <IconTabWatchlist  style={{width: 22.5, height: 22.5,}}/>
            )
          }}
        />
        <Tab.Screen
          name="StockFilter"
          component={StockFilterScreen}
          options={{
            tabBarLabel: 'Lọc CP',
            tabBarIcon: () => (
              <IconTabStockFilter  style={{width: 22.5, height: 22.5,}}/>
            )
          }}
        />
      </Tab.Navigator>
  </NavigationContainer>
  </MenuProvider>
  );
}
export default App;

const styles = StyleSheet.create({
  tiltle: {
      color: "black", fontSize: 20, fontWeight: "bold", fontFamily:"Roboto"
  }
})
