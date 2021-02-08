import React, {useEffect, useState} from "react";
import {StyleSheet, ActivityIndicator, FlatList, View, TextInput} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import MyHeaderButton from "../../Components/UI/HeaderButton";
import OrderItem from "../../Components/shop/OrderItem";
import {fetchOrders} from "../../Store/actions/order.action";
import Colors from "../../Constants/Colors";


const OrderScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false)
const dispatch = useDispatch();
//this gets the order from the redux state
    //you can use this to select which state you want from nay reducer in the redux states
    const orders = useSelector(state => state.orders.orders)

useEffect(() =>{
    setIsLoading(true)
    dispatch(fetchOrders()).then(() =>{
        setIsLoading(false)
    })
},[dispatch])

    if(isLoading){
        return <View styles={style.centred}>
            <ActivityIndicator color={Colors.primaryColor} size='large'/>
        </View>
    }




    return <FlatList
        onRefresh={fetchOrders}
        refreshing={isLoading}
        data={orders}
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

const style = StyleSheet.create({
    centred:
        {flex: 1, justifyContent: "center", alignItems: "center"}
})

export default OrderScreen