import React, { FC } from 'react'
import list from './list.svg'
import grid from './grid.svg'
import c from './list.module.css'

type ownProps = {
    setShow:(prop:boolean) => void
}

const ShowList:FC<ownProps> = (props) => {
    const{setShow} = props;
    return (
        <div className={c.wrapper}>
            <span className={c.grid} onClick={() => setShow(true)}>
                <img className={c.svg} src={grid} alt=""/>
            </span>
            <span className={c.list}>
                <img className={c.svg} src={list} alt="" onClick={() => setShow(false)}/>
            </span>
        </div>
    )
}

export default ShowList