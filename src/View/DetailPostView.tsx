import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import PostControllerInstance from "../Controller/PostController";
import { PostModel } from "../Model/Post";

class DetailPostView extends React.Component<any, any, any> {

    private postKey: string;
    private post : PostModel;
    private posts: Array<any> = new Array() ;

    constructor(props){
        super(props);
        this.state = {
            post: PostModel,
        }
    }

    async componentWillMount(){
        const {params} = this.props.match;
        console.log("params " + params.id )
        let post = await this.getPostById(params.id);
        console.log(post);
        this.setState({
            post: post
        });
        this.post = this.state.post;
        console.log(this.post);
    }

    async getPostById(postKey: string){
        return await PostControllerInstance.ReadPost(postKey);
       
    }

    render(){
        
        var styles = {
            _root:{
                flexGrow: 1,
                margin: 10,
            },
            paper: {
                padding: 2,
                textAlign: 'center',
                color: 'black',
              },
        };
        return (
            <div style={styles._root}>
            <Card>
            <CardActionArea>
            <CardMedia
                // className={classes.media}
                // image="/static/images/cards/contemplative-reptile.jpg"
                title={this.post.PropertyName}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                {this.post.PropertyName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                This is the place holder for description
                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
            <Button 
                    size="small" color="primary">
                View
            </Button>
            <Button size="small" color="primary">
                Like
            </Button>
            </CardActions>
        </Card>
        </div>
        );
    }
}

export default DetailPostView;