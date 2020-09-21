import {getFavoriteApi, FavoriteType} from '../../api/serviceApi'
import { ActionThunkType, AllActions } from '../reduxStore';

const initialState = {
    favorite:[] as Array<FavoriteType>
}

export const favoriteReducer = (state=initialState, action:ActionsFavorite):StateType => {
    switch(action.type) {
        case "SET_FAVORITE": {
            return {
                ...state,
                favorite: action.favorite
            }
        }
        default: return state
    }
}
const allActionCreaters = {
    setFavorite: (favorite:Array<FavoriteType>) => ({type: "SET_FAVORITE",favorite} as const)
}

export const getFavorite = ():FavorThunkType => async (dispatch) => {
    const result = await getFavoriteApi.getFavorite();

    const favorite = result.data.filter(el => {
        return localStorage.getItem('id') === el.userId
    })
    dispatch(allActionCreaters.setFavorite(favorite))
}
export const addFavorite = (text:string):FavorThunkType => async (dispatch) => {
    const userId = localStorage.getItem('id');
    const id = Date.now().toString()

    await getFavoriteApi.addFavorite(userId,id,text);
    dispatch(getFavorite())
}
export const deleteFavorite = (id:string):FavorThunkType => async (dispatch) => {
    await getFavoriteApi.deleteFavorite(id);
    dispatch(getFavorite())
}
export const editFavorite = (text:string,id:string,userId:string|null):FavorThunkType => async (dispatch) => {
    await getFavoriteApi.editFavorite(text,id,userId)
    dispatch(getFavorite());
}

type ActionsFavorite = ReturnType<AllActions<typeof allActionCreaters>>
type StateType = typeof initialState
type FavorThunkType = ActionThunkType<ActionsFavorite>
