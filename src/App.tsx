import React, { useEffect, FC } from 'react';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {initialization} from './redux/reducers/authReducer'
import Loader from './components/Loader/Loader'
import './app.css'
import { RootState } from './redux/reduxStore';

type MapState = {
  isAuth: boolean
  isInit: boolean
}

type MapDispatch = {
  initialization: () => void
}

type CommonProps = MapState&MapDispatch

const App:FC<CommonProps> = ({isAuth, isInit, initialization}) => {

  useEffect(() => {
    initialization()
  },[])

  if(!isInit) return <Loader/> 

  return (
   <Router>
      <div className='container'>

        <Route path="/login" component={() => <Login/>}/>
        <Route path='/search' component={()=><Main/>}/>
        <Route path='/favorite' component={()=><Main/>}/>
        {!isAuth?<Redirect to='login'/>:null}
        <Redirect from='/' to="/login"/>
      </div>
   </Router>
  );
}
const mapStateToProps = (state:RootState):MapState => {
  return {
    isAuth: state.auth.isAuth,
    isInit: state.auth.isInit
  }
}
export default connect<MapState,MapDispatch,{},RootState>(mapStateToProps,{initialization})(App);
