import React, { Component } from "react";
import Calendar from "react-calendar";
import { Button } from "@material-ui/core";
import moment from "moment";
import { connect } from "react-redux";

import "../style/styles.css";

import { removeHabit } from "../actions/habits";

const DetailedHabit = ({ selectedHabit, history, deleteHabit, onChange }) => {
  const handleRemoveHabit = () => {
    deleteHabit(selectedHabit);
    history.replace("/");
  };

  const days = selectedHabit.days.map(item =>
    moment.unix(item.date).format("L")
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <Calendar
        className="calendar"
        onChange={onChange}
        tileClassName={({ date, view }) =>
          view === "month" && days.includes(moment(date).format("L"))
            ? "completed"
            : null
        }
      />
      <Button
        style={{ marginTop: "10px" }}
        variant="outlined"
        color="secondary"
        onClick={() => handleRemoveHabit()}
      >
        {" "}
        Remove habit{" "}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    selectedHabit: state.selectedHabit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteHabit: habit => dispatch(removeHabit(habit))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailedHabit);
