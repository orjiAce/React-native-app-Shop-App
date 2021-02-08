import React from "react";
import {Alert, Button, FlatList, StyleSheet} from "react-native";
import ProductItem from "../../Components/shop/ProductItem";
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import MyHeaderButton from "../../Components/UI/HeaderButton";
import {deleteProd} from "../../Store/actions/Products.action";


const UserProductScreen = (props) => {
    const userProduct = useSelector(state => state.products.userProducts)
const dispatch = useDispatch()
    const EditProduct = (id) =>{
        props.navigation.navigate('EditProduct',{productId: id})
    }


    const deleteHandler = (id) =>{
        Alert.alert("Delete", "Are your sure you want to delete this product", [
            {text:'No', style:'default'},
            {text:'Yes', style:'destructive', onPress: () => dispatch(deleteProd(id))}
        ])
    }

    return (
        <FlatList data={userProduct} keyExtractor={item => item.id} renderItem={
            itemData => <ProductItem onSelect={() => {
                EditProduct(itemData.item.id)
            }} imageUrl={itemData.item.imageUrl} price={itemData.item.price}
                                     title={itemData.item.title} viewDetail={() => {
            }} onAddToCart={() => {
            }}>
                <Button title='EDIT' onPress={() => EditProduct(itemData.item.id)}
                 />
                <Button title='DELETE' onPress={() => deleteHandler(itemData.item.id)}/>
            </ProductItem>
        }/>
    )
}

UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your Products",
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={MyHeaderButton}>
                <Item title={'MENU'} iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-cart'}
                      onPress={() => navData.navigation.toggleDrawer()}/>
            </HeaderButtons>
        ),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={MyHeaderButton}>
                <Item title={'Add'} iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                      onPress={() => navData.navigation.navigate('EditProduct')}/>
            </HeaderButtons>
        ),

    }

}

export default UserProductScreen;