import React, { FC } from 'react' ;
import { NavLink } from 'react-router-dom';
import c from './header.module.css'
import { connect } from 'react-redux';
import {logout} from '../../redux/reducers/authReducer'
import { RootState } from '../../redux/reduxStore';

type MapDispatchProps = {
    logout: () => void
}

const Header:FC<MapDispatchProps> = (props) => {

    const onExit = () => {
        props.logout()
    }

    return (
        <header className={c.header}> 
            <div className={c.left}>
                <NavLink activeClassName={c.active} to="/search"> Search </NavLink>
                <NavLink activeClassName={c.active} to="/favorite"> Favorite </NavLink>
            </div>
            <div className={c.logout}>
                <NavLink to="/login" onClick={onExit}> Exit </NavLink>
            </div>
        </header>
    )
}


export default connect<{},MapDispatchProps,{},RootState>(null, {logout})(Header);