import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	ListView, View, ScrollView, Text,
	ImageBackground, Platform, StatusBar, Image, Dimensions
} from 'react-native';
import { Header, Text as TextNative, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Asset, AppLoading } from 'expo';
import Modal from 'react-native-modalbox';


import { charactersFetch, setScrollPositionCharacterList } from '../actions';
import { gaScreenView, gaScreenEvent, getMarvelPortraitSmallImage } from '../services';

// import { Header } from './common';
import ListItemCharacters from './ListItemCharacters';
import CharacterDetail from './CharacterDetail';
import splashImage from '../assets/img/logoV2.png';
import * as Constants from '../services/Constants';



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

	constructor(props) {
		super(props);
		this.state = {
			isReady: false,
			scrollPosition: 0,
			modalVisible: false,
			character: null
		};
	}

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
			this.loadAssetsAsync(nextProps.characters);
		}

		this.createDataSource(nextProps);
	}

	componentDidMount() {
	}



	createDataSource({ characters }) {

		characters = _.sortBy(characters, [function (o) { return o.name; }]);

		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(characters);
	}

	async loadAssetsAsync(characters) {
		const imgArray = _.map(characters, (item) => { return item.img; });
		if (this.props.forceImageDataReload) {
			await Promise.all([...imgArray]);
		} else {
			const imageAssets = cacheImages(imgArray);
			await Promise.all([...imageAssets]);
		}
		// const fontAssets = cacheFonts([FontAwesome.font]);

	}

	onPressCallback(character) {
		this.setState({ modalVisible: true, character: character });

		//Save scroll position on redux state 
		//this.props.setScrollPositionCharacterList(this.state.scrollPosition);

	}

	getCharacterDetailComponent() {
		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={{ flex: 1 }}>
					<CharacterDetail character={this.state.character} modalView={true} />
				</ScrollView>
			</View>
		);

	}

	renderRow(character) {
		return <ListItemCharacters character={character} onPressCallback={this.onPressCallback.bind(this)} />;
	}

	handleScroll(event) {
		// this.yOffset=  event.nativeEvent.contentOffset.y;

		// if(event.nativeEvent.contentOffset.y !== 0) {
		//     this.setState({ scrollPosition: event.nativeEvent.contentOffset.y });
		// }

	}

	onModalClose() {
		this.setState({ modalVisible: false });
	}

	render() {
		if (!this.state.isReady) {
			return (
				<AppLoading
					startAsync={this.loadAssetsAsync.bind(this)}
					onFinish={() => { this.setState({ isReady: true }); }}
					onError={console.warn}
				/>
			);
		}

		const title = this.props.age.name;
		return (
			<View style={{ flex: 1 }}>
				<View style={{ flex: 1, backgroundColor: Constants.PALETE_COLOR_BLUE, marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight }}>
					<Header
						backgroundColor={Constants.PALETE_COLOR_BLUE}
						outerContainerStyles={{ height: 55 }}
						statusBarProps={{ barStyle: 'light-content' }}
						rightComponent={
							<View
								style={{
									width: 100,
									marginTop: 10,
									marginRight: 5,
									flexDirection: 'row',
									justifyContent: 'flex-end',
									alignItems: 'flex-end'
								}}>
								<ImageBackground
									resizeMode='contain'
									style={{ flex: 1, height: 40, position: 'relative', top: 7, left: 35 }}
									source={splashImage}
								/>
							</View>
						}
						centerComponent={
							<Text
								style={{
									color: Constants.PALETE_COLOR_LIGHT_GREY,
									fontSize: 22,
									fontFamily: 'permanent-marker',
									marginTop: -5,
									marginLeft: 30
								}}
							>
								{title}
							</Text>

						}
						leftComponent={{
							icon: 'home',
							color: Constants.PALETE_COLOR_LIGHT_GREY,
							style: {
								marginTop: 40,
								padding: 0,
							},
							onPress: () => { Actions.listAges(); gaScreenEvent('home click', 'agesList'); }
						}}
					/>
					<ScrollView
						scrollEventThrottle={16}
						onScroll={this.handleScroll.bind(this)}
						ref={(ref) => this.myScroll = ref}>
						<ListView
							pageSize={5}
							style={{ backgroundColor: Constants.PALETE_COLOR_LIGHT_GREY }}
							enableEmptySections
							dataSource={this.dataSource}
							renderRow={this.renderRow.bind(this)}

						/>
					</ScrollView>


				</View>

				<Modal
					style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, width: Dimensions.get('window').width, backgroundColor: Constants.PALETE_COLOR_BLUE }}
					backdrop={false}
					coverScreen={true}
					swipeToClose={true}
					swipeArea={20}
					backButtonClose={true}
					position={'center'}
					ref={'modalCharacterDetail'}
					isOpen={this.state.modalVisible}
					onClosed={this.onModalClose.bind(this)}
				>
					<Header
						backgroundColor={Constants.PALETE_COLOR_BLUE}
						outerContainerStyles={{ height: 55, width: (Dimensions.get('window').width) }}
						statusBarProps={{ barStyle: 'light-content' }}
						leftComponent={
							{
								icon: 'chevron-left',
								size: 25,
								type: 'font-awesomwe',
								color: Constants.PALETE_COLOR_LIGHT_GREY,
								iconStyle: {
									top: Platform.OS === 'ios' ? 10 : 0
								},
								onPress: () => {
									this.setState({ modalVisible: false });
								}
							}
						}
						rightComponent={
							<View style={{ width: 100, marginTop: 0, flex: 1 }}>
								<ImageBackground
									resizeMode='contain'
									style={{ flex: 1, height: 30, marginTop: 0, marginLeft: 0 }}
									source={splashImage}
								/>
							</View>
						}
					/>

					{this.getCharacterDetailComponent()}
				</Modal>
			</View >

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
		// });
		return {
			downloadedData: state.downloadedData,
			forceImageDataReload: state.forceImageDataReload,
			scrollPositionCharacterList: state.scrollPositionCharacterList,
			characters: charactersArray
		};
	}
	return {
		downloadedData: state.downloadedData,
		forceImageDataReload: state.forceImageDataReload,
		scrollPositionCharacterList: state.scrollPositionCharacterList,
		characters: []
	};
};

export default connect(mapStateToProps, {
	charactersFetch,
	setScrollPositionCharacterList
})(CharactersList);
