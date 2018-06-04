import {
    SET_FORCE_IMAGE_RELOAD
} from '../actions/types';

const INITIAL_STATE = false;
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_FORCE_IMAGE_RELOAD:
            return action.payload;
        default:
            return state;
    }
};
