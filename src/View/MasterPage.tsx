import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import stylesModule from './styles/StylesModule';
import { CssBaseline, AppBar, Typography, Link, makeStyles, IconButton, MenuItem, useTheme } from '@material-ui/core';

export default function MasterPage() {
  const styles = stylesModule("");
  
  return (<div>
    <CssBaseline />
    <AppBar className={clsx(styles.appBar, {
          [styles.appBarShift]: true,
        })} position="absolute">
        <div className={styles.titlePane}>
            <Typography component="h1" variant="h6" color="inherit" noWrap>
               UGoCondo
            </Typography>   
        </div>
        
        <div className={styles.btnPane}>
          <Link
            component="button"
            variant="body2"
            className={styles.btnLink}
            onClick={() => alert("say somehting")}>
            Register?
            </Link>
          <Link
            component="button"
            variant="body2"
            className={styles.btnLink}
            onClick={() => alert("say somehting")}>
            Sign-in
            </Link>
        </div>
        
    </AppBar>
  </div>
  );
}
