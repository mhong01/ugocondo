import React from "react";
import {
	Container,
	Grid, TextField, Button, Link, Typography
} from "@material-ui/core";

import { Link as RouterLink } from 'react-router-dom';
import UserControllerInstance from "../Controller/UserController";
import { UserModel } from "../Model/User";

import {
	Redirect
  } from "react-router-dom";

class RegisterPage extends React.Component<any, any>{
	private password: string;
	private fullName: string;
	private email: string;

	private user: UserModel;

	constructor(props) {
		super(props);
		this.initPrimaryFields();

		this.state = {
			email: null,
			password: null,
			fullName: null,
			emptyMsg: null,
			redirectToReferrer: false,
			to: "/login"
		}
	}

	initPrimaryFields() {
		this.setState({
			email: "",
			password: "",
			fullName: "",
			emptyMsg: "",
		});
	}

	async onSignUpUserClicked() {
		let emptyMsg: string = "";
		if ((this.state.fullName == null || this.state.fullName.trim() === "")
			|| (this.state.email == null || this.state.email.trim() === "")
			|| (this.state.password == null || this.state.password.trim() === "")) {
			emptyMsg = "Invalid input!";
		}

		if (emptyMsg.trim() !== "") {
			this.setState({
				emptyMsg: emptyMsg,
			})
		} else {

			let user: UserModel = new UserModel();
			user = new UserModel();
			user.Email = this.state.email;
			user.Password = this.state.password;
			user.Fullname = this.state.fullName;

			await UserControllerInstance.CreateUser(user);
			this.user = user;

			this.setState({redirectToReferrer: true})
			console.log(this.user);
			// console.log(status);
		}

	}



	render() {
		if (this.state.redirectToReferrer) return <Redirect to={this.state.to} />;

		return (
			<Container component="main" maxWidth="xs">
				<div>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>

					<form noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoComplete="fullName"
									name="fullName"
									variant="outlined"
									required
									fullWidth
									id="fullName"
									label="Full Name"
									autoFocus
									onChange={(e) => this.setState({
										fullName: e.currentTarget.value
									})}
									helperText={this.state.emptyMsg}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									onChange={(e) => this.setState({
										email: e.currentTarget.value
									})}
									helperText={this.state.emptyMsg}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									onChange={(e) => this.setState({
										password: e.currentTarget.value
									})}
									helperText={this.state.emptyMsg}
								/>
							</Grid>
						</Grid>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							onClick={() => this.onSignUpUserClicked()}>
							Sign Up
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link component={RouterLink}
									{...{ to: '/register' } as any}>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}
}

export default RegisterPage;

// const styles = {
// 	Container: {
// 		height: "100%",
// 		width: "100%",
// 		display: 'flex',
// 		// overflowY: 'hidden'
// 		// flexDirection: 'column'
// 	} as CSSProperties,
// 	Margin: {
// 		margin: 10
// 	} as CSSProperties,
// 	margin: {
// 		margin: 10,
// 	}
// }