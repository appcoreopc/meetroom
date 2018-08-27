import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PhotoListScreen from '../screens/PhotoListScreen';
import DefaultScreen from '../screens/DefaultScreen';
import PhotoScreen from '../screens/PhotoScreen';
import LoginScreen from '../screens/LoginScreen';

const HomeStack = createStackNavigator({
  LoginScreen : LoginScreen,
  Home : HomeScreen,
  DefaultScreen : DefaultScreen,
  PhotoScreen : PhotoScreen 
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Photos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-camera'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: PhotoListScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Report',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` 
      : 'md-document'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` 
      : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
