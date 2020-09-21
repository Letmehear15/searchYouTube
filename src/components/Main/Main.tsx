import React, { FC } from 'react';
import Header from '../Header/Header';
import SearchContainer from '../Search/SearchContainer';
import { BrowserRouter as Router, Route} from "react-router-dom";
import FavoriteContainer from '../Favorite/FavoriteContainer';

const Main:FC= () => {
    return (
        <Router>
            <Header/>
            <Route path="/search" component={()=><SearchContainer/>}/>
            <Route path="/favorite" component={()=><FavoriteContainer/>}/>
        </Router>
    )
}

export default Main;