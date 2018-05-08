import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, ScrollView, Text, ImageBackground, Platform, StatusBar, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Asset, AppLoading } from 'expo';


import { charactersFetch } from '../actions';
import { gaScreenView, gaScreenEvent, getMarvelPortraitSmallImage } from '../services';

// import { Header } from './common';
import ListItemCharacters from './ListItemCharacters';
import splashImage from '../assets/img/Marvel-Comics-Logo-Oldies.png';


function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

class CharactersList extends Component {

    state = {
        isReady: false,
    };

    componentWillMount() {
        //Get character list fileUri
        const charactersFileUri = _.find(this.props.downloadedData, (item) => {
            return item.key === this.props.age.key;
        }).data.uri;

        this.props.charactersFetch(charactersFileUri);
        this.createDataSource(this.props);
        gaScreenView('CharactersList');
        gaScreenEvent('CharactersList', this.props.age.key);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.characters.length > 0) {
            //console.log('JES loadAssetsAsync START', nextProps.characters);
            this.loadAssetsAsync(nextProps.characters);
            //console.log('JES loadAssetsAsync END');
        }

        this.createDataSource(nextProps);
    }

    createDataSource({ characters }) {

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(characters);
    }

    async loadAssetsAsync(characters) {
        const imgArray = _.map(characters, (item) => { return item.img; });
        //console.log('JES imgArray', imgArray);

        const imageAssets = cacheImages(imgArray);

        // const fontAssets = cacheFonts([FontAwesome.font]);

        await Promise.all([...imageAssets]);
    }
    renderRow(character) {
        // console.log(character);
        return <ListItemCharacters character={character} />;
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this.loadAssetsAsync}
                    onFinish={() => { this.setState({ isReady: true }); }}
                    onError={console.warn}
                />
            );
        }

        const title = this.props.age.name;
        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(231, 0, 0, 1)', marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight }}>
                <Header
                    backgroundColor='#f11e22'
                    outerContainerStyles={{ height: 55 }}
                    statusBarProps={{ barStyle: 'light-content' }}
                    rightComponent={
                        <View style={{ width: 100, marginTop: 0, flex: 1 }}>
                            <ImageBackground
                                resizeMode='contain'
                                style={{ flex: 1, height: 30, marginTop: -5, marginLeft: 30 }}
                                source={splashImage}
                            />
                        </View>
                    }
                    centerComponent={
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 22,
                                fontFamily: 'permanent-marker',
                                marginTop: -5,
                                //paddingTop: 30,
                                //paddingTop: 10,   
                                marginLeft: 30
                            }}
                            >
                            {title}
                        </Text>

                    }
                    leftComponent={{
                        icon: 'home',
                        color: '#fff',
                        style: {
                            marginTop: 40,
                            padding: 0,
                            //paddingTop: 10 
                        },
                        onPress: () => { Actions.listAges(); gaScreenEvent('home click', 'agesList'); }
                    }}
                />
                <ScrollView>
                    <ListView
                        pageSize={5}
                        style={{ backgroundColor: '#FFFDEF' }}
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                        
                    />
                </ScrollView>
            </View>

        );
    }
}

const mapStateToProps = state => {
    if (!_.isEmpty(state.characters)) {
        const charactersArray = _.map(state.characters, (value, key) => {
            const thumbnail = getMarvelPortraitSmallImage(value.img);
            return { ...value, id: key, thumbnail };
        });
        // _.forEach(charactersArray, (item) => {
        //     console.log('JES character', item.name, item.img);
        // });
        return {
            downloadedData: state.downloadedData,
            characters: charactersArray
        };
    }
    return {
        downloadedData: state.downloadedData,
        characters: []
    };
};

// export default AgesList;
export default connect(mapStateToProps, { charactersFetch })(CharactersList);

/**
 *     render() {
        const title = this.props.age.name;
        return (
            <ScrollView>
                <Header headerText={title} />
                <ListView
                    style={{ backgroundColor: '#FFFDEF' }}
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </ScrollView>
        );
    }
 */
