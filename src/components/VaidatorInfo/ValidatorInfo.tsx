import React from 'react';
import c from './validInfo.module.css';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

type CommonProps = {
    input: WrappedFieldInputProps
    type: string
    placeholder: string
    meta: WrappedFieldMetaProps
}

export const ValidatorInput = ({input, type, placeholder,meta}:CommonProps) => {
    const { touched, error, active } = meta;
    const isError = touched && error && !active;
    return <input className={`${c.input} ${isError?c.error:''} ${active?c.active:''}`} {...input} type={type} placeholder={placeholder}/>
}
