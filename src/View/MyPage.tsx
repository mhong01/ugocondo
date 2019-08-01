import React, { CSSProperties } from "react";
import { GridList, CardContent, Typography, Grid } from "@material-ui/core";
import PostControllerInstance from "../Controller/PostController";
import PostItem from "./PostItem";
import UserControllerInstance, { UserController } from "../Controller/UserController";
import {
	Redirect
} from "react-router-dom";
import { thisExpression } from "@babel/types";

export default class MyPage extends React.Component<any, any, any> {

	private myPosts: Array<any>;
	constructor(props) {
		super(props);
		this.myPosts = new Array();
		this.state = {
			myPosts: Array,
			userEmail: null,
			redirectToReferrer: !UserControllerInstance._IsSignedIn,
			to: "/login"
		}
		// console.log(UserControllerInstance.UserEmail);
	}

	async componentWillMount() {
		if (UserControllerInstance._User != undefined){
			this.myPosts = new Array();
			let _userId = UserControllerInstance._User.id;
			let myPosts: Array<any> = await PostControllerInstance.GetPostsByUserID(_userId);
			this.setState({
				myPosts: myPosts,
			})
			console.log(this.state.myPosts);
			this.myPosts = this.state.myPosts;
		}
	}
	render() {
		if (this.state.redirectToReferrer) return <Redirect to={this.state.to} />;

		var styles = {
			_root: {
				flexGrow: 1,
				margin: 50,
				overflowY: "clip",
				height: "100%",
				width: "100%",
			} as CSSProperties,
			paper: {
				padding: 2,
				textAlign: 'center',
				color: 'black',
			},
			listWidth:{
				width: '99%'
			}
		};
		return (
			<div style={styles._root}>
				<div style={{overflowY: "hidden"}}>
					<Grid style={styles.listWidth} container spacing={2}>
						{this.myPosts.map(tile => (
							<Grid item xs={6}><PostItem Post={tile} /></Grid>
						))}
					</Grid>
				</div>
			</div>
		);
	}
}
