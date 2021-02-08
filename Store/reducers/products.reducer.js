import PRODUCTS from "../../data/dummy-data";
import {CREATE_PRODUCT, DELETE_PROD, SET_PRODUCT, UPDATE_PRODUCT} from "../actions/Products.action";
import Product from "../../Models/Product";

const initialState = {
    availableProducts: PRODUCTS,
    //filter user Product according to the user id
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT:
            return {
                availableProducts: action.products,
                userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(action.productData.id, 'u1', action.productData.title,
                action.productData.imageUrl, action.productData.description, action.productData.price)
            console.log(newProduct)
            return {...state,
                //use concat to add the old and new array together
            availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),

            }

        case UPDATE_PRODUCT:
            //find the product
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid);
            //here we update the product that matches the id
            //state.userProducts[productIndex].ownerId : this gets the owner id for the product with the given productIndex
          const updatedProduct = new Product(action.pid, state.userProducts[productIndex].ownerId, action.productData.title,
              action.productData.imageUrl, action.productData.description, state.userProducts[productIndex].price);
            //we first get the existing userProducts array
            const updatedUserProducts = [...state.userProducts]
            //next we update the product with the given productIndex with the new product/updated product
            updatedUserProducts[productIndex] = updatedProduct

            //now we have updated the user products let us update the available product
            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.pid);
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] =updatedProduct
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
               userProducts: updatedUserProducts
            }
        case DELETE_PROD:
            return {
                ...state,
                //filter through the existing array to check where the payload product id matches an existing product id
                //in clear terms the function below drops the item that doesn't match the condition
                userProducts: state.userProducts.filter(product => product.id !== action.pid),
                availableProducts: state.availableProducts.filter(product => product.id !== action.pid)
            }
    }
    return state;
};

