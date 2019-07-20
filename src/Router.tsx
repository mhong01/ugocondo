import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ListItem from './View/ListItem';
import FavoritePage from './View/FavoritePage';
import HomePageModule from './View/HomePage';

export default class UGoRouter extends React.Component<any,any>{
    render(){
        return(
            <BrowserRouter>
                <Route exact path='/' component={ListItem}></Route>
                <Switch>
                    <Route path='/favorite' component={FavoritePage}></Route>
                    <Route path='/' component={ListItem}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}