
import { FileSystem } from 'expo';
import _ from 'lodash';
// import axios from 'axios';


export const API_BASE_URL = 'https://cercemap.org/resources/moapp/json';
export const LOCAL_STORAGE_JSON_DIRECTORY = `${FileSystem.documentDirectory}json`;
export const LOCAL_STORAGE_IMAGE_DIRECTORY = `${FileSystem.documentDirectory}image`;
export const CONFIG_JSON_FILE = 'config.json';
export const CONFIG_REMOTE_JSON_FILE = 'config.remote.json';
export const AGES_JSON_FILE = 'ages.json';
export const GOLDENAGE_JSON_FILE = 'goldenAge.characters.json';
export const SIXTIES_JSON_FILE = 'sixties.characters.json';
export const SEVENTIES_JSON_FILE = 'seventies.characters.json';
export const EIGHTIES_JSON_FILE = 'eighties.characters.json';


/**
 * @name loadAllJsonDataFiles
 * @description Load All remote json data files into the device filesystem
 * @return {object}
 */
export const loadAllJsonDataFiles = async () => {

    //0.- Create json and images folder if there not exists
    await createCacheFolders();

    //1.- Config read local
    const localConfig = _.cloneDeep(await getLocalConfig());
    console.log('JES localConfig', localConfig);

    //2.- Config read remote
    const remoteConfig = await getRemoteConfig();
    console.log('JES remoteConfig', remoteConfig);

    //4.- Get update flags
    const forceJsonDataReload = remoteConfig.forceJsonDataReload;
    console.log('JES forceJsonDataReload', forceJsonDataReload);

    const refresJsonDataByDate = (localConfig) ?
        localConfig.jsonDataLastUpdateTimestamp < remoteConfig.jsonDataLastUpdateTimestamp
        :
        true;
    console.log('JES refresJsonDataByDate', refresJsonDataByDate);


    //5.- Download Json data if needed
    if (forceJsonDataReload || refresJsonDataByDate) {
        //Update local config
        await updateLocalConfig(JSON.stringify(remoteConfig));

        //Download updated json data files
        return downloadJSONFiles();
    }
    // Return cached data
    return [
        { key: 'ages', data: await FileSystem.getInfoAsync(`${LOCAL_STORAGE_JSON_DIRECTORY}/${AGES_JSON_FILE}`) },
        { key: 'goldenAge', data: await FileSystem.getInfoAsync(`${LOCAL_STORAGE_JSON_DIRECTORY}/${GOLDENAGE_JSON_FILE}`) },
        { key: 'sixties', data: await FileSystem.getInfoAsync(`${LOCAL_STORAGE_JSON_DIRECTORY}/${SIXTIES_JSON_FILE}`) },
        { key: 'seventies', data: await FileSystem.getInfoAsync(`${LOCAL_STORAGE_JSON_DIRECTORY}/${SEVENTIES_JSON_FILE}`) },
        { key: 'eighties', data: await FileSystem.getInfoAsync(`${LOCAL_STORAGE_JSON_DIRECTORY}/${EIGHTIES_JSON_FILE}`) }
    ];

};

const updateLocalConfig = (content) => {
    return FileSystem.writeAsStringAsync(`${LOCAL_STORAGE_JSON_DIRECTORY}/${CONFIG_JSON_FILE}`, content);
};

const createCacheFolders = async () => {
    const result1 = await FileSystem.getInfoAsync(LOCAL_STORAGE_JSON_DIRECTORY);
    if (!result1.exists) {
        await FileSystem.makeDirectoryAsync(LOCAL_STORAGE_JSON_DIRECTORY);
    }
    const result2 = await FileSystem.getInfoAsync(LOCAL_STORAGE_IMAGE_DIRECTORY);
    if (!result2.exists) {
        await FileSystem.makeDirectoryAsync(LOCAL_STORAGE_IMAGE_DIRECTORY);
    }
};

/**
 * @name getLocalConfig
 * @description Get local config.json
 */
const getLocalConfig = async () => {
    const existsResult = await FileSystem.getInfoAsync(`${LOCAL_STORAGE_JSON_DIRECTORY}/${CONFIG_JSON_FILE}`);
    if (!!existsResult.exists) {
        const result = await FileSystem.readAsStringAsync(`${LOCAL_STORAGE_JSON_DIRECTORY}/${CONFIG_JSON_FILE}`);
        return JSON.parse(result);
    }
    return null;
};

const getRemoteConfig = async () => {
    const result = downloadConfigJsonFile();
    return (!result.error) ? JSON.parse(await FileSystem.readAsStringAsync(`${LOCAL_STORAGE_JSON_DIRECTORY}/${CONFIG_REMOTE_JSON_FILE}`))
        :
        null;
};

/**
 * @name downloadJSONFiles
 * @description Download all JSON files
 */
const downloadJSONFiles = async () => {
    //1.- Load Json data into the Expo Filesystem
    const downloadResults = [
        { key: 'ages', data: await downloadFileUriIntoFileSystem(`${API_BASE_URL}/${AGES_JSON_FILE}`, `${AGES_JSON_FILE}`) },
        { key: 'goldenAge', data: await downloadFileUriIntoFileSystem(`${API_BASE_URL}/${GOLDENAGE_JSON_FILE}`, `${GOLDENAGE_JSON_FILE}`) },
        { key: 'sixties', data: await downloadFileUriIntoFileSystem(`${API_BASE_URL}/${SIXTIES_JSON_FILE}`, `${SIXTIES_JSON_FILE}`) },
        { key: 'seventies', data: await downloadFileUriIntoFileSystem(`${API_BASE_URL}/${SEVENTIES_JSON_FILE}`, `${SEVENTIES_JSON_FILE}`) },
        { key: 'eighties', data: await downloadFileUriIntoFileSystem(`${API_BASE_URL}/${EIGHTIES_JSON_FILE}`, `${EIGHTIES_JSON_FILE}`) }
    ];

    // console.log('JES 22222 downloadResults', downloadResults);

    //2.- Check if all files are downloaded ok
    const hasError = _.find(downloadResults, (item) => {
        return item.data.status !== 200;
    });

    return (!hasError) ? downloadResults : { error: 'Data fetching error!' };
};


const downloadConfigJsonFile = async () => {
    const downloadResult = await downloadFileUriIntoFileSystem(`${API_BASE_URL}/${CONFIG_JSON_FILE}`, `${CONFIG_REMOTE_JSON_FILE}`);
    console.log('JES downloadConfigJsonFile downloadResult', downloadResult);

    return (downloadResult.status === 200) ? downloadResult : { error: 'Config json file fetching error!' };
};


/**
 * @name loadASyncDataFromStorage
 * @description Load data from downloaded file from the Async Storage (async op)
 * @return {string} file content
 */
export const loadASyncDataFromStorage = async (fileUri) => {
    return await FileSystem.readAsStringAsync(fileUri);
};

/**
 * @name downloadFileUriIntoFileSystem
 * @desc Download file into the device filesystem (async operation)
 * @param {string} uri
 * @param {string} targetFile (device filesystem)
 */
export const downloadFileUriIntoFileSystem = (uri, targetFile) => {
    console.log(`JES downloadFileUriIntoFileSystem-->${LOCAL_STORAGE_JSON_DIRECTORY}/${targetFile}`);

    return FileSystem.downloadAsync(
        uri,
        `${LOCAL_STORAGE_JSON_DIRECTORY}/${targetFile}`
    );
};

/**
 * @name getMarvelPortraitSmallImage
 * @description Build and image uri for portrait small images
 * @param {string} imageUri Example: http://i.annihil.us/u/prod/marvel/i/mg/9/60/50febc4f55525.jpg
 * @return {string} http://i.annihil.us/u/prod/marvel/i/mg/9/60/50febc4f55525/portrait_small.jpg
 */
export const getMarvelPortraitSmallImage = (imageUri) => {
    let result = imageUri;
    if (imageUri.indexOf('marvel/') !== -1) {
        result = imageUri.replace('.jpg', '/portrait_small.jpg');
    } else if (imageUri.indexOf('.jpg') !== -1) {
        result = imageUri.replace('.jpg', '_tn.jpg');
    } else if (imageUri.indexOf('.png') !== -1) {
        result = imageUri.replace('.png', '_tn.png');
    } 
    // console.log('JES getMarvelPortraitSmallImage imageUri, result', imageUri, result);
    return result;
};
