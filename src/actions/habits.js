import axios from 'axios';

const apiUrl = `http://5d49e7485c331e00148ead96.mockapi.io/Habit/`;

export function habitsHasErrored(bool) {
    return {
        type: 'HABITS_HAS_ERRORED',
        hasErrored: bool
    };
}
export function habitsIsLoading(bool) {
    return {
        type: 'HABITS_IS_LOADING',
        isLoading: bool
    };
}
export function habitsFetchDataSuccess(habits) {
    return {
        type: 'HABITS_FETCH_DATA_SUCCESS',
        habits
    };
}

export function habitsFetchData(url) {
    return (dispatch) => {
        dispatch(habitsIsLoading(true));
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(habitsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((habits) => dispatch(habitsFetchDataSuccess(habits)))
            .catch(() => dispatch(habitsHasErrored(true)));
    };
}


export function addHabit(habit) {
    return (dispatch) => {
        axios.post(apiUrl, {
            id: habit.id,
            title: habit.title,
            days: habit.days
        })
            .then(() => {
                dispatch(addHabitUpdate(habit));
            }, (error) => {
                console.log(error);
            })
    }
}
export function addHabitUpdate(habit) {
    return {
        type: "HABIT_ADD",
        habit
    }
}

export function removeHabit(habit) {
    return (dispatch) => {
        axios.delete(apiUrl + habit.id)
            .then(() => {
                dispatch(removeHabitUpdate(habit.id));
            }, (error) => {
                console.log(error);
            })
            // .then(()=> {
            //     dispatch(removeHabitDays(habit.days))
            // }, (error) => console.log(error) )

    }
}

// export function removeHabitDays (days) {
//   return days.map(day => 
//     habitRemoveDate(day)
//     )  
// }


export function removeHabitUpdate(id) {
    return {
        type: "HABIT_REMOVE",
        id
    }
}

export function habitAddDate(day) {
    return (dispatch) => {
        axios.post(`http://5d49e7485c331e00148ead96.mockapi.io/Habit/${day.habitId}/day`, {
            id: day.id,
            habitId: day.habitId,
            date: day.date
        })
            .then(() => {
                dispatch(habitAddDateUpdate(day));
            }, (error) => {
                console.log(error);
            });
    }
}

export function habitAddDateUpdate(day) {
    return {
        type: "ADD_DATE",
        day
    }
}

export function habitRemoveDate(day) {
    return (dispatch) => {
        axios.delete(apiUrl + day.habitId + "/day/" + day.id)
            .then(() => {
                dispatch(habitRemoveDateUpdate(day));
            }, (error) => {
                console.log(error);
            });
    }
}

export function habitRemoveDateUpdate(day) {
    return {
        type: "REMOVE_DATE",
        day
    }
}