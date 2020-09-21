import React, { FC } from 'react';
import { FavoriteType } from '../../api/serviceApi';
import c from './favorite.module.css';
import remove from './remove.svg'
import edit from './edit.svg'
import { NavLink } from 'react-router-dom';

type CommonProps = {
    favorite: Array<FavoriteType>
    setModal: (prop:boolean) => void
    setTitle: (title:string) => void
    deleteFavorite:(id:string) => void
    setPostID: (id:string) => void
    fromFavorite:(serachText:string) => void
}

const Favorite:FC<CommonProps> = ({favorite,setModal, setTitle, deleteFavorite, setPostID, fromFavorite}) => {

    const onEdit = (title:string, id:string) => {
        setPostID(id)
        setModal(true)
        setTitle(title)
    }

    const items = favorite.map(el => {
        return <div key={el.id} className={c.item}>
            <NavLink onClick={()=>fromFavorite(el.text)} className={c.link} to='/search'>{el.text}</NavLink>
            <div className={c.icons}>
                <img src={edit} alt="edit" className={c.edit} onClick={() => onEdit(el.text, el.id)}/>
                <img src={remove} alt="remove" onClick={() => deleteFavorite(el.id)} className={c.remove}/>
            </div>
        </div>
    })

    return (
        <div className={c.wrapper}>
            {items}
        </div>
    )
}

export default Favorite;