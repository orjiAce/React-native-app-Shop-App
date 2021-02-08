import React from 'react';
import {Button, Image, ScrollView, Text, StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import {addToCart} from "../../Store/actions/cart.actions";

const ProductDetailScreen = (props) => {
    const productId = props.navigation.getParam('productId')
    const product = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
    let dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={productDetailStyle.imageStyle} source={{uri: product.imageUrl}}/>
            <View style={productDetailStyle.action}>
                <Button title={'Add to cart'} onPress={() => dispatch(addToCart(product))}/>
            </View>

            <Text style={productDetailStyle.price}>
                ${product.price.toFixed(2)}
            </Text>
            <Text style={productDetailStyle.description}>
                {product.description}
            </Text>
        </ScrollView>
    );
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}
const productDetailStyle = StyleSheet.create({
    imageStyle: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily:'open-sans-bold'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal:10,
        fontFamily: 'open-sans'
    },
    action:{
        marginVertical:10,
        alignItems:'center'
    }
})

export default ProductDetailScreen;
