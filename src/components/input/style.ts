
import styled,{css} from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';


interface ContainerProps{
    isfocused: boolean;
    hasError: boolean;
    marginTop: number | undefined;
}

export const Container = styled.View<ContainerProps>`
    flex-direction: row;
    align-items: center;
    background: #232129;
    border-radius: 10px;
    padding: 0 16px;
    width: 100%;
    margin-bottom: 8px;
    height: 60px;

    ${ (props) => props.isfocused && css`
        border-color: #ff9000
        border-width: 1px;
    `};

    ${ (props) => props.hasError && css`
        border-color: red;
        border-width: 1px;
    `};

    margin-top: ${(props) => props.marginTop ? props.marginTop : 0}px;
`;

export const InputText = styled.TextInput`
    flex: 1;
    background: #232129;
    color: #F4EDE8;
    border-radius: 10px;
    font-size: 16px;
`;


export const IconInput = styled(FeatherIcon)`
    margin-right: 16px;
   
`;