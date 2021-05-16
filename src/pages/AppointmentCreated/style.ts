

import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 55px;
`;


export const Title = styled.Text`
    font-size: 32px;
    text-transform: capitalize;
    color: #F4EDE8;
    line-height: 40px;
    font-family: 'RobotoSLab-Medium';
    margin-top: 50px;
    text-align: center;
    margin-bottom: 16px;

`;

export const DescriptionAppointment = styled.Text`
    color: #999591;
    text-transform: capitalize;
    font-family: 'RobotoSLab-Regular';
    line-height: 24px;
    font-size: 14px;
    text-align: center;
    margin-bottom: 40px;
`;

export const Button = styled(RectButton)`
    background-color: #ff9000;
    border-radius: 10px;
    padding: 17px 55px;
    align-items: center;
`;

export const ButtonText = styled.Text`
    color: #312E38;
    font-size: 18px;
    font-family: 'RobotoSLab-Regular';
    text-transform: capitalize;
`;