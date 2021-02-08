import React, {useState} from "react";
import {StyleSheet, Text, FlatList, View, TextInput} from "react-native";
import {useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import MyHeaderButton from "../../Components/UI/HeaderButton";
import OrderItem from "../../Components/shop/OrderItem";


const OrderScreen = (props) => {

//this gets the order from the redux state
    //you can use this to select which state you want from nay reducer in the redux states
    const orders = useSelector(state => state.orders.orders)
    return <FlatList  data={orders}
                      keyExtractor={item => item.id}
                      renderItem={itemData => (
                          <OrderItem
                              amount={itemData.item.totalAmount}
                              date={itemData.item.readAbleDate}
                              items={itemData.item.items}

    />
                      )}
                      />


}


OrderScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    };
};

export default OrderScreen