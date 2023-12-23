import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import HomeScreen from './src/screen/home/HomeScreen';
import StockListScreen from './src/screen/stock-list/StockListScreen';
import WatchlistScreen from './src/screen/Watchlist/WatchlistScreen';
import IconTabHome from './src/iconSVG/IconTabHome';
import IconTabStockList from './src/iconSVG/IconTabStockList';
import IconTabWatchlist from './src/iconSVG/IconTabWatchlist';
import IconTabStockFilter from './src/iconSVG/IconTabStockFilter';
import SearchBar from './src/common/SearchBar';
import StockFilterScreen from './src/screen/filter/StockFIlterScreen';
import { MenuProvider } from 'react-native-popup-menu';
import { WatchlistHeader } from './src/screen/Watchlist/WatchlistScreen';
import { createStackNavigator } from '@react-navigation/stack';
import StockDetail from './src/screen/details/StockDetail';
import CompanyInfo from './src/screen/details/CompanyInfo';
import ListLargeShareHolder from './src/screen/details/ListLargeShareHolder';
import SubList from './src/screen/Watchlist/SubList';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
          <Stack.Screen name="StockDetail" component={StockDetail}/>
          <Stack.Screen name="CompanyInfo" component={CompanyInfo}/>
          <Stack.Screen name="ListLargeShareHolder" component={ListLargeShareHolder}/>
          <Stack.Screen name="SubList" component={SubList}/>
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
export default App;

const HomeTabs = () => {
  return (
    <>
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
            ),
            headerRight: () => (<WatchlistHeader/>),
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
    </>
  );
}

const styles = StyleSheet.create({
  tiltle: {
      color: "black", 
      fontSize: 20, 
      fontWeight: "bold", 
      fontFamily:"Roboto"
  }
})
