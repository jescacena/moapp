import {
    CHARACTERS_FETCH_SUCCESS,
    CHARACTERS_CLEAN
} from '../actions/types';

const INITIAL_STATE = [];
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHARACTERS_CLEAN:
            return INITIAL_STATE;
        case CHARACTERS_FETCH_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}; 