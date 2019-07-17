import React from 'react';
import {primaryColor} from "./styles/StylesModule";
import { withStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import PropTypes from 'prop-types';

export default class UGoAppBar extends React.Component<any, any>{
    static propTypes: { 
        isUserLoggedIn: PropTypes.Requireable<boolean>; 
    
    };

    constructor(props){
        super(props);
        this.state = {
            isUserLoggedIn: false,
            userName: '',
        };
    }

    componentWillMount(){
        this.setState({
            isUserLoggedIn: this.props,
        });
        console.log(this.state);
    }

    componentDidMount(){
        console.log(this.props);
        
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
                {
                    this.state.isUserLoggedIn ?
                    <TypographyUserName paragraph >
                        Hello,
                    </TypographyUserName> : null
                }
                </Toolbar>
            </AppBarBkgn>
        );
    }
}

// UGoAppBar.propTypes = {
//     isUserLoggedIn: PropTypes.bool,
// }
