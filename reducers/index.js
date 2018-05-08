import { combineReducers } from 'redux';
import AgesReducer from './AgesReducer';
import AgeSelectedReducer from './AgeSelectedReducer';
import CharactersReducer from './CharactersReducer';
import FontsLoadedReducer from './FontsLoadedReducer';
import DownloadedDataReducer from './DownloadedDataReducer';

export default combineReducers({
    downloadedData: DownloadedDataReducer,
    characters: CharactersReducer,
    ages: AgesReducer,
    ageSelected: AgeSelectedReducer,
    fontsLoaded: FontsLoadedReducer
});
