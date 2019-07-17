import React from 'react';
import stylesModule from './styles/StylesModule';
import { CssBaseline, Typography, Container } from '@material-ui/core';
import UGoDrawer from './UGoDrawer';
import UGoAppBar from './UGoAppBar';
import { tsConstructorType } from '@babel/types';
import { render } from 'react-dom';
import AddHome from './HomeCRUD/AddHome';

export default class HomePage extends React.Component<any> {

	constructor(props){
		super(props);

		this.state = {
			CurrentView: "AddHome"
		}
	}

	ShowAddHome() {
		this.setState({CurrentView: "AddHome"})
	}

	render(){
		let view = null;
		switch((this.state as any).CurrentView){
			case HomeViewsEnum.AddHome:
				view = <AddHome></AddHome>
				break;
		}

		console.log(view);

		return (
			<Container>
				<CssBaseline />
				<UGoAppBar />
				<UGoDrawer />
				<Container>
					{view}
				</Container>
			</Container>
		);
	}
}

enum HomeViewsEnum{
	List = "List",
	AddHome = "AddHome"
}
