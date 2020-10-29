

import React from 'react';
import { TextInputProps } from 'react-native';
import { Container,InputText,IconInput } from './style';

interface InputProps extends TextInputProps{
    name: string;
    icon: string;
}

const Input:React.FC<InputProps> = ({name,icon, ...rest}) => {
    return(
        <Container>
            <IconInput name={ icon } size={20} color="#666360"/>
            <InputText  
                keyboardAppearance="dark"
                placeholderTextColor="#666360"
            {...rest} />
        </Container>
    )
}

export default Input;