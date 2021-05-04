

import React, { useEffect,useState } from 'react';
import { Button } from 'react-native';
import { useAuth } from '../../context/authContext';
import { Container,Header,Avatar,HeaderTitle,UserName,ProvidersList,ProfileButton } from './style';
import { useNavigation } from '@react-navigation/native';

import api from '../../service/api';

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
  }

const DashBoard: React.FC = () => {

    const [ providers,setProviders ] = useState<Provider[]>([] as Provider[]);

    const { Logout,user } = useAuth();
    const navigation = useNavigation();

    useEffect( () => {
        api.get('providers/list') 
                .then(response => {
                    setProviders(response.data);
                })
    },[]);

    return(
        <Container>
            <Header>
                <HeaderTitle>
                    Bem Vindo,{ '\n' }
                    <UserName>nicholas lima</UserName>
                </HeaderTitle>
                <ProfileButton onPress={() => navigation.navigate('Profile')}>
                    <Avatar source={{ uri: user.avatar_url }}></Avatar>
                </ProfileButton>
            </Header>

            <ProvidersList
                data={ providers }
                keyExtractor={ provider => provider.id }
                renderItem={ ({ item }) => <UserName>{ item.name }</UserName>
            }
            />

        </Container>
    )
}

export default DashBoard;