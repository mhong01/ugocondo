import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import PostControllerInstance from "../Controller/PostController";
import { PostModel } from "../Model/Post";

export default class ListItem extends React.Component{

    private latestPosts : Array<any>;

    constructor(props){
        super(props);
    }

    componentDidMount(){
        // if (this.latestPosts == null || this.latestPosts == undefined){
        //     //TODO: pop up msg for error
        //     return;  
        // } else {

        // }

        let _latestPosts = PostControllerInstance.GetLatestPosts();
        for (let post in _latestPosts){
            this.latestPosts.push(post);
            console.log(post);
        }
    }

    async getAllLatestPost(){
        return await PostControllerInstance.GetLatestPosts();
    }

    render(){
        var styles = {
            _root:{
                flexGrow: 1,
            },
            paper: {
                padding: 2,
                textAlign: 'center',
                color: 'black',
              },
        };
        return(
            <div style={styles._root}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <div>dddd</div>
                    </Grid>
                    <Grid item xs={4}>
                    <div>dddd</div>
                    </Grid>
                    <Grid item xs={4}>
                    <div>dddd</div>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </div>
        );
    }

}
