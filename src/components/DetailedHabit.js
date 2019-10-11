import React, { Component } from 'react';
import Calendar from 'react-calendar';
import { Button } from '@material-ui/core';
import moment from "moment";

import '../style/styles.css';

const DetailedHabit = props => {

    const handleRemoveHabit = () => {

        ///solve this
        const habitDays = props.habit.days;
        habitDays.map((day) => setTimeout(() => props.removeDate(day), 500))
            .then(props.removeHabit(props.habit))
            .then(props.history.replace("/"))

    }
    const habit = props.habit;
    const days = habit.days.map(item => moment.unix(item.date).format("L"));

    return (
        <div>
            <p>{habit.title}</p>
            <Calendar
                className="calendar"
                onChange={props.onChange}
                tileClassName={
                    ({ date, view }) => view === 'month' && days.includes(moment(date).format("L")) ? 'completed' : null
                }
            />
            <Button style={{ marginTop: "10px" }} variant="outlined" color="secondary" onClick={() => handleRemoveHabit()}> Remove habit </Button>
        </div>

    );
}

export default DetailedHabit;
