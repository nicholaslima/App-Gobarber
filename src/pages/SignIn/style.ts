

import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

export const Title = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 26px;
    text-align: center;
    margin: 64px 0 24px;

    /* White */
    color: #F4EDE8;
`;

export const NovaSenha = styled.Text` 
    
    font-family: 'RobotoSlab-Medium';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: #F4EDE8;
    margin-top: 24px;
`;


export const Footer = styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 16px 0 ${ 16 + getBottomSpace()}px;
    background-color: #312E38;
    border-color: #232129;

    border-top-width: 1px;
`;

export const CriarConta = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 16px;
    line-height: 18px;
    text-align: center;
    margin-left: 15px;
   
    /* Orange */
    color: #FF9000;
`;