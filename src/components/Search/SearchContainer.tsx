import React, { Dispatch, FC } from "react";
import {getVideo,setSearchText,setIsFavorite} from '../../redux/reducers/searchReducer'
import {addFavorite} from '../../redux/reducers/favoriteReducer'
import { connect } from "react-redux";
import Search from "./Search";
import VideosItems from "./VideoItems/VideosItems";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { RootState } from "../../redux/reduxStore";
import ShowList from "./VideoItems/ShowList";

type MapDispatch = {
    getVideo: (text: string) => void
    setSearchText: (value:string) => void
    setIsFavorite: (prop: boolean) => void
    addFavorite:(text:string) => void
}

type MapState = {
    videos: Array<any>
    searchText: string
    isFavorite: boolean
}

type CommonProps = MapDispatch&MapState

const SearchContainer:FC<CommonProps> = ({getVideo, videos, searchText, setSearchText, setIsFavorite, isFavorite, addFavorite}) => {

    const[modalMode, setModal] = useState(false);
    const[showMode, setShow] = useState(true)

    const onAddFavorite = ( text:string ) => {
        addFavorite(text)
        setModal(true)
    }

    const onSearch = (event:React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        getVideo(searchText)
        if(searchText === '') setIsFavorite(false);
        setIsFavorite(true)
    }

    return (
        <div>
            <Search 
                searchText={searchText}
                onSearch={onSearch} 
                setModal={setModal}
                setSearchText={setSearchText}
                isFavorite={isFavorite}
                setIsFavorite={setIsFavorite}
            />
            {videos.length?<ShowList setShow={setShow}/>:''}
            {modalMode&&isFavorite&&<Modal readOnly onAddFavorite={onAddFavorite} setModal={setModal} title={'Save'} inputText={searchText}/>}
            <VideosItems showMode={showMode} videos={videos}/>
        </div>
    )
}
const mapStateToProps = (state:RootState):MapState => {
    return {
        videos: state.search.video,
        searchText: state.search.searchText,
        isFavorite: state.search.isFavorite
    }
}
const mapDispatchToProps = (dispatch:Dispatch<any>):MapDispatch => {
    return {
        setSearchText:(value) => dispatch(setSearchText(value)),
        setIsFavorite:(prop) => dispatch(setIsFavorite(prop)),
        addFavorite: (text) => dispatch(addFavorite(text)),
        getVideo: (text) => dispatch(getVideo(text))
    }
}
export default connect<MapState,MapDispatch,{},RootState>(mapStateToProps, mapDispatchToProps)(SearchContainer);