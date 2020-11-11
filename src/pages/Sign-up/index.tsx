

import React,{ useCallback,useRef} from 'react';
import { Image,KeyboardAvoidingView,ScrollView,TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/input';
import Button from '../../components/button';
import Logo from '../../Assets/Logo.png';

import Icon from 'react-native-vector-icons/Feather';

import { Container,Title,Footer,TextVoltar } from './style';

const Signup:React.FC = () => {
    const FormRef = useRef<FormHandles>(null);
    const InputEmailRef = useRef<TextInput>(null);
    const InputPasswordRef = useRef<TextInput>(null);

    const navigation = useNavigation();

    const navigateToLogin = () => {
        navigation.navigate('Signin');
    }

    const handleRegister = useCallback((data:Object) => {
        console.log(data);
    },[]);

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
                        name="senha" 
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

