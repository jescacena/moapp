// import axios from 'axios';
import { loadASyncDataFromStorage } from '../services';

import {
    CHARACTERS_FETCH_SUCCESS,
    CHARACTERS_CLEAN
} from './types';

export const charactersFetch = (fileUri) => {
    return (dispatch) => {
        dispatch({ type: CHARACTERS_CLEAN });

        // axios.get(`https://cercemap.org/resources/json/${ageKey}.characters.json`)
        loadASyncDataFromStorage(fileUri)
            .then(response => {
                // console.log('JES response charactersFetch', response);
                dispatch({ type: CHARACTERS_FETCH_SUCCESS, payload: JSON.parse(response) });
            });
    };
};
