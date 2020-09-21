import React, { FC } from 'react';
import load from './load.gif';

const Loader:FC = () => {
    return (
        <div>
            <img src={load} alt="load"/>
        </div>
    )
}

export default Loader;