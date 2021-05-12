

import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';


import {
    Container,
    Title,
    Button,
    ButtonText,
    DescriptionAppointment
} from './style';


const UserCreated: React.FC = () => {

    const navigation  = useNavigation();

    const HandleOK = useCallback(() => {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'Signin'
                }
            ]
        })
    },[]);

    return(
        <Container>
            <Icon name="check" size={80} color="#04d361"></Icon>
            <Title>Cadastramento concluido</Title>
            <DescriptionAppointment>agora é só fazer login</DescriptionAppointment>

            <Button onPress={ HandleOK }>
                <ButtonText>OK</ButtonText>
            </Button>
        </Container>
    )
}

export default UserCreated;