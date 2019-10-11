export function habitsHasErrored(state = false, action) {
    switch (action.type) {
        case 'HABITS_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}
export function habitsIsLoading(state = false, action) {
    switch (action.type) {
        case 'HABITS_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}
export function habits(state = [], action) {
    switch (action.type) {
        case 'HABITS_FETCH_DATA_SUCCESS':
            return action.habits;
        case 'HABIT_ADD':
            return [
                ...state,
                action.habit
            ];
        case 'HABIT_REMOVE':
            const removedIndex = state.findIndex(habit => habit.id === action.id)
            return [
                ...state.slice(0, removedIndex),
                ...state.slice(removedIndex + 1)
            ];
        case 'ADD_DATE':
            let habitAddIndex = state.findIndex(habit => habit.id === action.day.habitId)
            let habitAdd = state[habitAddIndex];
            let habitDaysAdd = [...habitAdd.days, action.day]
            let habitAdded = { ...habitAdd, days: habitDaysAdd }

            let stateAdd = [...state];
            stateAdd[habitAddIndex] = habitAdded

            return stateAdd;

        case 'REMOVE_DATE':
            let habitRemIndex = state.findIndex(habit => habit.id === action.day.habitId)
            let habitRem = state[habitRemIndex];
            let dayRemIndex = habitRem.days.findIndex(day => day.id === action.day.id)
            let habitDaysRem = [...habitRem.days.slice(0, dayRemIndex),
            ...habitRem.days.slice(dayRemIndex + 1)]
            let habitRemoved = { ...habitRem, days: habitDaysRem }

            let stateRem = [...state];
            stateRem[habitRemIndex] = habitRemoved

            return stateRem;

        default:
            return state;
    }
}