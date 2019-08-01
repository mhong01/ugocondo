import React, {useContext} from 'react';
import {primaryColor} from "./styles/StylesModule";
import { withStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import PropTypes from 'prop-types';
import UGoContext, { UGoConsumer } from '../Model/Context';
import UserControllerInstance, { UserController } from '../Controller/UserController';

export default class UGoAppBar extends React.Component<any, any>{

    static ugoContext = UGoContext;
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
            <AppBarBkgn position="absolute">
                <Toolbar>
                <Typography variant="h4" noWrap>
                    UGoCondo
                </Typography>
                    {/* {console.log(this.state.isUserLoggedIn)}
                    {this.state.isUserLoggedIn ? <TypographyUserName paragraph >
                                Hello,
                            </TypographyUserName>
                    :
                         null
                    } */}
                </Toolbar>
            </AppBarBkgn>
        );
    }
}

// UGoAppBar.propTypes = {
//     isUserLoggedIn: PropTypes.bool,
// }
