import { combineReducers } from 'redux';
import {habits, habitsHasErrored, habitsIsLoading} from './habits';

export default combineReducers({
    habits,
    habitsHasErrored,
    habitsIsLoading
});