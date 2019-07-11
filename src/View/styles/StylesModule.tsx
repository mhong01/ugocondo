import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const primaryColor:string = '#6002ee';
export const textColor: string = '#FFFF';

export const drawerWidth = 240;

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