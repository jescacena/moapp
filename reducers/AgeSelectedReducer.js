import {
    SET_AGE_SELECTED
} from '../actions/types';

const INITIAL_STATE = null;
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_AGE_SELECTED:
            return action.payload;
        default:
            return state;
    }
};
