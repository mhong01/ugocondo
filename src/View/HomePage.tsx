import React from 'react';
import stylesModule, { drawerWidth } from './styles/StylesModule';
import { CssBaseline, Typography, Container, createStyles } from '@material-ui/core';
import UGoDrawer from './UGoDrawer';
import UGoAppBar from './UGoAppBar';
import { tsConstructorType } from '@babel/types';
import { render } from 'react-dom';
import AddHome from './HomeCRUD/AddHome';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { CSSProperties, makeStyles } from '@material-ui/styles';
import FavoritePage from './FavoritePage';
import ListItem from './ListItem';
import EditHome from './HomeCRUD/EditHome';
import MyPage from './MyPage';
import RegisterPage from './Register';
import LoginPage from './LoginPage';

export default class HomePage extends React.Component<any> {

	constructor(props) {
		super(props);

		this.state = {
			CurrentView: "AddHome"
		}
	}

	ShowAddHome() {
		this.setState({ CurrentView: "AddHome" })
	}

	render() {
		let view = null;
		switch ((this.state as any).CurrentView) {
			case HomeViewsEnum.AddHome:
				view = <AddHome></AddHome>
				break;
		}

		const styles_ = {
			toolbar: {
				minHeight: 64,
			}
		}

		return (
			<div style={styles.Container}>
				<UGoAppBar />
				<BrowserRouter>
					<UGoDrawer />
					<main style={styles.Main}>
						<div style={styles_.toolbar} />
						<Switch>
							<Route exact path='/' component={ListItem}></Route>
							<Route exact path='/postNewHome' component={AddHome}></Route>
							<Route path='/favorite' component={FavoritePage}></Route>
							<Route path='/my' component={MyPage}></Route>
							<Route path='/login' component={LoginPage}></Route>
							<Route path='/signup' component={RegisterPage}></Route>
							<Route path='/logout' component={ListItem}></Route>
						</Switch>
					</main>
				</BrowserRouter>
			</div>
		);
	}
}
const styles = {
	Container: {
		height: "100%",
		width: "100%",
		display: 'flex',
		// overflowY: 'hidden'
		// flexDirection: 'column'
	} as CSSProperties,
	FullSize: {
		height: "100%",
		width: "100%"
	} as CSSProperties,
	FullHeight: {
		height: "100%",
	} as CSSProperties,
	SideBar: {
		width: "25%"
	} as CSSProperties,
	View: {
		// width: "90%"
	} as CSSProperties,
	BottomContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "stretch"
	} as CSSProperties,
	Main: {
		flexGrow: 1,
		marginLeft: drawerWidth
	} as CSSProperties
}

enum HomeViewsEnum {
	List = "List",
	AddHome = "AddHome"
}
