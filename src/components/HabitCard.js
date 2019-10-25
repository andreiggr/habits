import React, { Component, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  IconButton
} from "@material-ui/core";
import { Close, Check } from "@material-ui/icons";

import { Link } from "react-router-dom";
import moment from "moment";
import _ from "lodash";
import { connect } from "react-redux";

import nextDayId from "../utils/nextDayId";
import { week } from "../utils/constants";

import { habitAddDate, habitRemoveDate, habitSelect } from "../actions/habits";

const HabitCard = ({
  habit,
  habits,
  addDate,
  removeDate,
  habitSelect,
  selectedHabit
}) => {
  //const [weekCompletion, setWeekCompletion] = useState(0);

  const handleCheck = day => {
    const habitId = habit.id;
    const id = nextDayId(habits);
    const date = moment(day).unix();
    const newDay = { id, habitId, date };
    addDate(newDay);
  };

  const handleUnCheck = day => {
    const date = moment(day).unix();
    var habitDays = habit.days;
    var removedDay = habitDays.filter(
      day => Math.floor(day.date / 10000) === Math.floor(date / 10000)
    )[0];
    removeDate(removedDay);
  };

  const handleSelect = () => {
    habitSelect(habit);
  };

  const title = habit.title;
  const habitDays = habit.days.map(day =>
    moment.unix(day.date).format("ddd Do")
  );

  const daysChecked = week
    .map(day => habitDays.includes(day.format("ddd Do")))
    .filter(Boolean).length;
  const weekCompletion = (daysChecked * 100) / 5;

  return (
    <div>
      <Paper
        style={{
          marginTop: "10px",
          padding: "5px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          background: "#EFEFEF"
        }}
      >
        <CircularProgress
          variant="static"
          value={weekCompletion}
          size={25}
          style={{ margin: "3px", marginRight: "10px" }}
        />
        <div style={{ width: "125px" }}>
          <Link style={{ textDecoration: "none" }} to={`/habit/${title}`}>
            <Typography
              variant="h6"
              style={{ cursor: "pointer", color: "black" }}
              onClick={() => handleSelect()}
            >
              {title}
            </Typography>
          </Link>
        </div>
        {week.map((day, index) => (
          <div
            key={index}
            style={{
              marginLeft: "30px",
              marginRight: "47px",
              cursor: "pointer"
            }}
          >
            {habitDays.includes(day.format("ddd Do")) && (
              <Check onClick={() => handleUnCheck(day)} color="primary" />
            )}
            {!habitDays.includes(day.format("ddd Do")) && (
              <Close onClick={() => handleCheck(day)} color="disabled" />
            )}
          </div>
        ))}
      </Paper>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    habits: state.habits,
    selectedHabit: state.selectedHabit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addDate: date => dispatch(habitAddDate(date)),
    removeDate: date => dispatch(habitRemoveDate(date)),
    habitSelect: habit => dispatch(habitSelect(habit))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitCard);
