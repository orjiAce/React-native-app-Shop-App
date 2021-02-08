import React from 'react';
import {Text, TouchableOpacity, View, Platform, StyleSheet} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

const CartItem = ({amount, quantity, title,onRemove}, props) => {

    return (
        <View style={CartItemStyle.cartItem}>
            <View style={CartItemStyle.itemData}>
                <Text style={CartItemStyle.quantity}>
                    {quantity}
                </Text>
                <Text style={CartItemStyle.title}>
                    {title}
                </Text>
            </View>

            <View>
                <Text style={CartItemStyle.amount}>${amount}</Text>
                {props.deletable && (<TouchableOpacity onPress={onRemove} style={CartItemStyle.deleteBtnStyle}>
                    <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} size={23} color='red'/>
                </TouchableOpacity>)}
            </View>

        </View>
    );
}

const CartItemStyle = StyleSheet.create({
    deleteBtnStyle: {
        marginLeft: 20
    },
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    itemData: {
        flexDirection: 'row',
        alignItems:'center'
    },
    quantity: {
        fontFamily:'open-sans',
        color:'#888',
        fontSize:16
    },
    title: {
        fontSize: 16,
        fontFamily: 'open-sans-bold'
    },
    amount: { fontSize: 16,
        fontFamily: 'open-sans-bold'

    }
})


export default CartItem;
