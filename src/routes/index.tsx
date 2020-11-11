

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../pages/SignIn';
import signup from '../pages/Sign-up';

const App = createStackNavigator();

const Routes:React.FC = () => {
    return(
        <App.Navigator
            initialRouteName="Signin"
            screenOptions={{
                headerShown: false,
                cardStyle:{ backgroundColor: '#312e38' }
           }}>
             <App.Screen name="Signin" component={SignIn} />     
            <App.Screen name="Signup" component={signup} />    
        </App.Navigator>
    )
}

export default Routes;
