import {getVideoApi} from '../../api/serviceApi'
import { ActionThunkType } from '../reduxStore';

const GET_VIDEO = 'GET_VIDEO';
const SETTEXTSEARCH = 'SETTEXTSEARCH'
const SETFAVORITE = 'SETFAVORITE'

const initialState = {
    video:[] as Array<any>,
    searchText:'',
    isFavorite: false
}

type StateType = typeof initialState
type ActionsSearch = ReturnType<typeof setVideo>|
                     ReturnType<typeof setSearchText>|
                     ReturnType<typeof setIsFavorite>


export const searchReducer = (state=initialState, action:ActionsSearch):StateType => {
    switch(action.type) {
        case GET_VIDEO: {
            return {
                ...state,
                video: action.video
            }
        }
        case SETTEXTSEARCH: {
            return {
                ...state,
                searchText: action.text
            }
        }
        case SETFAVORITE: {
            return {
                ...state,
                isFavorite: action.prop
            }
        }
        default: {
            return state
        }
    }
}

export const AllActionCreators = {
    setVideo: (video:Array<any>) => ({type: GET_VIDEO,video} as const),
    setSearchText:(text:string) => ({type: SETTEXTSEARCH,text} as const),
    setIsFavorite:(prop:boolean) => ({ type: SETFAVORITE,prop} as const),
}

const setVideo = (video:Array<any>) => {
    return {
        type: GET_VIDEO,
        video
    } as const
}

export const setSearchText = (text:string) => {
    return {
        type: SETTEXTSEARCH,
        text
    } as const
}

export const setIsFavorite = (prop:boolean) => {
    return {
        type: SETFAVORITE,
        prop
    } as const
}

export const getVideo = (textOfSearch:string, maxSize=12):SearchThunkType => async (dispatch) => {
    const result = await getVideoApi.getVideo(textOfSearch, maxSize);
    dispatch(setVideo(result.data.items))
}
export const fromFavorite = (searchText:string):SearchThunkType => async (dispatch) => {
    dispatch(setSearchText(searchText))
    dispatch(setIsFavorite(false))
    dispatch(getVideo(searchText))
}

type SearchThunkType = ActionThunkType<ActionsSearch>