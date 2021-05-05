

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
    color: #999591;
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


export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
    padding: 0px 20px 16px;
`;


export const ProviderItem = styled.View`
    padding: 20px;
    margin-bottom: 16px;
    background-color:#3E3B47;
    border-radius: 10px;
    
    border-width: 0px;

    display: flex;
    flex-direction: row;
    align-items: center;

 `;



export const AvatarProvider = styled.Image`
    height: 72px;
    width: 72px;

    margin-right: 20px;

    border-radius: 36px;
`;


export const DetailsProvider = styled.View`

`;


export const NameProvider = styled.Text`
    font-size: 22px;
    color: #F4EDE8;
    font-family: 'RobotoSlab-Regular';

    margin-bottom: 12px;
`;

export const ProviderListTitle = styled.Text`
    font-size: 28px;
    margin-top: 32px;
    margin-left: 24px;
    margin-bottom: 32px;
    color: #F4EDE8;
    text-transform: capitalize;
    font-family: 'RobotoSlab-Regular';

`

export const AppointmentProvider = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 6px;

`;

export const AppointmentText = styled.Text`
    color: #999591;
    font-size: 12px;
    font-family: 'RobotoSlab-Regular';
    line-height: 16px;
    margin-left: 10px;

`;