
import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    background: #232129;
    border-radius: 10px;
    padding: 0 16px;
    width: 100%;
    margin-bottom: 8px;
    height: 60px;
`;

export const InputText = styled.TextInput`
    flex: 1;
    background: #232129;
    color: #666360;
    border-radius: 10px;
    font-size: 16px;
`;


export const IconInput = styled(FeatherIcon)`
    margin-right: 16px;
   
`;