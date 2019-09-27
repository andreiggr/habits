import React, { Component, useState, useEffect } from 'react';
import Header from "./components/Header.js";
import Main from './components/Main.js';
import DetailedHabit from './components/DetailedHabit.js';

import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { habitsFetchData, habitAddDate, habitRemoveDate, addHabit, removeHabit } from './actions/habits';


const App = props => {

    const [habits, setHabits] = useState([]);
    const [selectedHabit, setSelectedHabit] = useState(undefined);

    useEffect(() => {
        props.fetchData("http://5d49e7485c331e00148ead96.mockapi.io/Habit")
    }, [])



    return (
        <React.Fragment>
            <Header />
            <Switch>
                <Route exact path="/" render={() => <Main habits={habits} selectHabit={(habit) => setSelectedHabit(habit)}  {...props} />} />
                <Route path="/habit/:title" render={() => <DetailedHabit habit={selectedHabit}  {...props} />} />
            </Switch>
        </React.Fragment>
    );
}

const RoutedApp = withRouter(App);

const mapStateToProps = (state) => {
    return {
        habits: state.habits,
        hasErrored: state.habitsHasErrored,
        isLoading: state.habitsIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(habitsFetchData(url)),
        addDate: (date) => dispatch(habitAddDate(date)),
        removeDate: (date) => dispatch(habitRemoveDate(date)),
        addHabit: (habit) => dispatch(addHabit(habit)),
        removeHabit: (habit) => dispatch(removeHabit(habit))
    };

}


export default connect(mapStateToProps, mapDispatchToProps)(RoutedApp);