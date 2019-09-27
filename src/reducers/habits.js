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
        default:
            return state;
    }
}