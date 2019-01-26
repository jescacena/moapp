import { Updates } from 'expo';
import _ from 'lodash';
import { Alert } from 'react-native';

/**
 * @name checkOtaUpdates
 * @description Check for Expo Over-The-Air updates   (new update is done by running 'expo publish')
 * @return {boolean} true is there is a new update
 */
export const checkOtaUpdates = async () => {

	try {
		const update = await Updates.checkForUpdateAsync();
		//logInfo('JES checkOtaUpdates', update);
		// Alert.alert(
		// 	'Aviso',
		// 	'update.isAvailable:' + update.isAvailable,
		// 	[
		// 		{ text: 'Cerrar', onPress: () => logInfo('Alert Cerrar checkOtaUpdates'), style: 'cancel' }
		// 	],
		// 	{ cancelable: true }
		// );
		return update.isAvailable;
		// ... notify user of update ...
		// logInfo('JES app checkOtaUpdates about to reload from cache!!!');
		// Alert.alert(
		// 	'Aviso',
		// 	'app checkOtaUpdates about to reload from cache',
		// 	[
		// 		{ text: 'Cerrar', onPress: () => logInfo('Alert Cerrar checkOtaUpdates'), style: 'cancel' }
		// 	],
		// 	{ cancelable: true }
		// );

	} catch (e) {
		// handle or log error
		//logInfo('JES app checkOtaUpdates error!!!', e);
		return false;
	}
};

export const fetchUpdateAndReload = async () => {
	try {
		const response = await Updates.fetchUpdateAsync();
		//logInfo('JES app fetchUpdateAndReload response', response);

		// Alert.alert(
		// 	'Aviso',
		// 	'fetchUpdateAsync response->' + JSON.stringify(response),
		// 	[
		// 		{ text: 'Cerrar', onPress: () => logInfo('Alert Cerrar checkOtaUpdates'), style: 'cancel' }
		// 	],
		// 	{ cancelable: true }
		// );

		if (response.isNew) {
			Updates.reloadFromCache();
		}

	} catch (e) {
		// handle or log error
		//logInfo('JES app fetchUpdateAndReload error!!!', e);
	}
};
