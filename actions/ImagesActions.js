import {
    SET_FORCE_IMAGE_RELOAD
} from './types';


export const setForceImageReload = (value) => {
    return {
        type: SET_FORCE_IMAGE_RELOAD,
        payload: value
    };
};
