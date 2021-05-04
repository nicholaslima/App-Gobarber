

import React from 'react';
import { ActivityIndicator,View } from 'react-native';
import AppRoutes from '../routes/App.routes';
import AuthRoutes from '../routes/Auth.routes';
import { useAuth } from '../context/authContext';

const Routes:React.FC = () => {
    const { user,loading  } = useAuth();

    if(loading){
        return(
            <View style={{ flex:1, alignItems: 'center',justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#999"/>
            </View>
        )
    }
    
    return user ? <AppRoutes /> : <AuthRoutes />
}

export default Routes;
