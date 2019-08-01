import React from 'react';
import { Component } from 'react';
import { withStyles } from "@material-ui/styles";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import { drawerWidth } from "./styles/StylesModule";
import Home from '@material-ui/icons/Home';
import Favorite from '@material-ui/icons/Favorite';
import Add from '@material-ui/icons/Add';
import QueryBuilder from '@material-ui/icons/QueryBuilder';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HowToReg from '@material-ui/icons/HowToReg';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom'
import UserControllerInstance from '../Controller/UserController';
import {
	Redirect
  } from "react-router-dom";

class UGoDrawer extends Component<any, any, any> {
	static propTypes: {};

	constructor(props) {
		super(props);

		this.state = {
			redirectToReferrer: false,
			to: "/login"
		}

		this.logout = this.logout.bind(this);
	}

	navigateHome() {
		return (<ListItem />);
	}

	navigateFavourite() {

	}

	logout() {
		UserControllerInstance._IsSignedIn =  false;

		this.setState({redirectToReferrer: true})
	}

	render() {
		let redirect = null;
		if (this.state.redirectToReferrer) {
			console.log("blad")
			redirect = <Redirect to={this.state.to} />;
		}

		const ClippedDrawer = withStyles({
			root: {
				top: 0,
				flex: '1 0 auto',
				height: '100%',
				display: 'flex',
				outline: 'none',
				position: 'fixed',
				overflowY: 'auto',
				flexDirection: 'column',
			},
			paper: {
				width: drawerWidth,
			},
		})(Drawer);

		const styles = {
			toolbar: {
				minHeight: 64,
			},
			content: {
				flexGrow: 1,
				marginLeft: drawerWidth,
				padding: 3,
				width: 100,
			},
		}
		return (
			<ClippedDrawer variant="permanent">
				{redirect}
				<div style={styles.toolbar} />
				<List>
					<ListItem component={Link}
						{...{ to: '/' } as any}
						button >
						<ListItemIcon><Home/></ListItemIcon>
						<ListItemText primary="Homepage" />
					</ListItem>
					<ListItem component={Link}
						{...{ to: '/request' } as any}
						button>
						<ListItemIcon><QueryBuilder /></ListItemIcon>
						<ListItemText primary="Booking Request" />
					</ListItem>
					<ListItem component={Link}
						{...{ to: '/my' } as any}
						button>
						<ListItemIcon><Favorite /></ListItemIcon>
						<ListItemText primary="My List" />
					</ListItem>
					<ListItem component={Link}
						{...{ to: '/postNewHome' } as any}
						button>
						<ListItemIcon><Add /></ListItemIcon>
						<ListItemText primary="Post New Home" />
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem component={Link}
						{...{ to: '/login' } as any} button>
						<ListItemIcon><AccountCircle /></ListItemIcon>
						<ListItemText primary="Log-in" />
					</ListItem>
					<ListItem component={Link}
						{...{ to: '/signup' } as any} button>
						<ListItemIcon><HowToReg /></ListItemIcon>
						<ListItemText primary="Register" />
					</ListItem>
					<ListItem button onClick={this.logout}>
						<ListItemIcon><ExitToApp /></ListItemIcon>
						<ListItemText primary="Log-out" />
					</ListItem>
				</List>
			</ClippedDrawer>
		);
	}
}

export default UGoDrawer;