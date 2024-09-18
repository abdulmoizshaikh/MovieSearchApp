import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import HomeScreen from './src/screens/HomeScreen';
import 'react-native-devsettings';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoritesScreen from './src/screens/FavoritesScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import useNetwork from './src/hooks/useNetwork';

type TabParamList = {
  Home: undefined;
  Favorites: undefined;
};

const handleTabBarIcon = (
  route: RouteProp<TabParamList, keyof TabParamList>,
  color: string,
  size: number,
) => {
  let iconName = route.name === 'Home' ? 'home' : 'heart';
  return <Icon name={iconName} size={size} color={color} />;
};

const Tab = createBottomTabNavigator<TabParamList>();

const App: React.FC = () => {
  useNetwork();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => handleTabBarIcon(route, color, size),
            tabBarActiveTintColor: route.name === 'Favorites' ? 'red' : 'blue',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
