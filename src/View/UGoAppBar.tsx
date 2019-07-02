import React from 'react';
import stylesModule from "./styles/StylesModule";
import { withStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export default function UGoAppBar(){
    const styles = stylesModule("");
  const AppBarBkgn = withStyles({
    colorPrimary:{
      backgroundColor: '#6002ee',
    },
  })(AppBar);
    return (
        <AppBarBkgn position="absolute" 
            className={styles.appBar} >
          <Toolbar>
            <Typography variant="h6" noWrap>
              UGoCondo
            </Typography>
          </Toolbar>
        </AppBarBkgn>
    );
}