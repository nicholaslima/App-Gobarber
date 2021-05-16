

import React, { useCallback, useEffect,useState } from 'react';
import { useAuth } from '../../context/authContext';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

import { 
    Container,
    Header,
    Avatar,
    HeaderTitle,
    UserName,
    ProvidersList,
    ProfileButton,
    ProviderItem,
    AvatarProvider,
    DetailsProvider,
    NameProvider,
    AppointmentProvider,
    AppointmentText,
    ProviderListTitle,
    Sair   
} from './style';




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

    const navigateToCreateAppointment = useCallback((provider_id) => {
        navigation.navigate('CreateAppointment',{ provider_id })
    },[])

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
                    <UserName>{ user.name }</UserName>
                </HeaderTitle>
                <ProfileButton onPress={() => navigation.navigate('Profile')}>
                    <Avatar source={{ uri: user.avatar_url }}></Avatar>
                </ProfileButton>
            </Header>

            <ProvidersList
                data={ providers }
                keyExtractor={ provider => provider.id }
                ListHeaderComponent={
                    <ProviderListTitle>cabelereiros</ProviderListTitle>
                }
                renderItem={ ({ item }) => (
                    <ProviderItem onPress={ () => navigateToCreateAppointment(item.id)}>
                        <AvatarProvider source={{ uri: item.avatar_url }} />

                        <DetailsProvider>
                            <NameProvider>
                                { item.name }
                            </NameProvider>

                            <AppointmentProvider>
                                <Icon name="calendar" size={14}  color="#ff9000" ></Icon>
                                <AppointmentText>Segunda à sexta</AppointmentText>
                            </AppointmentProvider>

                            <AppointmentProvider>
                                <Icon name="clock" size={14} color="#ff9000" ></Icon>
                                <AppointmentText>8h às 18h</AppointmentText>
                            </AppointmentProvider>
                        </DetailsProvider>
                    </ProviderItem>
                )
            }
            />

        </Container>
    )
}

export default DashBoard;