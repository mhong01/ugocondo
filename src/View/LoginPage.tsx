import React from 'react';
import { Container, Button, CssBaseline
	, Typography, TextField, FormControlLabel,
	 Checkbox, Grid, Link, Box } from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

class LoginPage extends React.Component<any>
{
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container component="main" maxWidth="xs">
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary">
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink}
                      {...{ to: '/register'} as any}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
		)
	}
}

export default LoginPage;


