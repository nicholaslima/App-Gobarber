

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation,useRoute } from '@react-navigation/native';
import { Alert, Platform } from 'react-native';
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../service/api';
import { useAuth } from '../../context/authContext';



import { Container,
    Title,
    Header,
    Avatar,
    ButtonBack,
    ProvidersList,
    DatePicker,
    ApointmentsHours,
    ButtonAgendar,
    ButtonAgendarText,
    ContainerCreateAppointment,
    ProviderContainer,
    NameProvider,
    AvatarProvider,
    TitleDatePicker,
    ButtonActiveDatePicker,
    TextButton,
    ListAvailabilityMorning,
    ListAvailabilityAfternoon,
    ListAvailabilityNight,
    AvailabilityItem,
    AvailabilityItemText,
    AvailabilityItemTitle,
    AvailabilityItemContainer
} from './style';


export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
  }

export interface DayAvailability{
    hour: number;
    available: boolean;
    hourFormated: string;
}

interface RouteParamsType{
    provider_id: string;
}

const CreateAppointment: React.FC = () => {

    const { goBack,navigate } = useNavigation();
    const { user  } = useAuth();
    const route = useRoute();

    const { provider_id  } = route.params as RouteParamsType;

    const [ providers, setProviders ]  = useState<Provider[]>([] as Provider[]);
    const [ ProviderSelected,setProviderSelected ] = useState<string>(provider_id);
    const [ selectedDate, setSelectedDate ] = useState(new Date());
    const [ selectedHour,setSelectedHour ] = useState(0);
    const [ dayAvailability, setDayAvailability ] = useState<DayAvailability[]>([]);
    const [ showDatePicker,setShowDatePicker ] = useState(false);

    const voltar = useCallback(() => {
        goBack();
    },[goBack]);

    const selectProvider = useCallback((provider_id) => {
        setProviderSelected(provider_id);
    },[]);


    const ToogleDatePicker  = useCallback(() => {
        setShowDatePicker((state) => !state);
    },[]);

    const handleDateChanged = useCallback((event: any,date: Date | undefined) => {
        if(Platform.OS === 'android'){
            setShowDatePicker(false);
        };

        if(date){
            setSelectedDate(date);
            setSelectedHour(0);
        }
    },[]);

    useEffect(() => {
        api.get('providers/list')
            .then( response  => {
                setProviders(response.data);
            })
    },[]);


    useEffect(() => {
        api.get(`providers/${ provider_id }/days-avaibility`,{
            params:{
                month: selectedDate.getMonth() + 1,
                year: selectedDate.getFullYear(),
                day: selectedDate.getDate()
            }}
        ).then(response => setDayAvailability(response.data));
    },[provider_id,selectedDate]);

    const listAvailabilityMorning = useMemo(() => {
        return dayAvailability
                    .filter( item => item.hour <= 12)
                    .map(({ available,hour }) => {
                        return {
                            available,
                            hour,
                            hourFormated: format(new Date().setHours(hour),'HH:00')
                        }
                    });
    },[dayAvailability]);

    const listAvailabilityAfternoon = useMemo(() => {
        return dayAvailability
            .filter( item => item.hour > 12 && item.hour <= 17)
            .map(({ available,hour }) => {
                return {
                    available,
                    hour,
                    hourFormated: format(new Date().setHours(hour),'HH:00')
                }
            });
    },[dayAvailability]);

    const selectHour = useCallback((hour) => {
        setSelectedHour(hour);
    },[]);


    const createAppointment = useCallback(async() => {
        try{    
            const date  = new Date(selectedDate);

            date.setHours(selectedHour);
            date.setMinutes(0);

            await api.post('appointments',{
                provider_id: ProviderSelected,
                date
            });

            navigate('AppointmentCreated',{ date: date.getTime() });
        }catch(err){
            Alert.alert(
                'erro ao criar agendamento',
                'agendamento não foi criado, por favor,tente novamente'
            );
        }
    },[selectedDate,selectedHour,navigate,ProviderSelected]);


    return(
        <Container>
            <Header>
                <ButtonBack onPress={ voltar }>
                    <Icon name="arrow-left" color="#999591" size={25}></Icon>
                </ButtonBack>

                <Title>Agendamento</Title>

                <Avatar source={{ uri: user.avatar_url }}></Avatar>
            </Header>

            <ContainerCreateAppointment>

                <ProvidersList
                    data = { providers }
                    horizontal
                    keyExtractor = { provider => provider.id }
                    renderItem = { ({item: provider}) => (
                        <ProviderContainer 
                            onPress = { () => selectProvider(provider.id) }
                            onSelected = {ProviderSelected === provider.id}
                        >
                            <AvatarProvider source={{ uri: provider.avatar_url }}></AvatarProvider>
                            <NameProvider onSelected = {ProviderSelected === provider.id}>{ provider.name }</NameProvider>
                        </ProviderContainer>
                    )}

                />



                <DatePicker>
                        <TitleDatePicker>Escolha a Data</TitleDatePicker>

                        <ButtonActiveDatePicker onPress={ ToogleDatePicker }>
                            <TextButton>escolha outra data</TextButton>
                        </ButtonActiveDatePicker>

                       { showDatePicker && ( <DateTimePicker 
                            mode="date"
                            is24Hour
                            onChange={ handleDateChanged }
                            {...(Platform.OS === 'ios' && { textColor: '#f4ede8' })}
                            display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
                            value={ selectedDate }
                        /> )}
                </DatePicker>

                <ApointmentsHours>
                        <TitleDatePicker>Escolha o Horário</TitleDatePicker>

                        <AvailabilityItemContainer>
                            <AvailabilityItemTitle>Manhã</AvailabilityItemTitle>

                            <ListAvailabilityMorning
                                data={ listAvailabilityMorning }
                                horizontal
                                keyExtractor={AvailabilityMorning => AvailabilityMorning.hourFormated}
                                renderItem = { ({item: AvailabilityMorning }) => (
                                    <AvailabilityItem 
                                        available={ AvailabilityMorning.available }
                                        onPress={() => selectHour(AvailabilityMorning.hour)}
                                        selected={ AvailabilityMorning.hour === selectedHour}
                                    >
                                        <AvailabilityItemText
                                            selected={ AvailabilityMorning.hour === selectedHour}
                                        >{ AvailabilityMorning.hourFormated  }</AvailabilityItemText>
                                    </AvailabilityItem>
                                )}
                            />
                         </AvailabilityItemContainer>

                        <AvailabilityItemContainer>
                            <AvailabilityItemTitle>Tarde</AvailabilityItemTitle>
                            <ListAvailabilityAfternoon 
                                data={ listAvailabilityAfternoon }
                                horizontal
                                keyExtractor={listAvailabilityAfternoon => listAvailabilityAfternoon.hourFormated}
                                renderItem = { ({item: listAvailabilityAfternoon }) => (
                                    <AvailabilityItem 
                                        available={ listAvailabilityAfternoon.available }
                                        onPress={() => selectHour(listAvailabilityAfternoon.hour)}
                                        selected={ listAvailabilityAfternoon.hour === selectedHour}
                                    >
                                        <AvailabilityItemText
                                            selected={ listAvailabilityAfternoon.hour === selectedHour}
                                        >{ listAvailabilityAfternoon.hourFormated  }</AvailabilityItemText>
                                    </AvailabilityItem>
                                )}
                            />
                        </AvailabilityItemContainer>    
                </ApointmentsHours>

                <ButtonAgendar>
                    <ButtonAgendarText onPress={ createAppointment }>Agendar</ButtonAgendarText>
                </ButtonAgendar>
            </ContainerCreateAppointment>
        </Container>
    )
}

export default CreateAppointment;