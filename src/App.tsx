
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View,StatusBar } from  'react-native';
import AppProvider from './context';

import Routes from './routes';

const App:React.FC = () => {
    return(
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#312e38"/>
            <AppProvider>
                <View style={{ flex:1, backgroundColor:'#312e38' }}>
                    <Routes />
                </View>
            </AppProvider>
        </NavigationContainer>
    )
}

export default App;
