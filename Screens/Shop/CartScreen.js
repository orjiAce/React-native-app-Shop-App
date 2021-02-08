import React, {useState} from 'react';
import {View, Text, FlatList, Button, StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Colors from '../../Constants/Colors';
import CartItem from '../../Components/shop/CartItem';
import * as cartActions from '../../Store/actions/cart.actions';
import * as ordersActions from '../../Store/actions/order.action';
import OrderScreen from "./Order.Screen";
import Card from "../../Components/UI/Card";

const CartScreen = props => {

    const [isLoading, setIsLoading] = useState(false)

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1
        );
    });

    const sendOrder = async () =>{
        setIsLoading(true)
       await dispatch(ordersActions.addOrders(cartItems, cartTotalAmount));
        setIsLoading(false)
    }


    const dispatch = useDispatch();



    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:{' '}
                    <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2)) * 100 / 100}</Text>
                </Text>
                {
                    isLoading ? <ActivityIndicator size='small' color={Colors.primaryColor}/> :

                        <Button
                            color={Colors.accentColor}
                            title="Order Now"
                            disabled={cartItems.length === 0}
                            onPress={sendOrder
                            }
                        />
                }
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId));
                        }
                        }
                    />
                )}
            />


            <Button style={styles.clearBtn} disabled={cartItems < 1} color={Colors.primaryColor} title={'Clear cart '}
                    onPress={() => dispatch(cartActions.clearCart())}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    },
    clearBtn: {
        margin: 10,
        top: 10
    }
});


CartScreen.navigationOptions = {
    headerTitle: 'Your carts'
}
export default CartScreen;
