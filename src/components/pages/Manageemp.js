import React from 'react';


import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';

import PageHeader from '../manage employees/PageHeader';

import Employees from "../pages/Employees";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})

function Manageemp() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      
      <div className={classes.appMain}>
        <Employees />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default Manageemp;
