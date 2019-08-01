import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import PostControllerInstance from "../Controller/PostController";
import { PostModel } from "../Model/Post";
import UserControllerInstance from "../Controller/UserController";
import {Redirect} from "react-router-dom";

class DetailPostView extends React.Component<any, any, any> {

    private postKey: string;
    private post : PostModel = null;
    private posts: Array<any> = new Array() ;

    constructor(props){
        super(props);
        this.state = {
            post: PostModel,
            currentUserId: null,
            postOwnerId: null,
            redirectToReferrer: !UserControllerInstance._IsSignedIn,
			to: "/login"
        }
        this.enableBookingBtn = this.enableBookingBtn.bind(this);
    }

    async componentWillMount(){
        const {params} = this.props.match;
        console.log("params " + params.id )
        let post = await this.getPostById(params.id);
        console.log(post);
        
        this.setState({
            post: post
        });
        if (!this.state.redirectToReferrer){
            this.setState({
                currentUserId: UserControllerInstance.UserID
            });
        }
        
        this.setState({
            postOwnerId: post.OwnerID
        });
        this.post = this.state.post;
        console.log(this.post);
    }

    async getPostById(postKey: string){
        return await PostControllerInstance.ReadPost(postKey);
       
    }

    onBookingClicked(){
        console.log("clicked");
    }

    enableBookingBtn(){
        console.log(this.state.postOwnerId)
        console.log(this.state.currentUserId)
        // if (this.state.postOwnerId != undefined 
        //     && this.state.currentUserId != undefined){
        if( this.state.postOwnerId != this.state.currentUserId){
            return ( <Button color="primary" onClick={(e)=>this.onBookingClicked()}>
                    Book
                    </Button>);
        } else {
            return null;
        }
        // } 
    }

    render(){
        if (this.state.redirectToReferrer) {
			return <Redirect to={this.state.to} />;
		}
        
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
            media: {
            height: 140,
            },
        };
        if(this.state.post == null) return null;

        return (
            <div style={styles._root}>
            <Card>
            <CardActionArea>
            <CardMedia
                style={styles.media}
                image={this.state.post.ImageURL}
                title={this.state.post.PropertyName}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                {this.state.post.PropertyName}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                    {this.state.post.Price}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {this.state.post.Description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                Here are the facilities
                <br/>
                Bedrooms: {this.state.post.NumOfBed}
                <br/>
                Bathroom: {this.state.post.NumOfBath}
                <br/>
                Parking slots: {this.state.post.NumOfParking}
                <br/>
                Parking Type: {this.state.post.ParkingType}
                <br/>
                Unit: {this.state.post.Unit}
                <br/>
                Address: {this.state.post.Address} {this.state.post.City} {this.state.post.ProvinceState}
                <br/>
                Postal Code: {this.state.post.Zip}

                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
            {
                this.enableBookingBtn()
            }
            </CardActions>
        </Card>
        </div>
        );
    }
}

export default DetailPostView;