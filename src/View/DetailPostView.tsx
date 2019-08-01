import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import PostControllerInstance from "../Controller/PostController";
import { PostModel } from "../Model/Post";
import UserControllerInstance from "../Controller/UserController";
import {Redirect} from "react-router-dom";
import { ContractModel, ContactStatusEnum } from "../Model/Contract";
import ContractControllerInstance, { ContractControllerClass } from "../Controller/ContractController";

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
            avaiContract: null,
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
            this.setState({
                postOwnerId: post.OwnerID
            });
        }
        
        this.post = this.state.post;
        console.log(this.post);
    }

    async getPostById(postKey: string){
        return await PostControllerInstance.ReadPost(postKey);
       
    }


    async onCancelClicked(){
        console.log("Delete")
        if (this.state.avaiContract == null && this.state.avaiContract == undefined){
            return;
        }
        let contract = this.state.avaiContract;
        let obj = await ContractControllerInstance.DeleteContract(contract.id);
        // if (obj != null){
            this.setState({ to: "/" });
			this.setState({ redirectToReferrer: true })
        // }
        this.forceUpdate();
    }

    async onBookingClicked(){
        console.log("clicked");
        let contract = new ContractModel();
        contract.OnwerID = this.state.postOwnerId;
        contract.RenterID = this.state.currentUserId;
        contract.PostID = this.post.id;
        contract.Status = ContactStatusEnum.Pending;

        let contractUpdated = await ContractControllerInstance.CreateContract(contract);
        console.log(contractUpdated);


    }

    async enableBookingBtn(){
        console.log(this.state.postOwnerId)
        console.log(this.state.currentUserId)
        console.log(UserControllerInstance.UserID)
        // let rentedItems = await ContractControllerInstance.GetContractByRenterID(UserControllerInstance.UserID);
        // if (rentedItems != null){

        //     for (let i : 0; i < rentedItems.length; i++){
        //         if (this.post.id == rentedItems[i].RenterID){
        //             this.setState({
        //                 avaiContract: rentedItems[i],
        //             });
        //             return (<div>
        //                 <Typography variant="body1" color="textSecondary" component="p">
        //                 {"You have already booked this place!"}
        //             </Typography>
        //                 <Button color="primary" onClick={(e)=>this.onBookingClicked()}>
        //             Cancel
        //             </Button></div>);
        //         }
        //     }
        // }

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
            height: 250,
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