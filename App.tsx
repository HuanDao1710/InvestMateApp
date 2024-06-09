import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native';
import HomeScreen from './src/screen/home/HomeScreen';
import StockListScreen from './src/screen/stock-list/StockListScreen';
import WatchlistScreen from './src/screen/Watchlist/WatchlistScreen';
import IconTabHome from './src/icons/IconTabHome';
import IconTabStockList from './src/icons/IconTabStockList';
import IconTabWatchlist from './src/icons/IconTabWatchlist';
import IconTabStockFilter from './src/icons/IconTabStockFilter';
import SearchBar from './src/common/SearchBar';
import StockFilterScreen from './src/screen/filter/StockFIlterScreen';
import { MenuProvider } from 'react-native-popup-menu';
import { createStackNavigator } from '@react-navigation/stack';
import StockDetail from './src/screen/details/StockDetail';
import CompanyInfo from './src/screen/details/CompanyInfo';
import ListLargeShareHolder from './src/screen/details/ListLargeShareHolder';
import SubWatchList from './src/screen/Watchlist/SubWatchList';
import SQLiteContextProvider from './src/sqlite/SQLiteContextProvider';
import SearchScreen from './src/screen/search';
import { useHeaderHeight } from '@react-navigation/elements';
import CreateFilter from './src/screen/filter/CreateFilter';
import FilterResults from './src/screen/filter/FilterResults';
import { NewsView } from './src/screen/details/StockNews';
import PersonalFilter from './src/screen/filter/PersonalFilter';
import SuggestFilter from './src/screen/filter/SuggestFilter';
import WatchListSearch from './src/screen/search/WatchListSearch';

const windowWidth = Dimensions.get('window').width;
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <SQLiteContextProvider>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen
              name="StockAnanlysis"
              component={StockAnanlysis}
              options={{headerShown: true}}
            /> */}
            <Stack.Screen
              name="HomeTabs"
              component={HomeTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="StockDetail" component={StockDetail} />
            <Stack.Screen name="CompanyInfo" component={CompanyInfo} />
            <Stack.Screen
              name="ListLargeShareHolder"
              component={ListLargeShareHolder}
            />
            <Stack.Screen name="SubWatchList" component={SubWatchList} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="WatchListSearch" component={WatchListSearch} />
            <Stack.Screen name="CreateFilter" component={CreateFilter} />
            <Stack.Screen name="PersonalFilter" component={PersonalFilter} />
            <Stack.Screen name="SuggestFilter" component={SuggestFilter} />
            <Stack.Screen
              name="FilterResults"
              component={FilterResults}
              options={{ title: 'Kết quả lọc' }}
            />
            <Stack.Screen name="NewsView" component={NewsView} />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </SQLiteContextProvider>
  );
};
export default App;

const HomeTabs = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<any>();
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            position: 'absolute',
            overflow: 'hidden',
          },
          tabBarActiveBackgroundColor: '#B8C4FF',
          headerTitle: 'Investmate',
          headerTitleStyle: styles.tiltle,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Tổng quan',
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarIcon: () => (
              <IconTabHome style={{ width: 22.5, height: 22.5 }} />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('SearchScreen')}>
                <SearchBar />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="StockList"
          component={StockListScreen}
          options={{
            tabBarLabel: 'Danh sách CP',
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarIcon: () => (
              <IconTabStockList style={{ width: 22.5, height: 22.5 }} />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('SearchScreen')}>
                <SearchBar />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Watchlist"
          component={WatchlistScreen}
          options={{
            tabBarLabel: 'DS theo dõi',
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarIcon: () => (
              <IconTabWatchlist style={{ width: 22.5, height: 22.5 }} />
            ),
          }}
        />
        <Tab.Screen
          name="StockFilter"
          component={StockFilterScreen}
          options={{
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarLabel: 'Lọc CP',
            tabBarIcon: () => (
              <IconTabStockFilter style={{ width: 22.5, height: 22.5 }} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  tiltle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  tabBarLabelStyle: {
    fontWeight: '500',
  },
});
