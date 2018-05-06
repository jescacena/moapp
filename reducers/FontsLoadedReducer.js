import {
    FONTS_LOADED
} from '../actions/types';

const INITIAL_STATE = false;
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FONTS_LOADED:
            return true;
        default:
            return state;
    }
};
