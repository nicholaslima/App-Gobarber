

import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Provider } from './index';

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 25px;
    background-color: #28262E;
`;

export const HeaderTitle = styled.Text`
    color: #f4ede8;
    font-family: 'RobotoSlab-Regular';
    line-height: 28px;
    font-size: 20px;
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserName = styled.Text`
    color: #FF9000;
    font-family: 'RobotoSlab-Medium';
    text-transform: capitalize;
`;


export const Avatar = styled.Image`
    border-radius: 28px;
    width: 56px;
    height: 56px;
`;


export const ProvidersList = styled(
    FlatList as new () => FlatList<Provider>
)``;


