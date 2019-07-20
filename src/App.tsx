import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";
import HomePageModule from './View/HomePage';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import FavoritePage from './View/FavoritePage';
import { ListItem } from '@material-ui/core';

var firebaseConfig = {
	apiKey: "AIzaSyCa5x2BrXTxGDe03CnbmO9Hf--sXAKo3k4",
	authDomain: "ugocondo.firebaseapp.com",
	databaseURL: "https://ugocondo.firebaseio.com",
	projectId: "ugocondo",
	storageBucket: "ugocondo.appspot.com",
	messagingSenderId: "499685502989",
	appId: "1:499685502989:web:c6d9a4d45da9d278"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const App: React.FC = () => {
	return (
		// <HomePageModule/>
		<BrowserRouter>
			<Route path='/' component={HomePageModule}></Route>
			<Switch>
				<Route path='/favorite' component={FavoritePage}></Route>
				<Route path='/items' component={ListItem}></Route>
			</Switch>
        </BrowserRouter>
	);
}

export default App;
