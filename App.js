
import React,{useState} from 'react';
import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import ProductReducer from './Store/reducers/products.reducer'
import ShopNavigation from "./Navigation/ShopNavigation";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
//this import makes sure all your screens/pages runs smoothly
import { enableScreens } from 'react-native-screens';
import cart from "./Store/reducers/cart.reducer";
import ordersReducer from "./Store/reducers/order.reducer"

import ReduxThunk from 'redux-thunk'

enableScreens();
const rootReducer = combineReducers({
    products: ProductReducer,
    cart: cart,
    orders: ordersReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

//here we programmatically add our fonts
const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

export default function App() {

    const [fontLoaded, setFontLoaded] = useState(false);
    //here we make sure our is fully loaded and font loaded before the app starts
    //meaning keep the splash screen open until font is loaded

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFontLoaded(true)}
            />
        );
    }
    return (
        <Provider store={store}>

        <ShopNavigation/>

        </Provider>

    );
}
