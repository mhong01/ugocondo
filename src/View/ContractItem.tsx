import React from "react";
import { PostModel } from "../Model/Post";
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';
import { ContactStatusEnum } from "../Model/Contract";
import ContractAndPost from "../Model/ContractAndPost";
import ContractControllerInstance from "../Controller/ContractController";

class ContractItem extends React.Component <any, any, any>{

    static propTypes: { 
        Post: ContractAndPost;
    };
    //Passing a PostModel here and populate data
    private post:ContractAndPost; 
    constructor(props){
        super(props);
        if (props.Post == undefined && props.Post == null){
            console.log("Props null");
            return;
        } 
        this.post = props.Post;
        console.log(this.post);
        this.setButtons = this.setButtons.bind(this);
    }


    setButtons(){
        if (this.post != null){
            if (this.post.Status == ContactStatusEnum.Pending){
                return (
                    <div>
                    <Button size="small" color="primary" onClick={()=> this.onApproveSelected()}>
                        Approve
                    </Button>
                    <Button size="small" color="primary">
                    Discard
                    </Button></div>
                );
            } else if (this.post.Status == ContactStatusEnum.Rented){
                return (<Button size="small" color="primary">
                        Cancel
                        </Button>);
            } else {
                return (<Button size="small" color="primary">
                        Delete
                        </Button>);
            }
        }
    }

    async onApproveSelected(){
        console.log("Approve");
        let contract = this.post.Contract;
        contract.OnwerID = this.post.Contract.OnwerID;
        contract.RenterID = this.post.Contract.RenterID;
        contract.PostID = this.post.Contract.PostID;
        contract.Status = ContactStatusEnum.Rented;

        return await ContractControllerInstance.UpdateContract(contract);
    }

    render(){
        var styles = {
            media: {
                height: 250,
            },
            cardActionAre: {
                width: 500
            }
        };
        return (
            <Card style={styles.cardActionAre}>
                <CardActionArea>
                <CardMedia
                    style={styles.media}
                    image={this.post.Post.ImageURL}
                    title={this.post.Post.PropertyName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    {this.post.Post.PropertyName}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                    {this.post.Post.Price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {this.post.Post.Description}
                    </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
                    {this.setButtons()}
                </CardActions>
            </Card>
        );
    };
}

export default ContractItem;