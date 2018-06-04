import {
    SET_SCROLL_POSITION_CHARACTER_LIST
} from '../actions/types';

const INITIAL_STATE = 0;
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SCROLL_POSITION_CHARACTER_LIST:
            return action.payload;
        default:
            return state;
    }
}; 