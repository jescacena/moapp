import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, StatusBar, ListView, View, Text, BackHandler, ActivityIndicator, Dimensions } from 'react-native';
import Modal from 'react-native-modalbox';
import { Button, Text as TextNative } from 'react-native-elements';
import { Container, Header, Content } from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';

import { agesFetch } from '../actions';
import { gaScreenView, gaScreenEvent, LOCAL_STORAGE_JSON_DIRECTORY, AGES_JSON_FILE } from '../services';

import ListItemAges from './ListItemAges';
import * as Constants from '../services/Constants';

class AgesList extends Component {

	state = {
		modalVisible: false
	};

	componentWillMount() {

		gaScreenView('AgesList');

		BackHandler.addEventListener('hardwareBackPress', () => {
			// this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
			// Typically you would use the navigator here to go to the last state.

			gaScreenView('Modal exit app');
			this.setModalVisible(true);
			// this.refs.modal2.open();
			return true;
			// BackHandler.exitApp();
		});
		//Get ages fileUri
		// const agesFileUri = _.find(this.props.downloadedData, (item) => {
		//     return item.key === 'ages';
		// }).data.uri;
		this.props.agesFetch(`${LOCAL_STORAGE_JSON_DIRECTORY}/${AGES_JSON_FILE}`);

		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);
	}

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}
	createDataSource({ ages }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(ages);
	}



	renderRow(ageKey) {
		if (this.props.ages && this.props.ages.length > 0) {
			const ageItem = _.find(this.props.ages, (item) => { return item.key === ageKey; });
			return <ListItemAges age={ageItem} />;
		}
		return (
			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
				<ActivityIndicator size="large" color={Constants.PALETE_COLOR_LIGHT_GREY} />
			</View>
		);
	}


	render() {
		const title = 'Ages';
		const { tileStyle, textStyle } = styles;
		return (
			<View style={{ flex: 1, backgroundColor: '#000000', marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight }}>

				<Container style={{ flex: 1, marginTop: 0, backgroundColor: Constants.PALETE_COLOR_BLACK }}>
					<Content style={{ flex: 1, margin: 0, backgroundColor: Constants.PALETE_COLOR_BLACK }}>
						<Grid style={{ flex: 1, margin: 0, backgroundColor: Constants.PALETE_COLOR_BLACK }}>
							<Row style={tileStyle}>
								{this.renderRow('goldenAge')}
							</Row>
							<Row style={tileStyle}>
								{this.renderRow('sixties')}
							</Row>
							<Row style={tileStyle}>
								{this.renderRow('seventies')}
							</Row>
							<Row style={tileStyle}>
								{this.renderRow('eighties')}
							</Row>
						</Grid>
					</Content>
				</Container>

				<Modal
					style={{ justifyContent: 'center', alignItems: 'center', height: 150, width: 300, backgroundColor: Constants.PALETE_COLOR_RED }}
					backdrop={false}
					position={'center'}
					ref={'modal3'}
					isOpen={this.state.modalVisible}
				>
					<TextNative h5>Exit Marvel Oldies App?</TextNative>
					<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>

						<Button
							onPress={() => { BackHandler.exitApp(); gaScreenEvent('Modal Exit app press'); }}
							fontFamily='Lato'
							backgroundColor={Constants.PALETE_COLOR_LIGHT_GREY}
							buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, width: 100 }}
							title='Yes'
							textStyle={{ color: Constants.PALETE_COLOR_BLACK }}
						/>
						<Button
							onPress={() => { this.setModalVisible(!this.state.modalVisible); gaScreenEvent('Modal continue press'); }}
							fontFamily='Lato'
							backgroundColor={Constants.PALETE_COLOR_LIGHT_GREY}
							buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, width: 100 }}
							title='No'
							textStyle={{ color: Constants.PALETE_COLOR_BLACK }}
						/>
					</View>
				</Modal>
			</View>

		);
	}
}

const mapStateToProps = state => {

	if (!_.isEmpty(state.ages)) {
		const agesArray = _.map(state.ages, (value, key) => {
			return { ...value, id: key };
		});
		return {
			downloadedData: state.downloadedData,
			ages: agesArray
		};

	}
	return {
		downloadedData: state.downloadedData,
		ages: []
	};
};


const styles = {
	tileStyle: {
		backgroundColor: Constants.PALETE_COLOR_RED,
		height: (Dimensions.get('window').height / 4) - 5,
		flex: 1
	},

	textStyle: {

	}
};

// export default AgesList;
export default connect(mapStateToProps, { agesFetch })(AgesList);
