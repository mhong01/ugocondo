import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import PostControllerInstance from "../Controller/PostController";
import { PostModel } from "../Model/Post";
import PostItem from "./PostItem";

export default class ListItem extends React.Component{

    private latestPosts : Array<PostModel>;
    private post: PostModel;

    constructor(props){
        super(props);
        // this.latestPosts = new Array(5);
        this.initFakeHome();
    }

    async componentDidMount(){
    }

    componentWillMount(){
    }

    async getAllLatestPost(){
        return await PostControllerInstance.GetLatestPosts();
    }

    initFakeHome(){
        var post: PostModel = new PostModel();
        this.latestPosts = new Array();
        post.OwnerID = "1";
        post.PropertyName = "Fake Home";
        post.Unit = "1";
        post.Address = "New Westminster, BC";
        post.City = "NW, BC";
        post.ProvinceState = "BC";
        post.Country = "Canada";
        post.Zip = "1X1X1X";
        post.Area = 1;
        post.NumOfBed = 1;
        post.NumOfBath = 1;
        post.NumOfParking = 1;
        post.ParkingType = "Single";
        for (let i = 0 ; i < 5 ; i++){
            this.latestPosts.push(post);
        }
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
                        <PostItem Post={this.latestPosts[0]} 
                            key={this.latestPosts[0].id}/>
                    </Grid>
                    <Grid item xs={4}>
                    <div>dddd</div>
                    </Grid>
                </Grid>
            </div>
        );
    }

}
