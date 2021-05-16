

import React,{ useCallback, useRef } from 'react';
import { KeyboardAvoidingView,ScrollView,TextInput, Alert} from 'react-native';
import { useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import * as yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import api from '../../service/api';
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
    ButtonSignout,
    ButtonAvatar,
} from './style';
import validationErrors from '../../utils/validationErrors';

interface UserType{
    email: string;
    old_password: string;
    password: string;
    name: string;
    confirmPassword: string;
}

const Profile: React.FC = () => {

    const { user,Logout,updateUser } = useAuth();
    const { goBack } = useNavigation();

    const FomrRef = useRef<FormHandles>(null);
    const InputEmailRef = useRef<TextInput>(null);
    const InputPasswordRef = useRef<TextInput>(null);
    const InputNewPasswordRef = useRef<TextInput>(null);
    const InputConfirmPasswordRef = useRef<TextInput>(null);


    const send = useCallback( async (data: UserType) => {
        try{
            FomrRef.current?.setErrors({});
            const schema = yup.object().shape({
                name: yup.string().required("nome obrigatório"),
                email: yup.string().email().required('email obrigatório'),
                old_password: yup.string(),
                password: yup
                    .string()
                    .when('old_password',{
                        is: (val) => !!val.length,
                        then: yup.string().required('campo obrigatório'),
                        otherwise: yup.string(),
                    }),
                confirmPassword: yup
                    .string()
                    .when('old_password',{
                        is: (val) => !!val.length,
                        then: yup.string().required('campo obrigatório'),
                        otherwise: yup.string(),
                    })
                    .oneOf([yup.ref('password')],'confirmação incorreta'),
            });


            await schema.validate(data, {
                abortEarly: false,
            });

            const { name,email,old_password,password } = data;

            const formData = {
                name,
                email,
                ...( password 
                    ? {
                        old_password,
                        password,
                    }
                    : {}),
            }
    
           

            await api.put('/profile',formData)
                    .then((response) => {
                        updateUser(response.data);
                    });

            Alert.alert(
                'usuário atualizado com sucesso',
                'informações do perfil foram atualizadas'
            );

            goBack();
        }catch(err){
            if(err instanceof yup.ValidationError){
                const errors = validationErrors(err);
                FomrRef.current?.setErrors(errors);
                return;
            }

            console.log(err);

            Alert.alert(
                'erro ao atualizar o usuario',
                'tente atualizar seu usuario novamente'
            )
        }
    },[]);




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
                <ButtonAvatar>
                    <AvatarProfile source={{ uri: user.avatar_url }}></AvatarProfile>   
                </ButtonAvatar>

                <Form initialData={ user } ref= {FomrRef} onSubmit={ send }>
                    <Input 
                        autoCapitalize= "words"
                        name="name"
                        icon="user"
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
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            InputPasswordRef.current?.focus()
                        }}
                    />


                    <Input 
                        ref={ InputPasswordRef }
                        secureTextEntry
                        marginTop={32}
                        name="old_password"
                        icon="unlock"
                        placeholder="senha atual"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            InputNewPasswordRef.current?.focus()    
                        }}
                    />

                    <Input 
                        ref={ InputNewPasswordRef }
                        name="password"
                        secureTextEntry
                        icon="unlock"
                        placeholder="nova sesadfnha"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            InputConfirmPasswordRef.current?.focus()
                        }}
                    />

                    <Input 
                        secureTextEntry
                        placeholder="confirme a senha"
                        ref={ InputConfirmPasswordRef }
                        name="confirmPassword"
                        returnKeyType="send"
                        icon="unlock"
                    />
                    <Footer>
                        <Button onPress={ () => FomrRef.current?.submitForm() }>Confirmar mudança</Button>
                    </Footer>
                </Form> 

            </Content>
        </Container>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Profile;