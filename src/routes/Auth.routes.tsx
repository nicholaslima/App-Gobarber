

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '../pages/SignIn';
import Signup from '../pages/Sign-up';
import UserCreated from '../pages/UserCreated';

const AuthRoutes:React.FC = () => {

    const AuthRoutes = createStackNavigator();
    return(
        <AuthRoutes.Navigator 
            screenOptions={{
                headerShown : false,
                cardStyle : { 
                    backgroundColor: '#312e38'
                }
            }}> 
            <AuthRoutes.Screen name="Signin" component={ Signin } />
            <AuthRoutes.Screen name="Signup" component={ Signup } />
            <AuthRoutes.Screen name="UserCreated" component={ UserCreated }></AuthRoutes.Screen>
        </AuthRoutes.Navigator>
    )
}

export default AuthRoutes;
