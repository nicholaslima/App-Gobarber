

import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler'


export const Container = styled(RectButton)`
   padding: 10px;
   height: 50px;
   background: #FF9000;
   border-radius: 10px;
   height: 60px;
   justify-content: center;
   align-items: center;
   margin-top: 16px;
`;

export const TextButton = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    text-transform: capitalize;

    /* Background */
    color: #312E38;
`;