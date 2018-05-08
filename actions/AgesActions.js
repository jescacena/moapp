import { loadASyncDataFromStorage } from '../services';

import {
    AGES_FETCH_SUCCESS,
    SET_AGE_SELECTED
} from './types';

export const agesFetch = (fileUri) => {
    return (dispatch) => {
        loadASyncDataFromStorage(fileUri)
            .then(response => {
                dispatch({ type: AGES_FETCH_SUCCESS, payload: JSON.parse(response) });
            });
    };
};

export const setAgeAselected = (age) => {
    return {
        type: SET_AGE_SELECTED,
        payload: age
    };
};
