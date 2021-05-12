

import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute,useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import ptBR  from 'date-fns/locale/pt-BR';

import {
    Container,
    Title,
    Button,
    ButtonText,
    DescriptionAppointment
} from './style';


interface routesParamsTypes{
    date: number;
}
const AppointmentCreated: React.FC = () => {

    const routes = useRoute();
    const navigation  = useNavigation();

    const { date } = routes.params as routesParamsTypes;

    const dateFormated = useMemo(() => {
        return format(
            date,
            "EEEE, 'dia' dd 'de' MMMM 'de' yyyy 'ás' HH:mm'h'",
            { locale: ptBR }
        )
    },[date]);


    const HandleOK = useCallback(() => {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'Dashboard'
                }
            ]
        })
    },[]);

    return(
        <Container>
            <Icon name="check" size={80} color="#04d361"></Icon>
            <Title>Agendamento concluido</Title>
            <DescriptionAppointment>{`${ dateFormated } com Diego Fernandes`}</DescriptionAppointment>

            <Button onPress={ HandleOK }>
                <ButtonText>OK</ButtonText>
            </Button>
        </Container>
    )
}

export default AppointmentCreated;