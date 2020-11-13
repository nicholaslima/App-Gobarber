

import React from 'react';
import { AuthProvider } from '../context/authContext';
const AppProvider:React.FC = ({ children }) => {
    return(
        <AuthProvider>
            { children }
        </AuthProvider>
    )
}

export default AppProvider;