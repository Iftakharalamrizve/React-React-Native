
import React, { useEffect, useCallback,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text , Platform , Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors'
import { toggleFavorite } from '../store/action/favourite';

const MealsNavigator = (props) => {
        const state = useSelector(state => state);
        const dispatch = useDispatch();
        const Stack = createStackNavigator();
        const defaultStackNavOptions = {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
        };

        const Favourite = (mealInfo)=>{
            const favMeals = state.favoriteMeals;
            const status = favMeals.some(meal => meal.id === mealInfo);
            return status?'ios-star':'ios-star-outline'
        }
        
        return (
             <Stack.Navigator initialRouteName="Categories" screenOptions={defaultStackNavOptions}>
                <Stack.Screen name="Categories" component={CategoriesScreen}  options={{
                    headerTitle: 'Meal Categories',
                    headerLeft:()=> (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item
                            title="Menu"
                            iconName="ios-menu"
                            onPress={() => {
                                props.navigation.toggleDrawer();
                            }}
                            />
                        </HeaderButtons>
                    )
                }} />
                <Stack.Screen name="CategoryMeals" component={CategoryMealsScreen}  options={({ route }) => ({ title: route.params.categoryTitle + ' Meals List' })} />
                <Stack.Screen name="MealDetail" component={MealDetailScreen} options={({ route }) => ({ title: route.params.mealTitle , headerRight:()=> (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item
                          title="Favorite"
                          iconName={Favourite(route.params.mealId)}
                            onPress={() => {
                                dispatch(toggleFavorite(route.params.mealId))
                          }}
                        />
                      </HeaderButtons>
                    ) })} />
            </Stack.Navigator>
        );
}

export default MealsNavigator;
