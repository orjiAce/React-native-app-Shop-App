import React from 'react';
import { Platform} from 'react-native';
import {HeaderButton} from "react-navigation-header-buttons";
import {Ionicons} from '@expo/vector-icons'
import Colors from "../../Constants/Colors";

const MyHeaderButton = (props) => {

    return (
        <HeaderButton {...props} IconComponent={Ionicons} size={33}
                       color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}>

        </HeaderButton>
    );
}

export default MyHeaderButton;
