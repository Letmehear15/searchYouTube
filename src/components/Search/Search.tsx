import React, { FC, useState } from 'react';
import c from './search.module.css';
import like from './like.png'

type CommonProps = {
    searchText: string
    isFavorite: boolean

    setModal: (prop:boolean) => void
    setSearchText: (value:string) => void
    onSearch: (event:React.MouseEvent<HTMLElement>) => void
    setIsFavorite: (prop:boolean) => void
}

const Search:FC<CommonProps> = (props) => {

    const[editButton, setButton] = useState(true)

    const onSearchChange = (value:string) => {
        if(value === '') {
            props.setIsFavorite(false)
            setButton(true)
        } else setButton(false)    
        props.setSearchText(value)
    }

    return (
        <div className={c.searchWrapper} onSubmit={(e)=>e.preventDefault()}>
            <form className={c.form}>
                <input value={props.searchText} onChange={(e)=>onSearchChange(e.target.value)} type="text" placeholder="Search..."/>
                {props.isFavorite&&<img onClick={() => props.setModal(true)} className={c.like} src={like} alt=""/>}
                <button disabled={editButton} onClick={props.onSearch} className={c.btn}>Search</button>
            </form>
        </div>
    )
}


export default Search;