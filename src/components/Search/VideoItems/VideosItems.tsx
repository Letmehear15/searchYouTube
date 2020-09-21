import React, { FC } from 'react';
import c from './videoItems.module.css'

const VideosItems:FC<any> = (props) => {
    const{showMode} = props
    const items = props.videos.map((el:any)=> {
        return (
            <div className={showMode?c.item:c.itemList} key={el.id.videoId}>
                <img className={c.itemImg} src={el.snippet.thumbnails.medium.url} alt="video"/>
                <div className={!showMode?c.descrWrap:''}>
                    <span className={c.title}>{el.snippet.channelTitle}</span>
                    <span className={c.descr}>{el.snippet.title}</span>
                </div>
            </div>
        )
    })

    return (
        <div className={showMode?c.items:c.list}>
            {items}
        </div>
    )
}

export default VideosItems;