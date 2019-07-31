import React from "react";
import { Container, CssBaseline, Avatar, Typography, 
    Grid, TextField, FormControlLabel, 
    Checkbox, Button, Link, Box } from "@material-ui/core";

import {Link as RouterLink} from 'react-router-dom';
import { CSSProperties } from "@material-ui/styles";
import { UserController, SignUpEnum } from "../Controller/UserController";
import { string } from "prop-types";
import { UserModel } from "../Model/User";

class RegisterPage extends React.Component<any,any>{

  private userController : UserController;
  private password:string;
  private fullName:string;
  private email: string;

  private user: UserModel;

  constructor(props){
    super(props);
    this.userController = new UserController();
    this.initPrimaryFields();

    this.state = {
      email: null, 
      password : null,
      fullName: null,
      emptyMsg: null,
    }
  }

  initPrimaryFields(){
    this.setState({
      email: "", 
      password : "",
      fullName: "",
      emptyMsg: "",
    });
  }

  onSignUpUserClicked(){
    let emptyMsg: string = "";
    if ((this.state.fullName == null || this.state.fullName.trim() == "")
        || (this.state.email == null || this.state.email.trim() == "")
        || (this.state.password == null || this.state.password.trim() == "")){
        emptyMsg = "Invalid input!";
    }

    if (emptyMsg.trim() != ""){
      this.setState ({
        emptyMsg : emptyMsg,
      })
    } else {

      let user : UserModel = new UserModel();
      user = new UserModel();
      user.Email = this.state.email;
      user.Password = this.state.password;
      user.Fullname = this.state.fullName;

      this.userController.SignUpUser(user);
      this.user = user;

      console.log(this.user);
      // console.log(status);
    }

  }



  render(){
    return(
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
              type="submit"
              fullWidth
              variant="contained"
              color="primary" 
              onClick={() => this.onSignUpUserClicked()}>
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link component={RouterLink}
                  {...{ to: '/register'} as any}>
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

const styles = {
	Container: {
		height: "100%",
		width: "100%",
		display: 'flex',
		// overflowY: 'hidden'
		// flexDirection: 'column'
	} as CSSProperties,
	Margin: {
		margin: 10
    } as CSSProperties,
    margin: {
        margin: 10,
    }
}