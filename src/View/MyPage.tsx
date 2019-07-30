import React, { Component } from "react";
import { GridList, CardContent, Typography } from "@material-ui/core";
import PostControllerInstance from "../Controller/PostController";
import { Card } from "semantic-ui-react";

class MyPage extends Component<any, any, any> {

	constructor(props) {
		super(props);

		this.state = {
			tileData: []
		}
	}

	async componentWillMount() {
		let homes = await PostControllerInstance.GetPostsByUserID("testuser");
		console.log(homes);
		this.setState({ tileDate: homes });
	}

	render() {
		return (
			<div>
				<GridList cellHeight={200} spacing={1}>
					{this.state.tileData.map(tile => (
						<Card>
							<CardContent>
								<Typography color="textSecondary" gutterBottom>
									{tile.PropertyName}
								</Typography>
								<Typography variant="h5" component="h2">

								</Typography>
								<Typography color="textSecondary">
									adjective
								</Typography>
								<Typography variant="body2" component="p">
									well meaning and kindly.
									<br />
									{'"a benevolent smile"'}
								</Typography>
							</CardContent>
						</Card>
					))}
				</GridList>
			</div>);
	}


}

export default MyPage;