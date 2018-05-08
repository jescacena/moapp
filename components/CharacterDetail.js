import React, { Component } from 'react';
import { View, Text, ImageBackground, Linking, ScrollView, StyleSheet, ActivityIndicator, Platform, StatusBar } from 'react-native';
import { Card, Button, Header } from 'react-native-elements';
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

    render() {
        const { name, yearDebuted, creators, firstAppearance, firstAppearanceUrl, img, description } = this.props.character;
        // console.log('JES character', this.props.character);
        const {
            moreInfoStyles,
            nameContainerStyle,
            headerTextStyle,
            imageStyle
        } = styles;

        return (
            <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight }}>
                <Header
                    backgroundColor='#f11e22'
                    outerContainerStyles={{ height: 55 }}
                    statusBarProps={{ barStyle: 'light-content' }}

                    leftComponent={{
                        icon: 'arrow-left',
                        type: 'octicon',
                        color: '#fff',
                        style: {
                            marginTop: 40,
                            padding: 0,
                            //paddingTop: 10 
                        },
                        onPress: () => {
                            Actions.listCharacters({ age: this.props.ageSelected });
                            gaScreenEvent('back click', 'characterList');
                        }
                    }}

                    rightComponent={
                        <View style={{ width: 100, marginTop: 0, flex: 1 }}>
                            <ImageBackground
                                resizeMode='contain'
                                style={{ flex: 1, height: 30, marginTop: -5, marginLeft: 30 }}
                                source={splashImage}
                            />
                        </View>
                    }
                />

                <ScrollView>
                    {
                        this.state.fontLoaded ? (
                            <Card
                                image={{ uri: img, cache: 'force-cache' }}
                                imageStyle={{ height: 400 }}
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
                                <View style={{ borderTopWidth: 1, borderTopColor: '#F1F1F1', marginBottom: 10, paddingTop: 10 }}>
                                    <Button
                                        icon={{ name: 'link' }}
                                        onPress={() => {
                                            Linking.openURL(firstAppearanceUrl); gaScreenEvent('Character First appeareance', name);
                                        }}
                                        fontFamily='Lato'
                                        backgroundColor='#03A9F4'
                                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                        title='First Appearance'
                                    />
                                </View>
                            </Card>
                        ) : (
                                <ActivityIndicator size="large" color="#F1F1F1" />
                            )
                    }

                </ScrollView>
            </View>


        );

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
    console.log('JES character detail state', state);
    return {
        ageSelected: state.ageSelected
    };
};

export default connect(mapStateToProps)(CharacterDetail);


/**
 * 
 * 
 * image={{ uri: img }}
                            imageStyle={{ height: 400 }}

 * 
 *                             <Text style={{ marginBottom: 10, fontFamily: 'Lato' }}>{description}</Text>

 * {
name: "Ka-Zar (David Rand)",
yearDebuted: "1936 (October)",
creators: "Bob Byrd",
firstAppearance: "Ka-Zar #1",
img: "https://i.annihil.us/u/prod/marvel/i/mg/9/40/4dcc503738d3d.jpg"
},


    const renderFirstAppearanceUrl = (firstAppearanceUrl) ?
        (
            <Button onPress={() => { Linking.openURL(firstAppearanceUrl); }}>
                First Appearance: {firstAppearance}
            </Button>
        )
        :
        (
            <Text>First Appearance: {firstAppearance}</Text>
        );

    return (
        <ScrollView>
            <Card>
                <CardSection>
                    <View style={nameContainerStyle}>
                        <Text style={headerTextStyle}>{name}</Text>
                    </View>
                </CardSection>

                <CardSection>
                    <Image
                        style={imageStyle}
                        source={{ uri: img }}
                    />
                </CardSection>

                <CardSection>
                    <Text>{description}</Text>
                </CardSection>

                <CardSection>
                    <View style={moreInfoStyles}>
                        <Text>Year Debuted: {yearDebuted}</Text>
                        <Text>Creators: {creators}</Text>
                    </View>
                </CardSection>

                <CardSection>
                    {renderFirstAppearanceUrl}
                </CardSection>
            </Card >
        </ScrollView>
    );
 */
