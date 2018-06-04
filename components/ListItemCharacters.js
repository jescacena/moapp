import React, { Component } from 'react';
import { ListItem, Avatar, Text as TextNative } from 'react-native-elements';
import _ from 'lodash';
import { Font } from 'expo';
import {
    Text, View, TouchableWithoutFeedback,TouchableOpacity,
    Image, StyleSheet, ActivityIndicator, Platform
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

// import { setScrollPositionCharacterList } from '../actions';

import { CardSection } from './common';
import latoRegularFont from '../assets/fonts/Lato-Regular.ttf';

class ListItemCharacters extends Component {

    state = {
        fontLoaded: false
    };

    async componentDidMount() {
        await Font.loadAsync({
            'Lato': latoRegularFont
        });
        this.setState({ fontLoaded: true });

    }

    onRowPress() {
        //Actions.characterDetail({ character: this.props.character });

        this.props.onPressCallback(this.props.character);

    }

    renderIOSItem(name, img, yearDebuted, description) {
        const imageCacheFlag = (!this.props.forceImageDataReload) ? 'force-cache' : 'reload';
        return (
            <TouchableOpacity onPress={this.onRowPress.bind(this)} style={{ backgroundColor: 'rgba(241, 241, 241, 1)' }}>
                {
                    this.state.fontLoaded ? (

                        <ListItem
                            containerStyle={{ height: 100 }}
                            key={name}
                            roundAvatar
                            title={name}
                            avatar={
                                <Avatar
                                    large
                                    rounded
                                    source={{ uri: img, cache: imageCacheFlag }}
                                    overlayContainerStyle={{ marginTop: 0 }}
                                    resizeMethod="resize"
                                />
                            }
                            subtitle={
                                <View style={{ maxHeight: 50 }}>
                                    <Text numberOfLines={2} style={{ marginTop: 5, fontFamily: 'Lato' }}>{description}</Text>
                                </View>
                            }

                            titleContainerStyle={{ marginLeft: 10 }}
                            titleStyle={{ marginTop: 0, fontSize: 20, fontWeight: 'bold' }}
                            subtitleStyle={{ fontSize: 15 }}
                            subtitleContainerStyle={{ marginLeft: 20 }}

                        />
                    ) : (
                            <ActivityIndicator size="large" color="#E70000" />
                        )
                }
            </TouchableOpacity>
        );
    }

    render() {
        const { name, img, thumbnail, yearDebuted, description } = this.props.character;
        const year = yearDebuted.split(' ')[0];

        const regex = /(<([^>]+)>)/ig;
        const descriptionClean = description.replace(regex, '');

        return this.renderIOSItem(name, thumbnail, year, descriptionClean);

        // return Platform.OS === 'ios' ?
        //     this.renderIOSItem(name, img, year, descriptionClean)
        //     :
        //     this.renderAndroidItem(name, img, year, descriptionClean);
    }
}

/**
 * 
 *     renderAndroidItem(name, img, yearDebuted, description) {
        return (
            <TouchableWithoutFeedback delayPressIn={0} onPress={this.onRowPress.bind(this)} style={{marginTop:10}}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <TextNative h4>{name}</TextNative>
                    <View style={{ maxHeight: 50 }}>
                        <Text numberOfLines={2} style={{ marginTop: 5, fontFamily: 'Lato' }}>{description}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        );
    }
 *        
 *                             avatar={
                                <Avatar
                                    large
                                    rounded
                                    source={{ uri: img, cache: 'force-cache' }}
                                    overlayContainerStyle={{ marginTop: 0 }}
                                    resizeMethod="resize"
                                />
                            }
 * 
 *                             <Text numberOfLines={2} style={{ marginTop: 5 }}>{descriptionClean}</Text>

 * 
 *             <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <View style={styles.thumbnailContainerStyle}>
                            <Image
                                style={styles.thumbnailStyle}
                                source={{ uri: img }}
                            />
                        </View>
                        <View style={styles.nameContainerStyle}>
                            <Text style={styles.nameTextStyle}>{name}</Text>
                        </View>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>     
 * 
 * <Card containerStyle={{ padding: 0 }} >
                        <ListItem
                            key={name}
                            roundAvatar
                            title={name}
                            avatar={{ uri: img }}
                        />
                    </Card>
 * 
 * <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <View style={styles.thumbnailContainerStyle}>
                            <Image
                                style={styles.thumbnailStyle}
                                source={{ uri: img }}
                            />
                        </View>
                        <View style={styles.nameContainerStyle}>
                            <Text style={styles.nameTextStyle}>{name}</Text>
                        </View>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
 */


const styles = {
    thumbnailStyle: {
        height: 100,
        width: 100
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    nameContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: 1,
        flexWrap: 'wrap'
    },
    nameTextStyle: {
        fontSize: 25
    }
};

const mapStateToProps = state => {
    return {
        forceImageDataReload: state.forceImageDataReload
    };
};

export default connect(mapStateToProps)(ListItemCharacters);
