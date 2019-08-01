import React, {useContext} from 'react';
import {primaryColor} from "./styles/StylesModule";
import { withStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import PropTypes from 'prop-types';
import UserControllerInstance, { UserController } from '../Controller/UserController';

export default class UGoAppBar extends React.Component<any, any>{

    static propTypes: { 
        isUserLoggedIn: PropTypes.Requireable<boolean>; 
    
    };

    constructor(props){
        super(props);
        this.state = {
            isUserLoggedIn: false,
            userName: false,
        };
        console.log(this.state);
        console.log(UserControllerInstance._IsSignedIn,);
    }

    componentWillMount(){
        
        console.log("will mount");
        console.log(this.state);
    }

    componentDidMount(){
        console.log("did mount " );
        console.log(this.state);
        this.setState({
            isUserLoggedIn: UserControllerInstance._IsSignedIn,
        });
    }


    render(){

        const AppBarBkgn = withStyles({
            colorPrimary:{
                backgroundColor: primaryColor,
            },
        })(AppBar);
        const TypographyUserName = withStyles({
            root: {
                marginLeft: 'auto',
                marginBottom: 0,
            }
        }) (Typography);

        return(
            <AppBarBkgn position="static">
                <Toolbar>
                <Typography variant="h4" noWrap>
                    UGoCondo
                </Typography>
                </Toolbar>
            </AppBarBkgn>
        );
    }
}

// UGoAppBar.propTypes = {
//     isUserLoggedIn: PropTypes.bool,
// }
