

import React,{ 
    useContext,
    createContext,
    useCallback,
    useState,
    useEffect } from 'react';

import axios from '../service/api';
import AsyncStorage from '@react-native-community/async-storage';

export interface userType{
    id: string;
    email: string;
    password: string;
    name: string;
    avatar_url: string;
}


interface DataType{
    token: string,
    user: userType,
}

interface signinType{
    email: string;
    password: string;
}
interface AuthContextType {
    user: userType;
    loading: boolean;
    updateUser(user: userType):Promise<void>
    signin(credentials: signinType): Promise<void>; 
    Logout(): Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider: React.FC = ({ children }) => {
    const [ data,setData ] =  useState({} as DataType);
    const [ loading,setLoading ] = useState(true);

    useEffect(() => {

        async function loadStorageData(): Promise<void>{
            const [ user,token ] = await AsyncStorage.multiGet([
                '@Gobarber/user',
                '@Gobarber/token'
            ]);
               
            if(user[1] && token[1]){
                axios.defaults.headers.authorization = `Bearer ${token[1]}`;
                setData({token: token[1],user:JSON.parse(user[1])})
            }

            setLoading(false);
        }

        loadStorageData();
    },[]);
    

    const signin = useCallback(async ({email,password}: signinType) => {
       const response =  await axios.post('session/auth',{
           email,
           password
        });


       const { token,user } = await response.data;

       await AsyncStorage.multiSet([
           ['@Gobarber/token',token ],
           ['@Gobarber/user',JSON.stringify(user)]
       ]);

       setData({ token,user });
    },[]);

    const updateUser = useCallback( async (user) => {
        await AsyncStorage.setItem( '@Gobarber/user',JSON.stringify(user));

        setData({
            user,
            token: data.token
        })
    },[setData,data])

    const Logout = useCallback(async() => {
        await AsyncStorage.multiRemove(['@Gobarber/token','@Gobarber/user',]);

        setData({} as DataType);
    },[]);
    
    return(
        <AuthContext.Provider value={{ user: data.user,signin,Logout,loading,updateUser }}>
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



