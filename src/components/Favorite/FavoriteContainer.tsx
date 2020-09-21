import React, { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {getFavorite, deleteFavorite, editFavorite} from '../../redux/reducers/favoriteReducer'
import {fromFavorite} from '../../redux/reducers/searchReducer'
import { RootState } from '../../redux/reduxStore'
import Favorite from './Favorite'
import { FavoriteType } from '../../api/serviceApi'
import Modal from '../Modal/Modal'

type MapDispatchType = {
    getFavorite:() => void
    deleteFavorite:(id:string) => void
    editFavorite:(text:string,id:string,userId:string|null) => void
    fromFavorite: (searchText:string) => void
}

type MapState = {
    favorite: Array<FavoriteType>
}

type CommonProps = MapDispatchType&MapState

const FavoriteContainer:FC<CommonProps> = (props) => {

    const[isModal, setModal] = useState(false)
    const[title, setTitle] = useState('')
    const[postId, setPostID] = useState('')

    useEffect(() => {
        props.getFavorite()
    },[])

    return (
        <>
            <Favorite {...props} setPostID={setPostID} setModal={setModal} setTitle={setTitle}/>
            {isModal?
                <Modal inputText={title} setModal={setModal} title={'Edit'} editFavorite={props.editFavorite} postId={postId}/>
                :null}
        </>
        
    )
}

const mapStateToProps = (state:RootState):MapState => {
    return {
        favorite: state.favorite.favorite
    }
}

export default connect<MapState,MapDispatchType,{},RootState>(mapStateToProps,{getFavorite,deleteFavorite,editFavorite,fromFavorite})(FavoriteContainer)