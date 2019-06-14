import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";

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
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload bla.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
