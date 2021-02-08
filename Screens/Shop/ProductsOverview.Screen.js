import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, Button, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import ProductItem from "../../Components/shop/ProductItem";
import {addToCart} from "../../Store/actions/cart.actions";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import MyHeaderButton from "../../Components/UI/HeaderButton";
import Colors from "../../Constants/Colors";
import * as cartActions from "../../Store/actions/cart.actions";
import {fetchProducts} from "../../Store/actions/Products.action";


const ProductOverviewScreen = (props) => {

    //indicate when product is loading
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    //use useSelector provided by react-redux to get the products and supply it to the FlatList
    const products = useSelector(state => state.products.availableProducts);

    let dispatch = useDispatch();
    const selectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetailScreen', params: {
                productId: id,
                productTitle: title
            }
        })
    }
    const loadProducts = useCallback(async () => {

        setIsLoading(true)
        try {
            //check if there are any error by wrapping in a try block
            await dispatch(fetchProducts())
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)

    }, [dispatch, error, setIsLoading])

    useEffect(() => {

        loadProducts()

    }, [dispatch, loadProducts])


    useEffect(() => {
        //lets add a navigation listener to fetch updated data when pages are navigated
        //wilFocus is an event listener that fires when the page is loaded
       const willFocus =  props.navigation.addListener('willFocus', () => {
            loadProducts()
        })

        //this will clean the subscription once this component is unmounted
        return () =>{
           willFocus.remove()
        }
    },[loadProducts])

    if (isLoading) {
        return <View style={Styles.centred}><ActivityIndicator
            color={Colors.primaryColor}/></View>
    }


    //this will show if there is an error
    if (error) {
        return <View style={Styles.centred}>
            <Text>{error}!</Text>
            <Button color={Colors.primaryColor} title={'Try again'} onPress={loadProducts}/>
        </View>
    }

    //this will show if the loading has stopped and no product was loaded
    if (!isLoading && products.length === 0) {
        return <View style={Styles.centred}>
            <Text>No products found, maybe start adding some</Text>
        </View>
    }
    return (
        //our FlatList for displaying our products

        <FlatList
            data={products}
            //This below line is optional
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    imageUrl={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                    }}
                >
                    <Button
                        color={Colors.primary}
                        title="View Details"
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title);
                        }}
                    />
                    <Button
                        color={Colors.primaryColor}
                        title="To Cart"
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item));
                        }}
                    />
                </ProductItem>
            )}
        />

    );
}

ProductOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={MyHeaderButton}>
                <Item title={'MENU'} iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-cart'}
                      onPress={() => navData.navigation.toggleDrawer()}/>
            </HeaderButtons>
        ),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={MyHeaderButton}>
                <Item title={'CART'} iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                      onPress={() => navData.navigation.navigate('CartScreen')}/>
            </HeaderButtons>
        )
    }


};

const Styles = StyleSheet.create({
    centred:
        {flex: 1, justifyContent: "center", alignItems: "center"}

})

export default ProductOverviewScreen;
