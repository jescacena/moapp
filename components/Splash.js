import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Font, FileSystem } from 'expo';
import * as Redux from 'react-redux';
import {
	// BallIndicator,
	// BarIndicator,
	DotIndicator,
	// MaterialIndicator,
	// PacmanIndicator,
	// PulseIndicator,
	// SkypeIndicator,
	// UIActivityIndicator
	// WaveIndicator,
} from 'react-native-indicators';

import { Text as TextNative } from 'react-native-elements';

import {
	setCustomText,
	setCustomView
} from 'react-native-global-props';

import {
	DOWNLOAD_SUCCESS, SET_FORCE_IMAGE_RELOAD
} from '../actions/types';


import { gaScreenView, loadAllJsonDataFiles, getForceImageReloadFlag } from '../services';

import permanentRegularFont from '../assets/fonts/PermanentMarker-Regular.ttf';


import splashImage from '../assets/img/splashv2.png';
import packageJson from '../package.json';

import * as Constants from '../services/Constants';

import {
	checkOtaUpdates,
	fetchUpdateAndReload
} from '../services/UpdateService';


class Splash extends Component {

	constructor(props) {
		super(props);

		this.state = {
			fontLoaded: false,
		};
	}

	componentWillMount() {
		gaScreenView('Splash');
	}
	async componentDidMount() {
		const { dispatch } = this.props;

		let downloadedData;
		const newAppUpdateAvailable = await checkOtaUpdates();
		if (newAppUpdateAvailable) {
			// Download json files (async)
			downloadedData = await loadAllJsonDataFiles(true);

			fetchUpdateAndReload();  // In this point exit of the app for reloading
		} else {
			// Download json files (async) with cache check
			downloadedData = await loadAllJsonDataFiles();
		}
		// setTimeout(() => {
		//Preload JSON remote data


		dispatch({ type: DOWNLOAD_SUCCESS, payload: downloadedData });

		const forceImageDataReload = await getForceImageReloadFlag();
		dispatch({ type: SET_FORCE_IMAGE_RELOAD, payload: forceImageDataReload });

		// Set custom text
		await Font.loadAsync({
			permanentRegularFont
		});

		this.setState({ fontLoaded: true });

		// Setting default styles for all Text components.
		const customTextProps = {
			style: {
				fontWeight: 'normal',
				fontFamily: 'permanentRegularFont'
			}
		};
		setCustomText(customTextProps);
		setCustomView(customTextProps);

		//Go home: ages screen
		Actions.main();
		// }, 2000);
	}

	render() {
		return (this.state.fontLoaded) ? (
			<View style={styles.container}>
				<ImageBackground
					style={styles.backdrop}
					source={splashImage}
					resizeMode='contain'
				>
				</ImageBackground>

				<DotIndicator color={Constants.PALETE_COLOR_LIGHT_GREY} count={3} size={10} animationDuration={1000} />

				<TextNative h4 style={{ color: Constants.PALETE_COLOR_LIGHT_GREY, padding: 10, fontSize: 9 }}>{packageJson.version}</TextNative>
				<TextNative h6 style={{ color: Constants.PALETE_COLOR_LIGHT_GREY, padding: 10, fontSize: 9 }}>* All characters data were compiled from free copyright sources.</TextNative>
			</View>
		) : null;
	}
}

export default Redux.connect()(Splash);


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: Constants.PALETE_COLOR_BLUE,
		width: null
	},
	backdrop: {
		marginTop: 150,
		width: Dimensions.get('window').width - 100,
		height: 150
	},
	backdropView: {
		height: 120,
		width: 320,
		backgroundColor: Constants.PALETE_COLOR_BLACK,
	},
	headline: {
		// fontFamily: 'permanent-marker',
		top: 60,
		fontSize: 40,
		fontWeight: 'bold',
		textAlign: 'center',
		backgroundColor: Constants.PALETE_COLOR_BLACK,
		color: 'blue'
	}
});
