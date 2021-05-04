

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '../pages/SignIn';
import Signup from '../pages/Sign-up';

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
        </AuthRoutes.Navigator>
    )
}

export default AuthRoutes;
