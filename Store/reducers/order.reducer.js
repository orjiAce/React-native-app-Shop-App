import {ADD_ORDER} from "../actions/order.action";
import Order from "../../Models/Order";

const initialState = {
    orders: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(action.orderData.id,  action.orderData.items, action.orderData.amount,action.orderData.date)

            return {
                ...state,
                //add a new item to an array and returns the array that includes the old and new array
                orders:state.orders.concat(newOrder)
            }
    }
    return state;

}