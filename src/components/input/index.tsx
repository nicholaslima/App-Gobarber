

import React,{ useEffect,useRef,useImperativeHandle,forwardRef,useState,useCallback } from 'react';
import { TextInputProps } from 'react-native';
import { Container,InputText,IconInput } from './style';
import { useField } from '@unform/core';

interface InputProps extends TextInputProps{
    name: string;
    icon: string;
    marginTop?: number;
}

interface InputRef {
    focus(): void;
}

interface inputValueReference{
    value: string;
}

const Input:React.ForwardRefRenderFunction<InputRef,InputProps> = ({name,marginTop,icon, ...rest},ref) => {
    const inputElementRef = useRef<any>(null);
    const [ isfocused,setIsFocused ] = useState(false);
    const [ isFilled,setIsFilled] = useState(false);

    const { registerField,fieldName,error,defaultValue = '' } = useField(name);
    const inputValueRef = useRef<inputValueReference>({ value: defaultValue });

    useImperativeHandle(ref,() => 
        ({
            focus(){
                inputElementRef.current.focus();
            }
        })
    )

    const HandleIsFilled = useCallback(() => {
        setIsFocused(false)
        console.log(inputElementRef.current.value);
        setIsFilled(!!inputValueRef.current.value);
    },[]);


    

    useEffect(()=>{
        registerField({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any,value: string){
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value});
            },
            clearValue(){
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            },
        });
    },[fieldName,registerField])

    return(
        <Container 
            isfocused = { isfocused } 
            hasError = { !!error } 
            marginTop = { marginTop }
        >
            <IconInput name={ icon } size={20} color={ isFilled || isfocused ? '#ff9000' : '#666360'}/>
            <InputText  
                ref={ inputElementRef }
                keyboardAppearance="dark"
                placeholderTextColor="#666360"
                defaultValue={ defaultValue }
                onChangeText= { (value) => {
                    inputValueRef.current.value = value 
                }}
                onFocus={ () => setIsFocused(true) }
                onBlur={ HandleIsFilled }
            {...rest} />
        </Container>
    )
}

export default forwardRef(Input);