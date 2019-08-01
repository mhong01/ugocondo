import React, {useContext} from 'react';
import {
	Container, Button, Typography, TextField, FormControlLabel,
	Checkbox, Grid, Link
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import UserControllerInstance from '../Controller/UserController';
import HomePage from './HomePage';
import UGoContext, { UGoProvider } from '../Model/Context';

class LoginPage extends React.Component<any, any, any>
{
	private password: string;
	private userName: string;

	constructor(props) {
		super(props);

		this.state = {
			errorMsg: null,
			isLoggedIn: false
		}
		this.OnSignIn = this.OnSignIn.bind(this);
	}

	componentWillMount() {
	}

	componentDidMount() {
	}

	async OnSignIn() {
		let emptyMsg: string = "";
		if ((this.state.email == null || this.state.email.trim() === "")
			|| (this.state.password == null || this.state.password.trim() === "")) {
			emptyMsg = "Invalid input!";
		}

		if (emptyMsg.trim() !== "") {
			this.setState({
				emptyMsg: emptyMsg,
			})
		} else {
			let user = await UserControllerInstance.SignInUser(this.state.email, this.state.password);

			if(user == null) {
				this.setState({errorMsg: "Invalid email/password"})
			} else {
				this.setState({isLoggedIn: true})
			}
		}
	}

	render() {
		let content = null;
		if(this.state.isLoggedIn) {
			content = <h1>Your are logged in!</h1>
			console.log(this.state);
		} else {
			console.log(this.state);
			content = (
				<div >
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={e => this.setState({email: e.currentTarget.value})}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={e => this.setState({password: e.currentTarget.value})}
						/>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							onClick={this.OnSignIn}>
							Sign In
						</Button>
						{(this.state.errorMsg != null && <div>{this.state.errorMsg}</div>)}
					</form>
				</div>
			)
		}
		return (
			<Container component="main" maxWidth="xs">
				{content}
			</Container>
		)
	}
}

export default LoginPage;


