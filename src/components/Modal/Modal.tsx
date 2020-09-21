import React, { ChangeEvent, FC , useState } from 'react';
import c from './modal.module.css'

type CommonProps = {
    setModal:(prop:boolean) => void
    onAddFavorite?: (text: string) => void 
    editFavorite?:(text:string,id:string,userId:string|null) => void
    inputText: string
    title: string
    readOnly?: boolean
    postId?:string
}

const Modal:FC<CommonProps> = ({setModal, inputText, onAddFavorite, readOnly, title, editFavorite, postId}) => {

    const [value, setValue] = useState('')

    const onSave = (title:string) => {
        const userId = localStorage.getItem('id');
        if(onAddFavorite) onAddFavorite(title)
        if(editFavorite&&postId) editFavorite(value ,postId,userId)
        setModal(false)
    }
     
    return (
        <div className={c.modalWrapper}>
            <div className={c.modal}>
                <h2 className={c.title}>{title}</h2>
                <div className={c.inputWrap}>
                    <span className={c.label}>Name:</span>
                    <input 
                        onChange={(e:ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} 
                        readOnly={readOnly} 
                        className={`${c.name} ${readOnly?c.readOnly:''}`} 
                        type="text" 
                        defaultValue={inputText}/>
                </div>
                <div className={c.modalBtn}>
                    <button className={c.btn} onClick={() => setModal(false) }>Close</button>
                    <button className={c.btn} onClick={() => onSave(inputText)}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default Modal