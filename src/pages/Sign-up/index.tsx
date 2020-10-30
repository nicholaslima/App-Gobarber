

import React from 'react';
import { Image,KeyboardAvoidingView,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/input';
import Button from '../../components/button';
import Logo from '../../Assets/Logo.png';

import Icon from 'react-native-vector-icons/Feather';

import { Container,Title,Footer,TextVoltar } from './style';

const Signup:React.FC = () => {

    const navigation = useNavigation();

    const navigateToLogin = () => {
        navigation.navigate('Signin');
    }

    return(
        <>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            enabled    
        >
            <ScrollView
                keyboardShouldPersistTaps = 'handled'
                contentContainerStyle = {{ flex: 1 }}
            >
            <Container>
                <Image source={ Logo }></Image>
                <Title>Crie sua conta</Title>
                <Input name="name" icon="user" placeholder="nome"></Input>
                <Input name="email" icon="mail" placeholder="email"></Input>
                <Input name="senha" icon="lock" placeholder="senha"></Input>

                <Button>cadastrar</Button>
                <Footer 
                    onPress = { navigateToLogin }
                >
                    <Icon name="arrow-left" color="#F4EDE8" size={20}></Icon>
                    <TextVoltar>voltar para o login</TextVoltar>
                </Footer>
            </Container>
            </ScrollView>
        </KeyboardAvoidingView>
        </>
    )
}

export default Signup;

