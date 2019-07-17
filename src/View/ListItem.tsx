import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import { spacing } from "@material-ui/system";

export default class ListItem extends React.Component<any,any>{

    constructor(props){
        super(props);
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
