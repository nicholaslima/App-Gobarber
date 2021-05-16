

import React,{ useCallback,useRef} from 'react';
import { Alert, Image,KeyboardAvoidingView,ScrollView,TextInput,Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import validationError from '../../utils/validationErrors';
import api from '../../service/api';


import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';

import Input from '../../components/input';
import Button from '../../components/button';
import Logo from '../../Assets/Logo.png';

import Icon from 'react-native-vector-icons/Feather';

import { Container,Title,Footer,TextVoltar } from './style';

interface SignupType{
    name: string;
    email: string;
    password: string;
}

const Signup:React.FC = () => {
    const FormRef = useRef<FormHandles>(null);
    const InputEmailRef = useRef<TextInput>(null);
    const InputPasswordRef = useRef<TextInput>(null);

    const navigation = useNavigation();


    const navigateToLogin = () => {
        navigation.navigate('Signin');
    }

    const handleRegister = useCallback(async (data:SignupType) => {
        try{
            FormRef.current?.setErrors({});

            const schema = yup.object().shape({
                name: yup.string().required('nome é obrigatório'),
                email: yup.string().required('email é obrigatorio').email(),
                password: yup.string().required('password é obrigatório'),
            });

            await schema.validate(data,{
                abortEarly: false
            });

            await api.post('/users',data);
           

            navigation.navigate('UserCreated');
        }catch(err){
            if(err instanceof yup.ValidationError){
                const Errors = validationError(err);
                FormRef.current?.setErrors(Errors);
                return;
            }

            Alert.alert(
                'Erro de autenticação',
                'erro ao fazer seu registro'    
            );
        }
    },[navigation]);

    return(
        <>
        <KeyboardAvoidingView
         style={{ flex:1 }}
         behavior={Platform.OS === 'ios' ? 'padding': undefined}
         enabled
        >
            <ScrollView
                keyboardShouldPersistTaps = 'handled'
                contentContainerStyle = {{ flex: 1 }}
            >
            <Container>
                <Image source={ Logo }></Image>
                <Title>Crie sua conta</Title>

                <Form ref={FormRef} onSubmit={ handleRegister }>
                    <Input 
                        autoCapitalize="words"
                        name="name" 
                        icon="user" 
                        placeholder="nome"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            InputEmailRef.current?.focus()
                        }}
                    ></Input>

                    <Input 
                        ref={ InputEmailRef }
                        keyboardType="email-address"
                        autoCorrect= { false }
                        autoCapitalize="none"
                        name="email" 
                        icon="mail" 
                        placeholder="email"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            InputPasswordRef.current?.focus();
                        }}
                    ></Input>

                    <Input 
                        ref={  InputPasswordRef }
                        secureTextEntry
                        name="password" 
                        icon="lock" 
                        placeholder="senha"
                        textContentType="newPassword"
                        returnKeyType="send"
                        onSubmitEditing={() => { 
                            FormRef.current?.submitForm();    
                        }}
                    ></Input>

                    <Button
                        onPress={ () => { 
                            FormRef.current?.submitForm();
                        }}
                    >cadastrar</Button>
                </Form>
                
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

