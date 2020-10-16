import React, { Component } from 'react';
import { View, Text } from 'react-native';
import FiltersScreen from '../screens/FiltersScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabBar from './BottomTabBar'
export default class Drawer extends Component {
  
    render() {
      const Drawer = createDrawerNavigator();
      return (
        <>
        <Drawer.Navigator initialRouteName="Meals">
            <Drawer.Screen name="Meals" component={BottomTabBar} />
            <Drawer.Screen name="Filter" component={FiltersScreen} />
            <Drawer.Screen name="Details" component={MealDetailScreen} />
        </Drawer.Navigator>
        </>
    );
  }
}
