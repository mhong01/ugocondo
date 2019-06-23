import { makeStyles, useTheme } from "@material-ui/core/styles";

let primaryColor:string = '#6002ee';
let textColor: string = '#FFFF';

const drawerWidth = 240;

const stylesModule = makeStyles(theme => ({

    textColor: {
        color: textColor,
    },

    appBarDirection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: primaryColor,
      height: 50,
    }, 

    appBar:{
      transition: useTheme().transitions.create(['margin', 'width'], {
        easing: useTheme().transitions.easing.sharp,
        duration: useTheme().transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: useTheme().transitions.create(['margin', 'width'], {
          easing: useTheme().transitions.easing.easeOut,
          duration: useTheme().transitions.duration.enteringScreen,
        }),
      },
    titlePane : {
      padding: 10,
    },

    btnLink : {
      paddingRight: 10,
      color: textColor,
    },
    btnPane : {
      display:'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingRight: 10,
    },
    drawer:{
        color: textColor,
        paddingRight: 10,
    }
  }));

  export default stylesModule;