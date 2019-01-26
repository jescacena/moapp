import { combineReducers } from 'redux';
import AgesReducer from './AgesReducer';
import AgeSelectedReducer from './AgeSelectedReducer';
import ScrollPositionCharacterListReducer from './ScrollPositionCharacterListReducer';
import CharactersReducer from './CharactersReducer';
import FontsLoadedReducer from './FontsLoadedReducer';
import DownloadedDataReducer from './DownloadedDataReducer';
import ForceImageDataReloadReducer from './ForceImageDataReloadReducer';

export default combineReducers({
    downloadedData: DownloadedDataReducer,
    characters: CharactersReducer,
    ages: AgesReducer,
    ageSelected: AgeSelectedReducer,
    scrollPositionCharacterList: ScrollPositionCharacterListReducer,
    fontsLoaded: FontsLoadedReducer,
    forceImageDataReload: ForceImageDataReloadReducer
});

