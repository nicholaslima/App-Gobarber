import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { getStatusBarHeight ,getBottomSpace} from 'react-native-iphone-x-helper';

export const Container = styled.View`
    padding-bottom: ${ Platform.OS === 'android' ? 130 : 50 }px;

`;

export const  AvatarProfile = styled.Image`
    height: 186px;
    width: 186px;
    border-radius: 93px;
    margin-bottom: 32px;
    margin-bottom: 32px;
`;

export const Content = styled.View`
    padding-right: 25px;
    padding-left: 25px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Header = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    padding-top: ${ getStatusBarHeight() + 35}px;
    padding-bottom: 35px;
`;

export const Title = styled.Text`
    font-family: "RobotoSlab-Medium";
    font-size: 20px;
    text-transform: capitalize;
    color: #F4EDE8;
`;

export const ButtonBack = styled(RectButton)``;
export const ButtonSignout = styled(RectButton)``;

export const Footer = styled.View`

`;