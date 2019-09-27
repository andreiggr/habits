import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Typography } from '@material-ui/core';
import { Toolbar, IconButton } from "@material-ui/core";
import { Home } from "@material-ui/icons";

import { withRouter } from 'react-router';

import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = props => {
    const classes = useStyles();
    return (
        <div className={classes.root} >
            <AppBar position="static">
                <Toolbar>
                    <Link style={{ textDecoration: "none", color: "white" }} to={`/`} >
                        <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
                            <Home />
                        </IconButton>
                    </Link>
                    <Typography variant="h6" className={classes.title}>
                        Habit-Tracker
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}


const RoutedHeader = withRouter(Header);

export default RoutedHeader;

