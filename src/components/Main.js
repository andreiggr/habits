import React, { Component, useState } from 'react';
import HabitCard from './HabitCard';
import { Typography, Button, Input } from '@material-ui/core';
import moment from "moment";
import Notification from './Notification';


const Main = props => {

    const [newHabit, setNewHabit] = useState("");
    const [openNotify, setOpenNotify] = useState(false);
    const [notifyText, setNotifyText] = useState("");

    const handleAddHabit = () => {

        const title = newHabit;
        const id = props.habits.length + 1;
        const days = [];
        const habit = { days, id, title };

        if (title === "") {
            setOpenNotify(true);
            setNotifyText("Title is empty!")
        } else {
            props.addHabit(habit);
            setNewHabit("");
            setOpenNotify(true);
            setNotifyText("Habit added!");
        }
    }

   const week = [
        moment(),
        moment().add(1, "day"),
        moment().add(2, "day"),
        moment().add(3, "day"),
        moment().add(4, "day")
    ];

    const habits = props.habits;

    return (

        <div>
            <div style={{ marginTop: "10px", display: "flex", flexDirection: "row", marginLeft: "185px" }}>
                {week.map((day, i) =>
                    <Typography key={i} style={{ marginRight: "40px", fontWeight: "bold" }}>
                        {day.format("ddd Do")}
                    </Typography>)}
            </div>
            {habits.map((habit, i) => <HabitCard key={i} habit={habit} week={week} {...props} habitSelect={() => props.selectHabit(habit)} />)}
            <div style={{ marginTop: "10px" }}>
                <Input style={{ marginRight: "10px" }} placeholder="New habit" value={newHabit} onChange={(e) => setNewHabit(e.target.value)} />
                <Button variant="outlined" color="secondary" onClick={() => handleAddHabit()}> Add a habit </Button>
            </div>
            {/* <Notification open={openNotify} title={notifyText} handleClose={() => handleCloseNotify()} /> */}
        </div>
    );
}

export default Main;
