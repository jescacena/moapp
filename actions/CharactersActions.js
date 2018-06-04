// import axios from 'axios';
import { loadASyncDataFromStorage } from '../services';

import {
    CHARACTERS_FETCH_SUCCESS,
    CHARACTERS_CLEAN,
    SET_SCROLL_POSITION_CHARACTER_LIST
} from './types';

export const charactersFetch = (fileUri) => {
    return (dispatch) => {
        dispatch({ type: CHARACTERS_CLEAN });

        // axios.get(`https://cercemap.org/resources/moapp/json/${ageKey}.characters.json`)
        loadASyncDataFromStorage(fileUri)
            .then(response => {
                dispatch({ type: CHARACTERS_FETCH_SUCCESS, payload: JSON.parse(response) });
            });
    };
};

export const setScrollPositionCharacterList = (scrollPosition) => {
    return {
        type: SET_SCROLL_POSITION_CHARACTER_LIST,
        payload: scrollPosition
    };
};
