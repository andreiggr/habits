import React, { Component, useState } from 'react';
import HabitCard from './HabitCard';
import { Typography, Button, Input } from '@material-ui/core';
import Notification from './Notification';
import _ from "lodash";
import { connect } from 'react-redux';

import { week } from "../utils/constants";

import { addHabit } from '../actions/habits';

const Main = ({ addHabit, habits }) => {

    const [newHabit, setNewHabit] = useState("");
    const [openNotify, setOpenNotify] = useState(false);
    const [notifyText, setNotifyText] = useState("");

    const handleAddHabit = () => {
        const title = newHabit;

        //assign next biggest id
        const id = habits.length > 0 ? Math.max(...habits.map(habit => parseInt(habit.id))) + 1 : 1;
        const days = [];
        const habit = { days, id, title };

        if (title === "") {
            setOpenNotify(true);
            setNotifyText("Title is empty!")
        } else {
            addHabit(habit);
            setNewHabit("");
            setOpenNotify(true);
            setNotifyText("Habit added!");
        }
    }

    return (

        <div>
            <div style={{ marginTop: "10px", display: "flex", flexDirection: "row", marginLeft: "185px" }}>
                {week.map((day, i) =>
                    <Typography key={i} style={{ marginRight: "40px", fontWeight: "bold" }}>
                        {day.format("ddd Do")}
                    </Typography>)}
            </div>
            {habits.map((habit, i) => <HabitCard key={i} habit={habit}/>)}
            <div style={{ marginTop: "10px" }}>
                <Input style={{ marginRight: "10px" }} placeholder="New habit" value={newHabit} onChange={(e) => setNewHabit(e.target.value)} />
                <Button variant="outlined" color="secondary" onClick={() => handleAddHabit()}> Add a habit </Button>
            </div>
            {/* <Notification open={openNotify} title={notifyText} handleClose={() => handleCloseNotify()} /> */}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        habits: state.habits,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addHabit: (habit) => dispatch(addHabit(habit)),
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(Main);