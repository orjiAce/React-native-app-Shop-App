import React from "react";
import { createDrawerNavigator } from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from "react-navigation";
import ProductOverviewScreen from "../Screens/Shop/ProductsOverview.Screen";
import {Platform} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Colors from "../Constants/Colors";
import ProductDetailScreen from "../Screens/Shop/ProductDetail.Screen";
import CartScreen from "../Screens/Shop/CartScreen";
import OrderScreen from "../Screens/Shop/Order.Screen";
import UserProductScreen from "../Screens/User/UserProducts.Screen";
import EditProductScreen from "../Screens/User/EditProduct.Screen";

//in here we add the navigation we will use throughout this app

const defaultNavigation = {
    headerStyle:{

        //style according to the platform the user is running on

        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle:{
        fontFamily:'open-sans-bold'
    },
    headerBackTitleStyle:{
        fontFamily:'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? "#ffffff" : Colors.primaryColor


}

const ProductNavigator = createStackNavigator({
ProductOverview: ProductOverviewScreen,
    ProductDetailScreen: ProductDetailScreen,
    CartScreen: CartScreen
},{
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavigation
} )

//create navigation for the order screen

const OrderNavigation = createStackNavigator({
    orders: OrderScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavigation
});


//create navigation for the user product screen

const AdminNavigation = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProduct: EditProductScreen,
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavigation
});


//a drawer navigator, this is the overall navigator
const shopNavigator = createDrawerNavigator({
Products: ProductNavigator,
   Orders: OrderNavigation,
    Admin :AdminNavigation
}, {
    contentOptions:{
        activeTintColor: Colors.primaryColor
    }
})

//wrap in CreateAppContainer and then export
export default createAppContainer(shopNavigator)