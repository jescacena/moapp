import React, { Component } from 'react';
import {
	Text, View, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight,
	Image, ImageBackground,
	Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { setAgeAselected } from '../actions';
import * as Constants from '../services/Constants';

class ListItemAges extends Component {

	onRowPress() {
		this.props.setAgeAselected(this.props.age);
		Actions.listCharacters({ age: this.props.age });
	}

	render() {
		const { name, img, period } = this.props.age;
		const { width } = Dimensions.get('window');

		return (

			<TouchableOpacity onPress={this.onRowPress.bind(this)} style={{ backgroundColor: Constants.PALETE_COLOR_BLUE_LOW }}>
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
								color={Constants.PALETE_COLOR_BLUE_LOW}
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
		// backgroundColor: Constants.PALETE_COLOR_BLACK_LOW,
		padding: 0
	},
	thumbnailStyle: {
		flex: 1,
		// backgroundColor: Constants.PALETE_COLOR_BLUE_LOW
	},
	thumbnailContainerStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 0,
		marginRight: 0,
		flex: 1,
		backgroundColor: Constants.PALETE_COLOR_BLUE_LOW,
	},
	headerTextStyle: {
		fontFamily: 'permanent-marker',
		fontSize: 25,
		backgroundColor: Constants.PALETE_COLOR_BLUE_LOW,
		color: Constants.PALETE_COLOR_LIGHT_GREY,
		paddingTop: 5,
		paddingLeft: 5
	},
	subHeaderTextStyle: {
		backgroundColor: Constants.PALETE_COLOR_BLUE_LOW,
		fontFamily: 'permanent-marker',
		color: Constants.PALETE_COLOR_LIGHT_GREY,
		paddingLeft: 5,
		paddingBottom: 5,

	}
};

export default connect(null, { setAgeAselected })(ListItemAges);
