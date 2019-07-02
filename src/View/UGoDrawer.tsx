import React from 'react';
import { withStyles } from "@material-ui/styles";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Icon } from "@material-ui/core";
import stylesModule from "./styles/StylesModule";
import Home from '@material-ui/icons/Home';
import Favorite from '@material-ui/icons/Favorite';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HowToReg from '@material-ui/icons/HowToReg';
import ExitToApp from '@material-ui/icons/ExitToApp';

export default function UGoDrawer(){
    const styles = stylesModule("");
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
          width: 240,
        },
      })(Drawer);
return (
      <ClippedDrawer
        className={styles.drawer}
        variant="permanent" >
        <div className={styles.toolbar} />
        <List>
            <ListItem button >
              <ListItemIcon><Home/></ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItem>
            <ListItem button >
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