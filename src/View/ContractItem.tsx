import React from "react";
import { PostModel } from "../Model/Post";
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { ContactStatusEnum } from "../Model/Contract";
import ContractAndPost from "../Model/ContractAndPost";
import ContractControllerInstance from "../Controller/ContractController";
import UserControllerInstance from "../Controller/UserController";


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

        this.state = {
            to: null,
			redirectToReferrer: !UserControllerInstance._IsSignedIn,
        }
        this.post = props.Post;
        console.log(this.post);
        this.setButtons = this.setButtons.bind(this);
        this.onApproveSelected = this.onApproveSelected.bind(this);
        this.onCancelSelected = this.onCancelSelected.bind(this);
        this.onDiscardSelected = this.onDiscardSelected.bind(this);
        this.onDeleteCancelSelected = this.onDeleteCancelSelected.bind(this);
        this.onDeleteSelected = this.onDeleteSelected.bind(this);
    }


    setButtons(){
        if (this.post != null){
            if (this.post.Status == ContactStatusEnum.Pending){
                return (
                    <div>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {"Somebody wants to rent this place!"}
                    </Typography>
                    <Button size="small" color="primary" onClick={()=> this.onApproveSelected()}>
                        Approve
                    </Button>
                    <Button size="small" color="primary" onClick={()=> this.onDiscardSelected()}>
                        Discard
                    </Button>
                    <Button size="medium" color="secondary" onClick={()=> this.onDeleteSelected()}>
                        Delete Request
                    </Button> </div>
                );
            } else if (this.post.Status == ContactStatusEnum.Rented){
                return (<div>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {"This request is already approved! Click to cancel Approval"}
                        </Typography>
                        <Button size="small" color="primary" onClick={()=> this.onDiscardSelected()}>
                            Cancel Approval
                        </Button> </div>);
            } else {
                return (<div>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {"This request is already discarded! Click Cancel to reopen!"}
                     </Typography>
                    <Button size="small" color="primary" onClick={()=> this.onDeleteCancelSelected()}>
                        Cancel
                    </Button>
                    <Button size="medium" color="secondary" onClick={()=> this.onDeleteSelected()}>
                        Delete Request
                    </Button>  </div>);
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

        let obj = await ContractControllerInstance.UpdateContract(contract);
        if (obj != null){
            this.setState({ to: "/request" });
			this.setState({ redirectToReferrer: true })
        }
        this.post.Status = contract.Status;
        this.forceUpdate();
    }

    async onDiscardSelected(){
        console.log("Discard");
        let contract = this.post.Contract;
        contract.OnwerID = this.post.Contract.OnwerID;
        contract.RenterID = this.post.Contract.RenterID;
        contract.PostID = this.post.Contract.PostID;
        contract.Status = ContactStatusEnum.Declined;

        let obj = await ContractControllerInstance.UpdateContract(contract);
        if (obj != null){
            this.setState({ to: "/request" });
			this.setState({ redirectToReferrer: true })
        }
        this.post.Status = contract.Status;
        this.forceUpdate();
    }
    

    async onCancelSelected(){
        console.log("Discard");
        let contract = this.post.Contract;
        contract.OnwerID = this.post.Contract.OnwerID;
        contract.RenterID = this.post.Contract.RenterID;
        contract.PostID = this.post.Contract.PostID;
        contract.Status = ContactStatusEnum.Declined;

        let obj = await ContractControllerInstance.UpdateContract(contract);
        if (obj != null){
            this.setState({ to: "/request" });
			this.setState({ redirectToReferrer: true })
        }
        this.post.Status = contract.Status;
        this.forceUpdate();
    }

    async onDeleteCancelSelected(){
        console.log("Discard");
        let contract = this.post.Contract;
        contract.OnwerID = this.post.Contract.OnwerID;
        contract.RenterID = this.post.Contract.RenterID;
        contract.PostID = this.post.Contract.PostID;
        contract.Status = ContactStatusEnum.Pending;

        let obj = await ContractControllerInstance.UpdateContract(contract);
        if (obj != null){
            this.setState({ to: "/request" });
			this.setState({ redirectToReferrer: true })
        }
        this.post.Status = contract.Status;
        this.forceUpdate();
    }
    
    async onDeleteSelected(){
        console.log("Delete")
        let contract = this.post.Contract;
        let obj = await ContractControllerInstance.DeleteContract(contract.id);
        if (obj != null){
            this.setState({ to: "/request" });
			this.setState({ redirectToReferrer: true })
        }
        this.forceUpdate();
    }

    render(){
        if (this.state.redirectToReferrer) {
			return <Redirect to={this.state.to} />;
		}
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