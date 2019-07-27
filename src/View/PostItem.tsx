import React from "react";
import { PostModel } from "../Model/Post";

class PostItem extends React.Component <any, any>{

    static propTypes: { 
        Post: PostModel;
        key: string;
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

    render(){
        return (
            <div>
                
            </div>
        );
    };
}

export default PostItem;