

import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 20px ${ Platform.OS === 'android' ? 130 : 50 }px;
`;


export const Title = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 24px;
    line-height: 26px;
    text-align: center;
    margin-Bottom: 24px;
    margin-top: 64px;
    /* White */
    color: #F4EDE8;
`;

export const Footer = styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 60px;
    border-top-width: 1px;
    border-color: #232129;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #312E38;
`;


export const TextVoltar = styled.Text`
    font-family: 'RobotoSlab-Medium';

    font-size: 16px;
    line-height: 18px;
    margin-left: 16px;
    /* White */
    color: #F4EDE8;

`;