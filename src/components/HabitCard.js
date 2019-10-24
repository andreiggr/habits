import React, { Component } from 'react';
import { Paper, Typography, CircularProgress, IconButton } from '@material-ui/core';
import { Close, Check } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import moment from "moment";
import nextDayId from '../utils/nextDayId';
import _ from "lodash";


const HabitCard = props => {

    const handleCheck = (day) => {
        const habitId = props.habit.id;
        const id  = nextDayId(props.habits)
        const date = moment(day).unix();
        const newDay = { id, habitId, date };
        props.addDate(newDay);
    }

    const handleUnCheck = (day) => {
        const date = moment(day).unix();
        var habitDays = props.habit.days;
        var removedDay = habitDays.filter(day => Math.floor(day.date / 10000) === Math.floor(date / 10000))[0];
        props.removeDate(removedDay);
    }

    const title = props.habit.title;
    const habit = props.habit;
    const habitDays = props.habit.days.map(day => moment.unix(day.date).format("ddd Do"));

    return (

        <div>
            <Paper style={{ marginTop: "10px", padding: "5px", display: "flex", flexDirection: "row", alignItems: "center", background: "#EFEFEF" }}>
                <CircularProgress variant="static" value={100} size={25} style={{ margin: "3px", marginRight: "10px" }} />
                <div style={{ width: "125px" }}>
                    <Link style={{ textDecoration: "none" }} to={`/habit/${title}`} >
                        <Typography variant="h6" style={{ cursor: "pointer", color: "black" }} onClick={() => props.selectHabit(habit)} >
                            {title}
                        </Typography>
                    </Link>
                </div>
                {props.week.map((day, index) =>
                    <div key={index} style={{ marginLeft: "30px", marginRight: "47px", cursor: "pointer" }}>
                        {habitDays.includes(day.format("ddd Do")) && <Check onClick={() => handleUnCheck(day)} color="primary" />}
                        {!habitDays.includes(day.format("ddd Do")) && <Close onClick={() => handleCheck(day)} color="disabled" />}
                    </div>)}
            </Paper>
        </div>
    );
}

export default HabitCard;