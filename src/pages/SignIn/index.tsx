

import React,{ useRef,useCallback } from 'react';
import { Alert, Image,KeyboardAvoidingView,Platform,ScrollView,TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import { useAuth } from '../../context/authContext';

import getValidationErrors from '../../utils/validationErrors';

import  Icon  from 'react-native-vector-icons/Feather';

import Logo from '../../Assets/Logo.png';
import Input from '../../components/input';
import Button from '../../components/button';

import { Container,Title,NovaSenha,CriarConta,Footer } from './style';

interface SigninType{
    email: string;
    password: string;
}

const SignIn:React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const inputEmailRef = useRef<TextInput>(null);
    const inputPasswordlRef = useRef<TextInput>(null);

    const navigation = useNavigation();
    const { signin } = useAuth();

    const navigateToSignup = () => {
        navigation.navigate('Signup');
    };

    const handleSignin = useCallback(async (data: SigninType) => {
        
        try{
            formRef.current?.setErrors({});

            const schema = yup.object().shape({
                email: yup.string().required('nome obrigatório').email(),
                password: yup.string().required('senha obrigatória'),
            })

            await schema.validate(data,{
                abortEarly: false,
            });

            await signin({
                email: data.email,
                password: data.password,
            });
            
        }catch(err){
            if(err instanceof yup.ValidationError){
                const validationErrors = getValidationErrors(err);
                formRef.current?.setErrors(validationErrors);
                return;
            }

            Alert.alert(
                'Erro na autencação',
                'Ocorreu um erro ao fazer login'
            )
        }
    },[]);

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

                <Form ref={ formRef } onSubmit={ handleSignin }>
                    <Input 
                        ref={ inputEmailRef }
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            inputPasswordlRef.current?.focus();
                        }}
                        icon="mail" 
                        name="email" 
                        placeholder="digite o email"
                    />
                    <Input 
                        ref={ inputPasswordlRef }
                        icon="user"
                        name="password" 
                        placeholder="digite a senha"
                        secureTextEntry
                        returnKeyType="send"
                        onSubmitEditing={() => {
                            formRef.current?.submitForm()
                        }}
                    />

                    <Button 
                        onPress={ () => formRef.current?.submitForm() }
                    >
                        entrar
                    </Button>
                </Form>
               

                <NovaSenha>Esqueci minha senha</NovaSenha>

                <Footer
                    onPress={ navigateToSignup }
                >
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