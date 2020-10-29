

import React from 'react';
import { View ,Text,Image,KeyboardAvoidingView,Platform,ScrollView } from 'react-native';
import { Container,Title,NovaSenha,CriarConta,Footer } from './style';

import  Icon  from 'react-native-vector-icons/Feather';

import Logo from '../../Assets/Logo.png';
import Input from '../../components/input';
import Button from '../../components/button';

const SignIn:React.FC = () => {
    return(
    
    <>
        <KeyboardAvoidingView
            style={ {flex: 1 } }
            behavior={ Platform.OS === 'ios' ? 'padding': undefined }
            enabled>
        <ScrollView
            keyboardShouldPersistTaps="handled" 
            contentContainerStyle={{flex: 1}}
            >
            <Container>
                <Image source={ Logo } />
                <Title>Faça seu logon</Title>
                <Input icon="mail" name="text" placeholder="digite o email"/>
                <Input icon="user" name="text" placeholder="digite a senha"/>

                <Button>entrar</Button>

                <NovaSenha>Esqueci minha senha</NovaSenha>

                <Footer>
                    <Icon name="log-in" size={20} color="#ff9000"></Icon>
                    <CriarConta>
                        criar um conta
                    </CriarConta>
                </Footer>
            </Container>
            </ScrollView>
        </KeyboardAvoidingView>
    </>
    )
}

export default SignIn;