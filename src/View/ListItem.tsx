import React, { CSSProperties } from "react";
import { Grid, Paper, Card, CardContent, Typography } from "@material-ui/core";
import PostControllerInstance from "../Controller/PostController";
import { PostModel } from "../Model/Post";
import {
	Redirect
} from "react-router-dom";
import UserControllerInstance from "../Controller/UserController";
import PostItem from "./PostItem";

export default class ListItem extends React.Component<any, any, any>{

	private latestPosts: Array<any>;

	constructor(props) {
		super(props);
		this.latestPosts = new Array();
		this.state = {
			latestPost: Array,
			redirectToReferrer: !UserControllerInstance._IsSignedIn,
			to: "/login"
		}

	}

	async componentWillMount() {
		let latestPosts = await this.getAllLatestPost();
		this.setState({
			latestPost: latestPosts,
		})
		console.log(this.state.latestPost);
		this.latestPosts = this.state.latestPost;
	}

	initFakeHome() {
		var post: PostModel = new PostModel();
		this.latestPosts = new Array();
		post.OwnerID = "1";
		post.PropertyName = "Fake Home";
		post.Unit = "1";
		post.Address = "New Westminster, BC";
		post.City = "NW, BC";
		post.ProvinceState = "BC";
		post.Country = "Canada";
		post.Zip = "1X1X1X";
		post.Area = 1;
		post.NumOfBed = 1;
		post.NumOfBath = 1;
		post.NumOfParking = 1;
		post.ParkingType = "Single";
		for (let i = 0; i < 5; i++) {
			this.latestPosts.push(post);
		}
	}

	async getAllLatestPost() {
		return await PostControllerInstance.GetLatestPosts();
	}

	render() {
		if (this.state.redirectToReferrer) return <Redirect to={this.state.to} />;

		var styles = {
			_root: {
				flexGrow: 1,
				margin: 10,
				marginTop: 64,
			} as CSSProperties,
			paper: {
				padding: 2,
				textAlign: 'center',
				color: 'black',
			},
		};
		return (
			<div style={styles._root}>
				<div>
					<Grid container spacing={2}>
						{this.latestPosts.map(tile => (
							<Grid item xs={6}><PostItem Post={tile} /></Grid>
						))}
					</Grid>
				</div>
			</div>
		);
	}

}
