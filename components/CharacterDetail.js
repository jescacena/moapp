import React, { Component } from 'react';
import { View, Text, ImageBackground, Linking, 
    ScrollView, StyleSheet, ActivityIndicator, 
    Platform, StatusBar, Dimensions } from 'react-native';
import { Card, Button, Header, Icon } from 'react-native-elements';
import { Font } from 'expo';
import HTMLView from 'react-native-htmlview';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { gaScreenView, gaScreenEvent } from '../services';
import permanentMarkerRegularFont from '../assets/fonts/PermanentMarker-Regular.ttf';
import latoRegularFont from '../assets/fonts/Lato-Regular.ttf';
import splashImage from '../assets/img/Marvel-Comics-Logo-Oldies.png';


class CharacterDetail extends Component {

    state = {
        fontLoaded: false
    };

    componentWillMount() {
        const { name } = this.props.character;
        gaScreenView('CharacterDetail');
        gaScreenEvent('Character', name);
    }
    async componentDidMount() {
        await Font.loadAsync({
            'permanent-marker': permanentMarkerRegularFont,
            'Lato': latoRegularFont
        });
        this.setState({ fontLoaded: true });
    }

    renderCard() {
        const { name, yearDebuted, creators, firstAppearance, firstAppearanceUrl, img, description } = this.props.character;
        const imageCacheFlag = (!this.props.forceImageDataReload) ? 'force-cache' : 'reload';


        return (
            <Card
                containerStyle={{ flex: 1, width: Dimensions.get('window').width, margin:0, padding:0}}
                image={{ uri: img, cache: imageCacheFlag }}
                imageProps={{ resizeMode: 'contain' }}
                imageStyle={{height: 400}}
                title={name.toUpperCase()}
                titleStyle={{ fontFamily: 'Lato', textAlign: 'left', marginLeft: 10 }}
            >
                <HTMLView
                    addLineBreaks={false}
                    value={description}
                    stylesheet={stylesHtml}
                />
                <View style={{ borderTopWidth: 1, borderTopColor: '#F1F1F1', marginBottom: 10, paddingTop: 10 }}>
                    <Text style={{ fontWeight: 'normal' }}>Year debuted: </Text>
                    <Text style={{ fontWeight: 'bold' }}>{yearDebuted}</Text>
                </View>
                <View style={{ borderTopWidth: 1, borderTopColor: '#F1F1F1', marginBottom: 10, paddingTop: 10 }}>
                    <Text style={{ fontWeight: 'normal' }}>Creators: </Text>
                    <Text style={{ fontWeight: 'bold' }}>{creators}</Text>
                </View>
                <View style={{ borderTopWidth: 1, 
                                borderTopColor: '#F1F1F1', 
                                marginLeft: 0,
                                marginBottom: 10, 
                                paddingTop: 10, 
                                paddingLeft: 0, 
                                alignItems: 'flex-start'
                    }}>
                    <Button
                        rightIcon={{ 
                            type:'material-community',
                            name: 'web', 
                            color: '#c50000' 
                        }}
                        onPress={() => {
                            Linking.openURL(firstAppearanceUrl); gaScreenEvent('Character First appeareance', name);
                        }}
                        containerViewStyle={{ flex: 1, alignItems: 'flex-start', marginLeft: 0, paddingLeft: 0 }}
                        fontFamily='Lato'
                        backgroundColor='#f1f1f1'
                        buttonStyle={{ 
                            borderRadius: 15, 
                            marginLeft: 0, 
                            marginRight: 0, 
                            marginBottom: 0, 
                            width: 150, 
                            height: 40, 
                            paddingTop: 10,
                            alignItems: 'flex-start'
                        }}
                        title='First Appearance'
                        textStyle={{ fontWeight: "700", color: '#c50000' }}
                    />
                </View>
            </Card>
        );
    }



    renderModalView() {
        return this.state.fontLoaded ?
            this.renderCard()
            :
            (
                <ActivityIndicator size="large" color="#F1F1F1" />
            );
    }

    renderScreenView() {
        const { name, yearDebuted, creators, firstAppearance, firstAppearanceUrl, img, description } = this.props.character;
        const imageCacheFlag = (!this.props.forceImageDataReload) ? 'force-cache' : 'reload';


        return (
            <View style={{ flex: 1}}>
                <Header
                    backgroundColor='#f11e22'
                    outerContainerStyles={{ height: 55 }}
                    statusBarProps={{ barStyle: 'light-content' }}
                    rightComponent={
                        {
                            icon: 'circle-with-cross',
                            type: 'entypo',
                            color: '#fff',
                            style: {
                                marginTop: Platform.OS === 'ios' ? 40 : 30,
                                padding: 0,
                                //paddingTop: 10 
                            },
                            onPress: () => {
                                //Actions.listCharacters({ age: this.props.ageSelected });
                                gaScreenEvent('back click', 'characterList');
                            }
                        }
                    }
                    leftComponent={
                        <View style={{ width: 100, marginTop: 0, flex: 1 }}>
                            <ImageBackground
                                resizeMode='contain'
                                style={{ flex: 1, height: 30, marginTop: Platform.OS === 'ios' ? -5 : -15, marginLeft: 30 }}
                                source={splashImage}
                            />
                        </View>
                    }
                />

                <ScrollView>
                    {
                        this.state.fontLoaded ?
                            this.renderCard()
                            :
                            (
                                <ActivityIndicator size="large" color="#F1F1F1" />
                            )
                    }

                </ScrollView>
            </View>


        );
    }

    render() {
        const {
            moreInfoStyles,
            nameContainerStyle,
            headerTextStyle,
            imageStyle
        } = styles;


        return this.props.modalView ?
            this.renderModalView()
            :
            this.renderScreenView();
        ;
    }
}

const stylesHtml = StyleSheet.create({
    p: {
        marginBottom: 10, fontFamily: 'Lato'
    },
});

const styles = {
    moreInfoStyles: {
        fontSize: 20,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    nameContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    headerTextStyle: {
        fontSize: 25
    },
    imageStyle: {
        height: 450,
        flex: 1,
        width: null
    }
};

const mapStateToProps = state => {
    return {
        ageSelected: state.ageSelected,
        forceImageDataReload: state.forceImageDataReload
    };
};

export default connect(mapStateToProps)(CharacterDetail);