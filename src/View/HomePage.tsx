import React from 'react';
import { drawerWidth } from './styles/StylesModule';
import UGoDrawer from './UGoDrawer';
import UGoAppBar from './UGoAppBar';
import AddHome from './HomeCRUD/AddHome';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CSSProperties } from '@material-ui/styles';
import RequestPage from './ContractPage';
import ListItem from './ListItem';
import EditHome from './HomeCRUD/EditHome';
import MyPage from './MyPage';
import RegisterPage from './Register';
import LoginPage from './LoginPage';
import DetailPostView from './DetailPostView';

export default class HomePage extends React.Component<any, any> {

	public static isLoggedIn: boolean = false;

	private userEmail: string = "";
	private isUserLoggedIn: boolean = false;

	constructor(props) {
		super(props);
		this.state = {
			CurrentView: "AddHome",
			isUserLoggedIn: this.isUserLoggedIn,
			userEmail : this.userEmail,
		}
	}

	ShowAddHome() {
		this.setState({ CurrentView: "AddHome" })
	}

	// public setLoggedIn(isLoggedIn: boolean){
	// 	this.isLoggedIn = isLoggedIn;
	// }

	render() {
		const styles_ = {
			toolbar: {
				minHeight: 64,
			}
		}

		return (
			<div style={styles.Container}>
			<BrowserRouter>
			<UGoAppBar/>
				<UGoDrawer />
					<Switch>
				<main style={styles.Main}>
					<div style={styles_.toolbar} />
						<Route exact path='/' component={ListItem}></Route>
						<Route path='/postNewHome' component={AddHome}></Route>
						<Route path='/edithome' component={EditHome}></Route>
						<Route path='/request' component={RequestPage}></Route>
						<Route path='/my' component={MyPage}></Route>
						<Route path='/login' component={LoginPage}></Route>
						<Route path='/signup' component={RegisterPage}></Route>
						<Route path='/logout' component={ListItem}></Route>
						<Route path='/view/:id' component={DetailPostView}></Route>
				</main>
					</Switch>
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
		marginLeft: drawerWidth,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	} as CSSProperties
}

// enum HomeViewsEnum {
// 	List = "List",
// 	AddHome = "AddHome"
// }
