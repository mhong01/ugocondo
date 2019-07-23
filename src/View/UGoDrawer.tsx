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
import UGoRouter from '../Router';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import FavoritePage from './FavoritePage';

class UGoDrawer extends Component{
  static propTypes: {};
  constructor(props){
    super(props);
  }

  navigateHome(){
    return(<ListItem/>);
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

    const styles =  {
      toolbar:{
        minHeight: 64,
      } ,
      content: {
        flexGrow: 1,
        marginLeft: drawerWidth,
        padding: 3,
        width: 100,
      },
    }
    return(
      <ClippedDrawer  variant="permanent">
        <div style={styles.toolbar} />
        <BrowserRouter>
        <List>
            <ListItem component={Link}
                      {...{ to: '/' } as any} 
                      button >
              <ListItemIcon><Home/></ListItemIcon>
              <ListItemText primary="Homepage"/> 
            </ListItem>
            <ListItem component={Link}
                      {...{ to: '/favorite' } as any }
                      button>
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
        
      <main style={styles.content}>
        <div style={styles.toolbar} />
        <UGoRouter/>
        {/* <Switch>
            <Route path='/' component={ListItem}></Route>
            <Route path='/favorite' component={FavoritePage}></Route>
        </Switch> */}
      </main>
        </BrowserRouter>
      </ClippedDrawer>
    );
  }
}

export default UGoDrawer;