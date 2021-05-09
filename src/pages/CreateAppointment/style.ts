

import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight,getBottomSpace } from 'react-native-iphone-x-helper';
import { Provider,DayAvailability } from './index';


interface ProviderType{
    onSelected: Boolean;
}

interface ProviderNameType{
    onSelected: Boolean;
}

interface AvailabilityItemType{
    available: Boolean;
    selected: Boolean;
}


interface AvailabilityItemTextType{
    selected: Boolean;
}

export const Container = styled.View``;


export const Header = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-top: ${ getStatusBarHeight() + 25}px;
    padding-bottom: 25px;
    padding-left: 25px;
    padding-right: 25px;
    background-color: #28262E;
    height: 102px;
`;

export const Title = styled.Text`
    color: #F4EDE8;
    text-transform: capitalize;
    font-size: 20px;
    font-family: 'RobotoSlab-Regular';
`;

export const Avatar = styled.Image`
    height: 56px;
    width: 56px;
    border-radius: 28px;
`;

export const ButtonBack = styled.TouchableOpacity`
`;


export const ProvidersList= styled(FlatList as new () => FlatList<Provider>).attrs({
    showsHorizontalScrollIndicator: false
})`

`;

export const DatePicker= styled.View`

`;

export const ButtonAgendar = styled(RectButton)`
    background-color: #FF9000;
    padding: 16px;
    border-radius: 10px;
    margin-top: 40px;
`;

export const ButtonAgendarText = styled.Text`
    color: #312E38;
    font-family: 'RobotoSlab-Medium';
    text-align: center;
    font-size: 18px;
`;

export const ApointmentsHours= styled.View`

`;

export const ContainerCreateAppointment = styled.ScrollView.attrs({
    contentContainerStyle:{
        paddingBottom: getBottomSpace(),
    }
})`
    padding: 32px 11px;
`;



export const ProviderContainer = styled(RectButton)<ProviderType>`
    background-color: ${(props) => props.onSelected ? '#FF9000' : '#3E3B47' };
    flex-direction: row;
    align-items: center;
    margin-right: 16px;
    border-radius: 10px;
    padding: 8px 12px;
`;

export const AvatarProvider = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
 `;

export const NameProvider = styled.Text<ProviderNameType>`
    color: ${(props) => props.onSelected ? '#232129' : '#F4EDE8' };
    text-transform: capitalize;
    margin-left: 8px;
    font-size: 14px;
    font-family: 'RobotoSlab-Medium';
 `;

export const TitleDatePicker = styled.Text`
    color:#F4EDE8;
    font-size: 25px;
    font-family: 'RobotoSlab-Regular';
    margin-bottom: 24px;
    margin-top: 48px;
`;


export const ButtonActiveDatePicker = styled(RectButton)`
    align-items: center;
    justify-content: center;
    height: 46px;
    background-color: #FF9000;
    border-radius: 10px;
`;

export const TextButton = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 16px;
    color: #232129;
`;


export const ListAvailabilityMorning = styled( FlatList as new () => FlatList<DayAvailability>)`
    
`;

export const ListAvailabilityAfternoon = styled( FlatList as new () => FlatList<DayAvailability>)``;
export const ListAvailabilityNight = styled( FlatList as new () => FlatList<DayAvailability>)``;

export const AvailabilityItem = styled(RectButton).attrs((props: AvailabilityItemType) => ({
    enabled: props.available,
}))<AvailabilityItemType>`
    padding: 10px;
    background-color: ${ (props) => props.selected ? '#ff9000' : '#3E3B47'};
    opacity: ${ (props)  => props.available ? 1 : 0.3 };
    border-radius: 10px;
    margin-right: 8px;
`;

export const AvailabilityItemText = styled.Text<AvailabilityItemTextType>`
    color: ${(props) => props.selected ? '#3E3B47' : '#F4EDE8'};
    font-family: 'RobotoSlab-Regular';
    font-size: 14px;
`;

export const AvailabilityItemTitle = styled.Text`
    color: #999591;
    font-family: 'RobotoSlab-Medium';
    font-size: 14px;
   
    margin-bottom: 8px;
`;

export const AvailabilityItemContainer =styled.View`
    margin-bottom: 25px;
`;