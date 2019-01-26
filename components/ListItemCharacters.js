import React, { Component } from 'react';
import { ListItem, Avatar, Text as TextNative } from 'react-native-elements';
import _ from 'lodash';
import { Font } from 'expo';
import {
	Text, View, TouchableWithoutFeedback, TouchableOpacity,
	Image, StyleSheet, ActivityIndicator, Platform
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

// import { setScrollPositionCharacterList } from '../actions';

import { CardSection } from './common';
import latoRegularFont from '../assets/fonts/Lato-Regular.ttf';

import * as Constants from '../services/Constants';


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
			<TouchableOpacity onPress={this.onRowPress.bind(this)} style={{ backgroundColor: Constants.PALETE_COLOR_LIGHT_GREY }}>
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
							<ActivityIndicator size="large" color={Constants.PALETE_COLOR_BLUE} />
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

	}
}

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
