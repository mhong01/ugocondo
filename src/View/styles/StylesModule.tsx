import { makeStyles, useTheme, Theme, createStyles } from "@material-ui/core/styles";

let primaryColor:string = '#6002ee';
let textColor: string = '#FFFF';

const drawerWidth = 240;

const stylesModule = makeStyles((theme: Theme) =>
createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: primaryColor,
  },
  headerColor: {
    backgroundColor: primaryColor,
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    marginLeft: drawerWidth,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}),
  );

  //https://material-ui.com/components/drawers/#ClippedDrawer.tsx
  export default stylesModule;