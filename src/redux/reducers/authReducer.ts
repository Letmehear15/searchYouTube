import { getUserAuth } from "../../api/serviceApi";
import { stopSubmit } from "redux-form";
import { ThunkAction } from 'redux-thunk';
import { ActionThunkType, AllActions, RootState } from "../reduxStore";

const initialState = {
    login: null as null | string,
    password: null as null | string,
    isAuth: false,
    isInit: false
}

export const authReducer = (state=initialState, action:ActionsAuth):StateAuth => {
    switch(action.type) {
        case "SET_LOGIN": {
            return {
                ...state,
                ...action.data,
                isAuth:true
            }
        }
        case "SET_LOGOUT": {
            return {
                ...state,
                isAuth: false,
            }
        }
        case "SETINIT": {
            return {
                ...state,
                isInit: true
            }
        }
        default: {
            return state
        }
    }
}

type DataType = {
    password:string, 
    login:string
}

const allActionCreaters = {
    auth: (password:string, login:string) => ({type: "SET_LOGIN",data: {password, login},} as const),
    setInit: () => ( {type: "SETINIT"} as const),
    logout: () => {localStorage.removeItem('id'); return {type: "SET_LOGOUT",} as const}
}


/////////
//THUNK//
/////////

export const setLocal = ():AuthThunkType => async (dispatch) => {
    const local = localStorage.getItem('id');
    const result = await getUserAuth.getAuth();

    result.data.filter(el=>{
        if(el.id===local) {
            return dispatch(allActionCreaters.auth(el.password, el.login))
        }
    })
}
export const initialization = ():AuthThunkType => async (dispatch) => {
    let promise = dispatch(setLocal())
    promise.then(() => dispatch(allActionCreaters.setInit()))
}
export const getAuth = ({password, login}:DataType):AuthThunkType => async (dispatch) => {
    const result = await getUserAuth.getAuth();

    result.data.filter(el => {
        if(el.password === password && el.login.toLowerCase() === login.toLowerCase()) {
            localStorage.setItem('id', `${el.id}`);
            return dispatch(allActionCreaters.auth(password,login))
        }
        else return dispatch(stopSubmit('login', {_error:'Wrong login or password'}))
    })
}
export const logout = ():ThunkAction<void, RootState, unknown, ActionsAuth> => (dispatch) => {
   dispatch(allActionCreaters.logout())
}

type ActionsAuth = ReturnType<AllActions<typeof allActionCreaters>>
type StateAuth = typeof initialState
type AuthThunkType = ActionThunkType<ActionsAuth>