import React from 'react';
import {Component} from 'react';
import { withStyles } from "@material-ui/styles";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import {drawerWidth} from "./styles/StylesModule";
import Home from '@material-ui/icons/Home';
import Favorite from '@material-ui/icons/Favorite';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HowToReg from '@material-ui/icons/HowToReg';
import ExitToApp from '@material-ui/icons/ExitToApp';

class UGoDrawer extends Component{
  static propTypes: {};
  constructor(props){
    super(props);
  }

  navigateHome(){

  }

  navigateFavourite(){

  }

  render(){
    const ClippedDrawer = withStyles({
      root:{
        top: 0,
        flex: '1 0 auto',
        height: '100%',
        display: 'flex',
        outline: 'none',
        position: 'fixed',
        overflowY: 'auto',
        flexDirection: 'column',
      },
      paper: {
        width: drawerWidth,
      },
    })(Drawer);

    const styles_ =  {
      toolbar:{
        minHeight: 64,
      } 
    }
    return(
      <ClippedDrawer  variant="permanent">
        <div style={styles_.toolbar} />
        <List>
      <ListItem button onClick={() => this.navigateHome()}>
              <ListItemIcon><Home/></ListItemIcon>
              <ListItemText primary="Homepage"/> 
            </ListItem>
            <ListItem button onClick={() => this.navigateFavourite()}>
              <ListItemIcon><Favorite/></ListItemIcon>
              <ListItemText primary="Favorite List" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button>
                <ListItemIcon><AccountCircle/></ListItemIcon>
              <ListItemText primary="Log-in" />
            </ListItem>
            <ListItem button>
                <ListItemIcon><HowToReg/></ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
            <ListItem button>
                <ListItemIcon><ExitToApp/></ListItemIcon>
              <ListItemText primary="Log-out" />
            </ListItem>
        </List>
      </ClippedDrawer>
    );
  }
}


UGoDrawer.propTypes = {
  
}

export default UGoDrawer;