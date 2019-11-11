import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Typography } from "@material-ui/core";
import { Toolbar, IconButton } from "@material-ui/core";
import { Home, BrushOutlined } from "@material-ui/icons";

import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { habitSelect } from "../actions/habits";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Header = ({ history, selectedHabit, habitSelect }) => {
  const classes = useStyles();

  const handleHomeNav = () => {
    habitSelect({ days: [], id: "", title: "" });
    history.replace("/");
  };

  const title = selectedHabit.id !== "" ? selectedHabit.title : "Habit-Tracker";

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div
            style={{ textDecoration: "none", color: "white" }}
            onClick={() => handleHomeNav()}
          >
            <IconButton
              className={classes.menuButton}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <Home />
            </IconButton>
          </div>
          <Typography variant="h6" className={classes.title}>
            {title} ses
          </Typography>
          <div style={{ textDecoration: "none", color: "white" }}>
            <IconButton
              className={classes.menuButton}
              edge="start"
              color="inherit"
              aria-label="style"
            >
              <BrushOutlined />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const RoutedHeader = withRouter(Header);

const mapStateToProps = state => {
  return {
    selectedHabit: state.selectedHabit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    habitSelect: habit => dispatch(habitSelect(habit))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutedHeader);
