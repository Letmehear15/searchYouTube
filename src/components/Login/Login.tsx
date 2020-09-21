import React, { FC } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { ValidatorInput } from '../VaidatorInfo/ValidatorInfo';
import { required } from '../../validators/validators';
import {getAuth} from '../../redux/reducers/authReducer'
import c from './login.module.css';
import logo from './logo.png'
import { connect } from 'react-redux';
import { RootState } from '../../redux/reduxStore';
import { Redirect } from 'react-router-dom';

const LoginReduxForm:FC<InjectedFormProps<ValueForm>> = (props) => {
    const{handleSubmit, error} = props;

    return (
        <form className={c.form} onSubmit={handleSubmit}>
            <Field 
                name="login" 
                component={ValidatorInput} 
                type="text" 
                placeholder="Login"
                validate={[required]}/>
            <Field 
                name="password" 
                component={ValidatorInput} 
                type="password" 
                placeholder="Password"
                validate={[required]}/>  
            <button className={c.formBtn}>Login</button>   
            {error? <span className={c.commonError}>Wrong login or password</span>:null}
        </form>
    )
}
const LoginForm =  reduxForm<ValueForm>({
    form: 'login'
})(LoginReduxForm)

type ValueForm = {
    login: string
    password: string
}

type MapDispatch = {
    getAuth: (value:ValueForm) => void
}

type MapState = {
    isAuth: boolean
}

type CommonProps = MapDispatch&MapState

const Login:FC<CommonProps> = (props) => {
    const onSubmit = (value:ValueForm) => {
        props.getAuth(value)
    }

    if(props.isAuth) return <Redirect to="/search"/>

    return (
        <div className={c.formWrapper}>
            <div className={c.logo}>
                <img src={logo} alt="logo"/>
            </div>
            <LoginForm onSubmit={onSubmit}/>
        </div>
    )
}   
const mapStateToProps = (state:RootState):MapState => {
    return {
        isAuth: state.auth.isAuth
    }
}
export default connect<MapState, MapDispatch,{},RootState>(mapStateToProps, {getAuth})(Login);

