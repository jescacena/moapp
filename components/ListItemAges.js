import React, { Component } from 'react';
import {
    Text, View, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight,
    Image, ImageBackground,
    Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { CardSection } from './common';

class ListItemAges extends Component {

    onRowPress() {
        console.log('JES age selected:', this.props.age);
        Actions.listCharacters({ age: this.props.age });
    }

    render() {
        const { name, img, period } = this.props.age;
        const { width } = Dimensions.get('window');
        // console.log('JES width', width);

        return (

            <TouchableOpacity onPress={this.onRowPress.bind(this)} style={{ backgroundColor: 'rgba(197, 0, 0, 0.3)' }}>
                <View style={styles.thumbnailContainerStyle}>

                    <ImageBackground
                        style={[styles.thumbnailStyle, { width }]}
                        source={{ uri: img, cache: 'force-cache' }}
                    >
                        <View style={[styles.headerOuterContainerStyles, { width }]}>
                            <View style={[styles.headerInnerContainerStyles, { width }]}>
                                <Text style={styles.headerTextStyle}>{name}</Text>
                                <Text style={styles.subHeaderTextStyle}>{period}</Text>

                            </View>
                            <Icon
                                name='chevron-small-right'
                                type='entypo'
                                color='#f1f1f1'
                                size={50}
                                containerStyle={{ marginTop: 5 }}
                            />
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>

        );
    }
}

const styles = {
    headerOuterContainerStyles: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-around'

    },
    headerInnerContainerStyles: {
        // flexDirection: 'column',
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        zIndex: 111,
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        padding: 5
    },
    thumbnailStyle: {
        flex: 1,
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 0,
        marginRight: 0,
        flex: 1,
        backgroundColor: 'rgba(197, 0, 0, 0.3)'
    },
    headerTextStyle: {
        fontFamily: 'permanent-marker',
        fontSize: 25,
        color: '#ffffff',
        // fontWeight: 'bold'
    },
    subHeaderTextStyle: {
        color: '#ffffff',
        fontWeight: 'bold'
    }
};

export default ListItemAges;


/**
 *             
 */
