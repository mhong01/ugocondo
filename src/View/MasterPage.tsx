import React from 'react';
import Button from '@material-ui/core/Button';
import './MasterPage.css';
import { CssBaseline, AppBar, Typography, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    padding: '0 8px',
  },
  title : {
    flexGrow: 1,
  },
  link : {
    color: '#FFFF',
    flexGrow: 1,
  }
}));

export default function MasterPage() {
  const styles = useStyles("");
  
  return (<div className={styles.container}>
    <CssBaseline />
    <AppBar position="absolute">
        <Typography component="h1" variant="h6" color="inherit" noWrap className= {styles.title}>
          UGoCondo
        </Typography>
        <Link
          component="button"
          variant="body2"
          className={styles.link}
          onClick={() => alert("say somehting")}>
          Register?
          </Link>
        <Link
          component="button"
          variant="body2"
          className={styles.link}
          onClick={() => alert("say somehting")}>
          Sign-in
          </Link>
    </AppBar>
  </div>
  );
}
