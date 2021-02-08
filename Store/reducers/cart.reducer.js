import {ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART} from "../actions/cart.actions";
import CartItem from "../../Models/cart-item";
import {ADD_ORDER} from "../actions/order.action";
import {DELETE_PROD} from "../actions/Products.action";



const initialState = {
    items: {},
    totalAmount: 0

}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            //once this action is called we get the item from which was sent
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
            console.log(state)
            let updatedOrNewCartItem;
            //here we first of all check if the item already exist in the cart
            if (state.items[addedProduct.id]) {
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                );

            } else {
                //if the item isn't already in the cart we then add it
                updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
            }
            return {
                ...state,
                items: {...state.items, [addedProduct.id]: updatedOrNewCartItem},
                totalAmount: state.totalAmount + prodPrice
            };

        case REMOVE_FROM_CART:
            //get the quantity of the by querying with the productId
            const selectedCartItem = state.items[action.pid]
            const currentQty = selectedCartItem.quantity;
            let updatedCartItems;
            if (currentQty > 1) {
                //if the quantity is higher than 1 we reduce not erase it
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                );
                updatedCartItems = {...state.items, [action.pid]: updatedCartItem}
            } else {

                updatedCartItems = {...state.items};
                //delete from cartItems where product Id matches
                delete updatedCartItems[action.pid]

            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            }
        case CLEAR_CART:
            return initialState;

        case ADD_ORDER:
            return initialState;
        case DELETE_PROD:
            //check if the product id exist
            if(!state.items[action.pid]){
                return state
            }
            //if it does exist
            //we get all the items
            const updatedItems = {...state.items};
            //get the total of the item
            const itemTotal = state.items[action.pid].sum;
            delete updatedItems[action.pid]
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }
    }

    return state;

}
