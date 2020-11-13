

import React,{ useContext ,createContext,useCallback,useState,useEffect } from 'react';
import axios from '../service/api';
import AsyncStorage from '@react-native-community/async-storage';

interface userType{
    email: string;
    password: string;
}

interface DataType{
    token: string,
    user: userType,
}
interface AuthContextType {
    user: userType;
    signin(credentials: userType): Promise<void>; 
    Logout(): Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider: React.FC = ({ children }) => {
    const [ data,setData ] =  useState({} as DataType);

    useEffect(() => {

        async function loadStorageData(): Promise<void>{
            const [ user,token ] = await AsyncStorage.multiGet(['@Gobarber/user','@Gobarber/token']);
               
            if( user[1] && token[1]){
                setData({token: token[1],user:JSON.parse(user[1])})
            }
        }

        loadStorageData();
    },[]);
    

    const signin = useCallback(async ({email,password}) => {
       const response =  await axios.post('signin',{email,password});
       const [ token,user ] = await response.data;

       await AsyncStorage.multiSet([
           ['@Gobarber/token',token ],
           ['@Gobarber/user',user ]
       ]);

       setData({ token,user });
    },[]);

    const Logout = useCallback(async() => {
        await AsyncStorage.multiRemove(['@Gobarber/token','@Gobarber/user',]);

        setData({} as DataType);
    },[]);
    
    return(
        <AuthContext.Provider value={{ user: data.user,signin,Logout }}>
            { children }
        </AuthContext.Provider>
    )
}


function useAuth(){
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('this function must to be used within a Authprovider')
    }

    return context;
}

export { useAuth,AuthProvider }


