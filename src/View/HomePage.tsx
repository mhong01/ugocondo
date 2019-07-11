import React from 'react';
import stylesModule from './styles/StylesModule';
import { CssBaseline } from '@material-ui/core';
import UGoDrawer from './UGoDrawer';
import UGoAppBar from './UGoAppBar';

function temp(){
  console.log("hhdh");
}
export default class HomePageModule extends React.Component{

  componentDidMount(){
    console.log("Component Did mount");
  }

  render(){
    return(<HomePage/>);
  }
}

export function HomePage(props){
  const styles = stylesModule("");
  return (
    <div className={styles.root}>
      <CssBaseline />
      <UGoAppBar isUserLoggedIn={false} />
      <UGoDrawer />
      <main className={styles.content}>
        <div className={styles.toolbar} />
        {/* TODO: Content Starts here */}
      </main>
    </div>
  );  
}