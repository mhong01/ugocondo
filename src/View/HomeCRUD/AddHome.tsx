import React from 'react';
import { CssBaseline, Typography, Container, TextField } from '@material-ui/core';
import { tsConstructorType } from '@babel/types';
import { render } from 'react-dom';

export default class AddHome extends React.Component<any>{
	constructor(props) {
		super(props);


	}

	render() {
		return (
			<Container style={Styles.Container}>
				<TextField
					id="standard-name"
					label="Name"
					// onChange={handleChange('name')}
					margin="normal"
				/>
			</Container>
		);
	}
}

const Styles = {
	Container: {
		backgroundColor: "black",
		height: "100%"
	}
}