import { Actions } from 'react-native-router-flux';
import { loadASyncDataFromStorage } from '../services';

import {
    AGES_FETCH_SUCCESS
} from './types';

export const agesFetch = (fileUri) => {
    return (dispatch) => {
        loadASyncDataFromStorage(fileUri)
            .then(response => {
                dispatch({ type: AGES_FETCH_SUCCESS, payload: JSON.parse(response) });
            });
    };
};
