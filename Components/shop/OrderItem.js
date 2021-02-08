import React, {useState} from "react";
import {Button, StyleSheet, Text, View} from "react-native";

//let's reuse the component CartItem
import CartItem from "./CartItem";
import Colors from "../../Constants/Colors";

const OrderItem = (props) => {
    const [showDetails, setShowDetails] = useState(false)
    return <View style={Styles.orderItem}>
        <View style={Styles.orderDetails}>
            <Text style={Styles.totalAmount}>
                ${props.amount.toFixed(2)}
            </Text>
            <Text style={Styles.date}>
                {props.date}
            </Text>
        </View>
        <Button color={Colors.primaryColor} title={ showDetails ? 'Hide details' : 'Show details'} onPress={ () => setShowDetails(prevState => !prevState)}/>

        {showDetails && (
            <View style={Styles.detailItems}>
                {props.items.map(cartItem => (
                    <CartItem
                        key={cartItem.productId}
                        quantity={cartItem.quantity}
                        amount={cartItem.sum}
                        title={cartItem.productTitle}
                    />
                ))}
            </View>
        )}
    </View>
}

const Styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    orderDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom:15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold'
    },
    date: {
        fontSize:16,
        fontFamily: 'open-sans',
        color:'#333'
    },
    detailItems: {
        width: '100%'
    }
})

export default OrderItem