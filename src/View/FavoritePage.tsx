import React, { Component } from "react";
import { PostModel } from "../Model/Post";
import UserControllerInstance from "../Controller/UserController";
import {Redirect} from "react-router-dom";

class RequestPage extends Component<any, any, any>{

    constructor(props){
        super(props);
        this.state = {
            post: PostModel,
            currentUserId: null,
            postOwnerId: null,
            redirectToReferrer: !UserControllerInstance._IsSignedIn,
			to: "/login"
        }
    }

    render(){
        if (this.state.redirectToReferrer) {
			return <Redirect to={this.state.to} />;
		}
        return(
        <div>
            
        </div>
        );
    }


}


export default RequestPage;