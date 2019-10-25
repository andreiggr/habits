import { combineReducers } from 'redux';
import { habits, habitsHasErrored, habitsIsLoading, selectedHabit } from './habits';

export default combineReducers({
    habits,
    selectedHabit,
    habitsHasErrored,
    habitsIsLoading
});