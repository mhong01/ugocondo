import React from "react";
import { PostModel } from "../Model/Post";
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';
import UserControllerInstance from "../Controller/UserController";
import {
	Redirect
} from "react-router-dom";
import PostControllerInstance from "../Controller/PostController";

class PostItem extends React.Component<any, any, any>{

	static propTypes: {
		Post: PostModel;
	};
	//Passing a PostModel here and populate data
	private post: PostModel;
	constructor(props) {
		super(props);

		this.state = {
			redirectToReferrer: false,
			to: "/edithome"
		}

		if (props.Post == undefined && props.Post == null) {
			console.log("Props null");
			return;
		}
		this.post = props.Post;
		console.log(this.post);
		this.GotoEdit = this.GotoEdit.bind(this);
	}

	GotoEdit() {
		PostControllerInstance._CurrentPostID = this.post.id;
		this.setState({redirectToReferrer: true});
		this.setState({to: "/edithome"});
	}

	render() {
		var styles = {
            media: {
                height: 300,
            },
            cardActionAre: {
                width: 500
            }
        };

		if (this.state.redirectToReferrer) return <Redirect to={this.state.to} />;

		let editButton = null;
		if (this.post.OwnerID == UserControllerInstance._User.id) {
			editButton = (
				<Button onClick={this.GotoEdit} size="small" color="primary">
					edit
				</Button>
			)
		}

		return (
            <Card style={styles.cardActionAre}>
                <CardActionArea>
                <CardMedia
                    style={styles.media}
                    image={this.post.ImageURL}
                    title={this.post.PropertyName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    {this.post.PropertyName}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                    {this.post.Price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {this.post.Description}
                    </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
                <Button component={RouterLink}
                        {...{ to: '/view/' + this.post.id } as any}
                        size="small" color="primary">
                    View
                </Button>
				{editButton}
				</CardActions>
			</Card>
		);
	};
}

export default PostItem;