import React, { CSSProperties } from 'react';
import { CssBaseline, Typography, Container, TextField, Grid } from '@material-ui/core';
import { Input } from 'semantic-ui-react'

export default class AddHome extends React.Component<any>{
	constructor(props) {
		super(props);

		this.state = {
			
		}

	}

	render() {
		return (
			<div style={Styles.Container}>
				<TextField
					id="standard-name"
					label="Property name"
					margin="normal"
					style={Styles.SingleInput}
				/>
				<div style={Styles.HorizontalInputContainer}>
				<TextField
					id="standard-name"
					label="Unit"
					margin="normal"
					style={{ ...Styles.DoubleInput, ...Styles.LeftInput_3 }}
				/>
				<TextField
					id="standard-name"
					label="Address"
					margin="normal"
					style={{ ...Styles.DoubleInput, ...Styles.RightInput_7 }}
				/>
				</div>
				<div style={Styles.HorizontalInputContainer}>
					<TextField
						id="standard-name"
						label="City"
						margin="normal"
						style={{ ...Styles.DoubleInput, ...Styles.LeftInput }}
					/>
					<TextField
						id="standard-name"
						label="Province/State"
						margin="normal"
						style={{ ...Styles.DoubleInput, ...Styles.RightInput }}
					/>
				</div>
				<div style={Styles.HorizontalInputContainer}>
					<TextField
						id="standard-name"
						label="Country"
						margin="normal"
						style={{ ...Styles.DoubleInput, ...Styles.LeftInput }}
					/>
					<TextField
						id="standard-name"
						label="Zip"
						margin="normal"
						style={{ ...Styles.DoubleInput, ...Styles.RightInput }}
					/>
				</div>
				<TextField
					id="standard-name"
					label="Area"
					margin="normal"
					style={Styles.SingleInput}
				/>
				<div style={Styles.HorizontalInputContainer}>
					<TextField
						id="standard-name"
						label="# Bed"
						margin="normal"
						type="number"
						style={{ ...Styles.DoubleInput, ...Styles.LeftInput }}
					/>
					<TextField
						id="standard-name"
						label="# Bath"
						margin="normal"
						type="number"
						style={{ ...Styles.DoubleInput, ...Styles.RightInput }}
					/>
				</div>
			</div>
		);
	}
}

const Styles = {
	Container: {
		width: "100%",
		display: "flex",
		flexDirection: 'column',
		justifyContent: "center",
		alignItems: "center",
		overflowY: 'scroll',
		flexGrow: 1
	} as CSSProperties,
	HorizontalInputContainer: {
		width: "80%",
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: 'nowrap',
		// backgroundColor: "blue"
	} as CSSProperties,
	DoubleInput: {
		// display: 'inline-flex',
		// margin: "20px
		// display: 'flex',
		// alignSelf: 'center',
		margin: 0,
		width: '50%',
	} as CSSProperties,
	LeftInput: {
		marginRight: "10px"
	} as CSSProperties,
	LeftInput_3: {
		marginRight: "10px",
		width: '30%',
	} as CSSProperties,
	RightInput: {
		marginLeft: "10px"
	} as CSSProperties,
	RightInput_7: {
		marginLeft: "10px",
		width: '70%',
	} as CSSProperties,
	SingleInput: {
		margin: "20px",
		width: "50%"
	} as CSSProperties,
}