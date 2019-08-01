import React from "react";
import { PostModel } from "../Model/Post";
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';

class PostItem extends React.Component <any, any, any>{

    static propTypes: { 
        Post: PostModel;
    };
    //Passing a PostModel here and populate data
    private post:PostModel; 
    constructor(props){
        super(props);
        if (props.Post == undefined && props.Post == null){
            console.log("Props null");
            return;
        } 
        this.post = props.Post;
        console.log(this.post);
    }

    onViewClicked(){

    }

    render(){
        return (
            <Card>
                <CardActionArea>
                <CardMedia
                    // className={classes.media}
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
                <Button size="small" color="primary">
                    Like
                </Button>
                </CardActions>
            </Card>
        );
    };
}

export default PostItem;