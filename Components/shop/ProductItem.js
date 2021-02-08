import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image} from 'react-native';
import Card from "../UI/Card";

//this is the component that holds each product
const ProductItem = ( props) => {

    return (
        <Card style={ProductStyle.product}>
            <TouchableOpacity activeOpacity={1} style={ProductStyle.imageContainer} onPress={props.onSelect}>
                <Image style={ProductStyle.image} source={{uri: props.imageUrl}} onPress={props.viewDetail}/>
            </TouchableOpacity>

            <View style={ProductStyle.details}>
                <Text style={ProductStyle.title}>
                    {props.title}
                </Text>
                <Text style={ProductStyle.price}>
                    ${props.price.toFixed(2)}
                </Text>
            </View>

            <View style={ProductStyle.actions}>
                {
                    props.children
                }
            </View>
        </Card>
    );

}

const ProductStyle = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation:5,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        height: 300,
        margin: 20
    },

    price: {
        fontSize: 14,
        color: '#888'
    },
    imageContainer:{
        width: '100%',
        height: '60%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'
    },
    image: {
        width: '100%',
        height: '100%',


    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:'23%'
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    details:{
alignItems: 'center',
        height:'17%'
    }


})

export default ProductItem;
