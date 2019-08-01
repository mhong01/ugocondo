import React, { Component, CSSProperties } from "react";
import { PostModel } from "../Model/Post";
import UserControllerInstance from "../Controller/UserController";
import {Redirect} from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import PostItem from "./PostItem";
import ContractControllerInstance from "../Controller/ContractController";
import PostControllerInstance from "../Controller/PostController";
import ContractItem from "./ContractItem";
import ContractAndPost from "../Model/ContractAndPost";

class RequestPage extends Component<any, any, any>{

    private currentUserId: string = null;
    
    private contracts : Array<any>;
    private allPosts : Array<any>;
    constructor(props){
        super(props);

        this.contracts = new Array();
        this.allPosts = new Array();
        this.state = {
            post: PostModel,
            currentUserId: null,
            postOwnerId: null,
            contracts: null,
            allPosts: null,
            redirectToReferrer: !UserControllerInstance._IsSignedIn,
			to: "/login"
        }
    }

    async componentWillMount(){
        if (UserControllerInstance._IsSignedIn){
            this.currentUserId = UserControllerInstance.UserID;
            console.log(this.currentUserId);
            this.setState({
                currentUserId: this.currentUserId,
            })
        }
        let contracts = await ContractControllerInstance.GetContractByUserID(this.currentUserId);
        this.contracts = contracts;
        this.getAllPostOnContracts();
    }

    async getAllPostOnContracts(){
        if (this.contracts == undefined || this.contracts == null){
            return;
        } 
        for (let i = 0; i < this.contracts.length; i++){
            console.log(this.contracts[i]);
            let post = await PostControllerInstance.ReadPost(this.contracts[i].PostID);
            let contractAndPost: ContractAndPost = new ContractAndPost();
            contractAndPost.Contract = this.contracts[i];
            contractAndPost.Post = post;
            contractAndPost.Status = this.contracts[i].Status;
            this.allPosts.push(contractAndPost);
        }
    }

    render() {
		if (this.state.redirectToReferrer) return <Redirect to={this.state.to} />;

		var styles = {
			_root: {
				flexGrow: 1,
				margin: 1,
				overflowY: "clip"
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
				<div>
                    {this.allPosts[0] != undefined ? 
                        <Grid style={styles.listWidth} container spacing={2}>
						{this.allPosts.map(tile => (
							<Grid item xs={6}><ContractItem Post={tile} /></Grid>
						))}
                        </Grid>: 
                        <Typography gutterBottom variant="h5" component="h2">
                        {"There is no incoming request at this point"}
                        </Typography>
                    }
				</div>
			</div>
		);
	}


}


export default RequestPage;