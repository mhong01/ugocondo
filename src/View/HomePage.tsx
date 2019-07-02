import React from 'react';
import stylesModule from './styles/StylesModule';
import { CssBaseline, Typography } from '@material-ui/core';
import UGoDrawer from './UGoDrawer';
import UGoAppBar from './UGoAppBar';

export default function HomePage() {
  const styles = stylesModule("");
  return (
      <div className={styles.root}>
        <CssBaseline />
        <UGoAppBar/>
        <UGoDrawer/>
        <main className={styles.content}>
          <div className={styles.toolbar} />
          {/* TODO: Content Starts here */}
        </main>
      </div>
  );
}
