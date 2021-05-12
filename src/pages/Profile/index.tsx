

import React,{ useCallback, useRef } from 'react';
import { KeyboardAvoidingView,ScrollView,TextInput,Platform } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Input from '../../components/input';
import Button from '../../components/button';

import { useAuth  } from '../../context/authContext';

import {
    Container,
    AvatarProfile,
    Content,
    Header,
    Title,
    ButtonBack,
    Footer,
    ButtonSignout
} from './style';

const Profile: React.FC = () => {

    const { user,Logout } = useAuth();
    const { goBack } = useNavigation();

    const FomrRef = useRef<FormHandles>(null);
    const InputEmailRef = useRef<TextInput>(null);
    const InputPasswordRef = useRef<TextInput>(null);
    const InputNewPasswordRef = useRef<TextInput>(null);
    const InputConfirmPasswordRef = useRef<TextInput>(null);


    const updateUser = useCallback(() => {

    },[])
    return(
        <KeyboardAvoidingView
            style={{ flex: 1 }}   
        >
        <ScrollView
          
        >
        <Container>
            <Header>
                <ButtonBack onPress={ () => goBack() }>
                    <Icon name="arrow-left" size={25} color="#999591"></Icon>
                </ButtonBack>
                
                <Title>Meu Perfil</Title>

                <ButtonSignout onPress={Logout}>
                    <Icon name="power" size={25} color="#999591"></Icon>
                </ButtonSignout>
            </Header>
            <Content>
                <AvatarProfile source={{ uri: user.avatar_url }}></AvatarProfile>   
                <Form ref= {FomrRef} onSubmit={ updateUser }>

                    <Input 
                        autoCapitalize= "words"
                        name="name"
                        icon="user"
                        placeholder={ user.name }
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            InputEmailRef.current?.focus()
                        }}
                    />
                    
                    <Input 
                        ref= { InputEmailRef }
                        keyboardType="email-address"
                        name="email"
                        icon="mail"
                        placeholder={ user.email }
                        onSubmitEditing={() => {
                            InputPasswordRef.current?.focus()
                        }}
                    />


                    <Input 
                        ref={ InputPasswordRef }
                        secureTextEntry
                        marginTop={32}
                        name="password"
                        icon="unlock"
                        placeholder="senha atual"
                        onSubmitEditing={() => {
                            InputNewPasswordRef.current?.focus()    
                        }}
                    />

                    <Input 
                        ref={ InputNewPasswordRef }
                        name="newPassword"
                        secureTextEntry
                        icon="unlock"
                        placeholder="nova senha"
                        onSubmitEditing={() => {
                            InputConfirmPasswordRef.current?.focus()
                        }}
                    />

                    <Input 
                        secureTextEntry
                        placeholder="confirme a senha"
                        ref={ InputConfirmPasswordRef }
                        name="confirmPassword"
                        icon="unlock"
                    />
                    <Footer>
                        <Button>Confirmar mudança</Button>
                    </Footer>
                </Form> 
            </Content>
        </Container>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Profile;