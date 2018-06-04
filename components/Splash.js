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
    DOWNLOAD_SUCCESS, SET_FORCE_IMAGE_RELOAD
} from '../actions/types';


import { gaScreenView, loadAllJsonDataFiles, getForceImageReloadFlag } from '../services';

import splashImage from '../assets/img/Marvel-Comics-Logo-Oldies.png';
import packageJson from '../package.json';


class Splash extends Component {

    componentWillMount() {
        gaScreenView('Splash');
    }
    async componentDidMount() {
        const { dispatch } = this.props;

        // setTimeout(() => {
            //Preload JSON remote data
            const downloadedData = await loadAllJsonDataFiles();

            dispatch({ type: DOWNLOAD_SUCCESS, payload: downloadedData });

            const forceImageDataReload = await getForceImageReloadFlag();
            dispatch({ type: SET_FORCE_IMAGE_RELOAD, payload: forceImageDataReload });

            //Go home: ages screen
            Actions.main();
        // }, 2000);
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.backdrop}
                    source={splashImage}
                    resizeMode='contain'
                >
                </ImageBackground>

                <DotIndicator color='#f1f1f1' count={3} size={10} animationDuration={1000} />

                <TextNative h4 style={{ color: '#f1f1f1', padding: 10, fontSize: 9 }}>{packageJson.version}</TextNative>
                <TextNative h6 style={{ color: '#f1f1f1', padding: 10, fontSize: 9 }}>* All Marvel Characters info were compilled from free copyright sources.</TextNative>
            </View>
        );
    }
}

export default Redux.connect()(Splash);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ed1b24',
        width: null
    },
    backdrop: {
        marginTop: 100,
        width: Dimensions.get('window').width - 100 ,
        height: 150
    },
    backdropView: {
        height: 120,
        width: 320,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    headline: {
        // fontFamily: 'permanent-marker',
        top: 60,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'blue'
    }
});


/**
 *                     <View style={styles.backdropView}>
                        <Text style={styles.headline}>Oldies</Text>
                    </View>
 */
