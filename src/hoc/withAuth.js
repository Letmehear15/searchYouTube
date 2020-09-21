import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuth = (Component) => {
    const Wrapper =  (props) => {
        if(!props.isAuth) return <Redirect to='/login'/>
        return (
            <Component {...props}/>
        )
    }
    return connect(mapStateToProps)(Wrapper)
}