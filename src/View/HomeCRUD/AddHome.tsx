import React, { CSSProperties } from 'react';
import { CssBaseline, Typography, Container, TextField, Grid, Button } from '@material-ui/core';
import { Input } from 'semantic-ui-react'
import PostControllerInstance from '../../Controller/PostController';
import { PostModel } from '../../Model/Post';
import {
	Redirect
} from "react-router-dom";
import UserControllerInstance from '../../Controller/UserController';

export default class AddHome extends React.Component<any, any, any>{
	constructor(props) {
		super(props);

		this.state = {
			PropertyName: null,
			Unit: null,
			Address: null,
			City: null,
			ProvinceState: null,
			Country: null,
			Zip: null,
			Area: null,
			NumOfBed: null,
			NumOfBath: null,
			NumOfParking: null,
			ParkingType: null,
			PropertyNameCheck: null,
			UnitCheck: null,
			AddressCheck: null,
			CityCheck: null,
			ProvinceStateCheck: null,
			CountryCheck: null,
			ZipCheck: null,
			AreaCheck: null,
			NumOfBedCheck: null,
			NumOfBathCheck: null,
			NumOfParkingCheck: null,
			ParkingTypeCheck: null,
			Price: null,
			Description: null,
			ImageURL: null,
			redirectToReferrer: !UserControllerInstance._IsSignedIn,
			to: "/login"
		}

		this.OnAddHouseClick = this.OnAddHouseClick.bind(this)
	}
	
	async OnAddHouseClick() {
		console.log(UserControllerInstance._User.id);
		console.log(this.state)
		if (this.state.PropertyName == null) {
			this.setState({ PropertyNameCheck: "Cannot be empty!" });
			return;
		} else {
			this.setState({ PropertyNameCheck: null });
		}

		if (this.state.Unit == null) {
			this.setState({ UnitCheck: "Cannot be empty!" });
			return;
		} else {
			this.setState({ UnitCheck: null });
		}

		if (this.state.Address == null) {
			this.setState({ AddressCheck: "Cannot be empty!" });
			return;
		} else {
			this.setState({ AddressCheck: null });
		}

		if (this.state.City == null) {
			this.setState({ CityCheck: "Cannot be empty!" });
			return;
		} else {
			this.setState({ CityCheck: null });
		}

		if (this.state.ProvinceState == null) {
			this.setState({ ProvinceStateCheck: "Cannot be empty!" });
			return;
		} else {
			this.setState({ ProvinceStateCheck: null });
		}

		if (this.state.Country == null) {
			this.setState({ CountryCheck: "Cannot be empty!" });
			return;
		} else {
			this.setState({ CountryCheck: null });
		}

		if (this.state.Zip == null) {
			this.setState({ ZipCheck: "Cannot be empty!" });
			return;
		} else {
			this.setState({ ZipCheck: null });
		}

		if (this.state.Area == null) {
			this.setState({ AreaCheck: "Cannot be empty!" });
			return;
		} else {
			this.setState({ AreaCheck: null });
		}

		if (this.state.NumOfBed == null) {
			this.setState({ NumOfBedCheck: "Cannot be empty!" });
			return;
		} else {
			this.setState({ NumOfBedCheck: null });
		}

		if (this.state.NumOfBath == null) {
			this.setState({ NumOfBathCheck: "Cannot be empty!" });
			return;
		} else {
			this.setState({ NumOfBathCheck: null });
		}

		if (this.state.NumOfParking == null) {
			this.setState({ NumOfParkingCheck: "Cannot be empty!" });
			return;
		} else {
			this.setState({ NumOfParkingCheck: null });
		}

		if (this.state.ParkingType == null) {
			this.setState({ ParkingTypeCheck: "Cannot be empty!" });
			return;
		} else {
			this.setState({ ParkingTypeCheck: null });
		}

		if (this.state.Price == null) {
			this.setState({ PriceCheck: "Cannot be empty!" });
			return;
		} else {
			this.setState({ PriceCheck: null });
		}

		if (this.state.Description == null) {
			this.setState({ DescriptionCheck: "Cannot be empty!" });
			return;
		} else {
			this.setState({ DescriptionCheck: null });
		}

		if (this.state.ImageURL == null) {
			this.setState({ ImageURLCheck: "Cannot be empty!" });
			return;
		} else {
			this.setState({ ImageURLCheck: null });
		}


		let newHouse = new PostModel();
		newHouse.PropertyName = this.state.PropertyName;
		newHouse.Unit = this.state.Unit;
		newHouse.Address = this.state.Address;
		newHouse.City = this.state.City;
		newHouse.ProvinceState = this.state.ProvinceState;
		newHouse.Country = this.state.Country;
		newHouse.Zip = this.state.Zip;
		newHouse.Area = this.state.Area;
		newHouse.NumOfBed = this.state.NumOfBed;
		newHouse.NumOfBath = this.state.NumOfBath;
		newHouse.NumOfParking = this.state.NumOfParking;
		newHouse.ParkingType = this.state.ParkingType;
		newHouse.Price = this.state.Price;
		newHouse.Description = this.state.Description;
		newHouse.ImageURL = this.state.ImageURL;

		newHouse.OwnerID = UserControllerInstance._User.id

		console.log(newHouse);

		let result = await PostControllerInstance.CreatePost(newHouse)
		if (result != null) {
			this.setState({ to: "/edithome" });
			this.setState({ redirectToReferrer: true })
		}
	}

	render() {
		if (this.state.redirectToReferrer) {
			console.log("blad")
			return <Redirect to={this.state.to} />;
		}

		return (
			<div style={Styles.Container}>
				<TextField
					id="standard-name"
					label="Property name"
					margin="normal"
					style={Styles.SingleInput}
					onChange={(e) => this.setState({ PropertyName: e.currentTarget.value })}
					helperText={this.state.PropertyNameCheck}
				/>
				<TextField
					id="standard-name"
					label="Price"
					margin="normal"
					style={Styles.SingleInput}
					onChange={(e) => this.setState({ Price: e.currentTarget.value })}
					helperText={this.state.PriceCheck}
				/>
				<div style={Styles.HorizontalInputContainer}>
					<TextField
						id="standard-name"
						label="Description"
						margin="normal"
						type="text"
						style={{ ...Styles.DoubleInput, ...Styles.LeftInput }}
						onChange={(e) => this.setState({ Description: e.currentTarget.value })}
						helperText={this.state.DescriptionCheck}
					/>
					<TextField
						id="standard-name"
						label="Image Link"
						margin="normal"
						type="text"
						style={{ ...Styles.DoubleInput, ...Styles.RightInput }}
						onChange={(e) => this.setState({ ImageURL: e.currentTarget.value })}
						helperText={this.state.ImageURLCheck}
					/>
				</div>
				<div style={Styles.HorizontalInputContainer}>
					<TextField
						id="standard-name"
						label="Unit"
						margin="normal"
						style={{ ...Styles.DoubleInput, ...Styles.LeftInput_3 }}
						onChange={(e) => this.setState({ Unit: e.currentTarget.value })}
						helperText={this.state.UnitCheck}
					/>
					<TextField
						id="standard-name"
						label="Address"
						margin="normal"
						style={{ ...Styles.DoubleInput, ...Styles.RightInput_7 }}
						onChange={(e) => this.setState({ Address: e.currentTarget.value })}
						helperText={this.state.AddressCheck}
					/>
				</div>
				<div style={Styles.HorizontalInputContainer}>
					<TextField
						id="standard-name"
						label="City"
						margin="normal"
						style={{ ...Styles.DoubleInput, ...Styles.LeftInput }}
						onChange={(e) => this.setState({ City: e.currentTarget.value })}
						helperText={this.state.CityCheck}
					/>
					<TextField
						id="standard-name"
						label="Province/State"
						margin="normal"
						style={{ ...Styles.DoubleInput, ...Styles.RightInput }}
						onChange={(e) => this.setState({ ProvinceState: e.currentTarget.value })}
						helperText={this.state.ProvinceStateCheck}
					/>
				</div>
				<div style={Styles.HorizontalInputContainer}>
					<TextField
						id="standard-name"
						label="Country"
						margin="normal"
						style={{ ...Styles.DoubleInput, ...Styles.LeftInput }}
						onChange={(e) => this.setState({ Country: e.currentTarget.value })}
						helperText={this.state.CountryCheck}
					/>
					<TextField
						id="standard-name"
						label="Zip"
						margin="normal"
						style={{ ...Styles.DoubleInput, ...Styles.RightInput }}
						onChange={(e) => this.setState({ Zip: e.currentTarget.value })}
						helperText={this.state.ZipCheck}
					/>
				</div>
				<TextField
					id="standard-name"
					label="Area"
					margin="normal"
					style={Styles.SingleInput}
					onChange={(e) => this.setState({ Area: e.currentTarget.value })}
					helperText={this.state.AreaCheck}
				/>
				<div style={Styles.HorizontalInputContainer}>
					<TextField
						id="standard-name"
						label="# of Bed"
						margin="normal"
						type="number"
						style={{ ...Styles.DoubleInput, ...Styles.LeftInput }}
						onChange={(e) => this.setState({ NumOfBed: e.currentTarget.value })}
						helperText={this.state.NumOfBedCheck}
					/>
					<TextField
						id="standard-name"
						label="# of Bath"
						margin="normal"
						type="number"
						style={{ ...Styles.DoubleInput, ...Styles.RightInput }}
						onChange={(e) => this.setState({ NumOfBath: e.currentTarget.value })}
						helperText={this.state.NumOfBathCheck}
					/>
				</div>
				<div style={Styles.HorizontalInputContainer}>
					<TextField
						id="standard-name"
						label="# of Parking"
						margin="normal"
						type="number"
						style={{ ...Styles.DoubleInput, ...Styles.LeftInput }}
						onChange={(e) => this.setState({ NumOfParking: e.currentTarget.value })}
						helperText={this.state.NumOfParkingCheck}
					/>
					<TextField
						id="standard-name"
						label="Parking Type"
						margin="normal"
						type="text"
						style={{ ...Styles.DoubleInput, ...Styles.RightInput }}
						onChange={(e) => this.setState({ ParkingType: e.currentTarget.value })}
						helperText={this.state.ParkingTypeCheck}
					/>
				</div>

				<Button onClick={this.OnAddHouseClick} style={Styles.SubmitButton} variant="contained" color="primary">
					Add House
				</Button>
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
	SubmitButton: {
		marginTop: "50px"
	} as CSSProperties
}