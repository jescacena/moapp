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
// import { Header } from './common';

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
            // console.log('JES renderRow-->this.props.ages-->', this.props.ages);
            // console.log('JES renderRow-->', ageItem);
            return <ListItemAges age={ageItem} />;
        }
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                <ActivityIndicator size="large" color="#F1F1F1" />
            </View>
        );
    }


    render() {
        const title = 'Ages';
        const { tileStyle, textStyle } = styles;
        return (
            <View style={{ flex: 1, backgroundColor: '#000000', marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight }}>

                <Container style={{ flex: 1, marginTop: 0, backgroundColor: '#000000' }}>
                    <Content style={{ flex: 1, margin: 0, backgroundColor: '#000000' }}>
                        <Grid style={{ flex: 1, margin: 0, backgroundColor: '#000000' }}>
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
                    style={{ justifyContent: 'center', alignItems: 'center', height: 150, width: 300, backgroundColor: '#C50000' }}
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
                            backgroundColor='#F1F1F1'
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, width: 100 }}
                            title='Yes'
                            textStyle={{ color: '#000000' }}
                        />
                        <Button
                            onPress={() => { this.setModalVisible(!this.state.modalVisible); gaScreenEvent('Modal continue press'); }}
                            fontFamily='Lato'
                            backgroundColor='#F1F1F1'
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, width: 100 }}
                            title='No'
                            textStyle={{ color: '#000000' }}
                        />
                    </View>
                </Modal>
            </View>

        );
    }
}

const mapStateToProps = state => {
    // console.log('JES mapStateToProps state:', state);

    if (!_.isEmpty(state.ages)) {
        const agesArray = _.map(state.ages, (value, key) => {
            return { ...value, id: key };
        });
        // console.log('JES mapStateToProps agesArray:', agesArray);
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
        backgroundColor: 'rgba(197, 0, 0, 0.8)',
        height: (Dimensions.get('window').height / 4) - 5,
        flex: 1
    },

    textStyle: {

    }
};

// export default AgesList;
export default connect(mapStateToProps, { agesFetch })(AgesList);


/**
 *     
 * 
 * 
                <Modal
                    animationType="fade"
                    transparent={false}
                    hardwareAccelerated
                    presentationStyle="formSheet"
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}
                >
                    <View style={{ marginTop: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', maxHeight: 200 }}>
                        <TextNative h4>Exit Marvel Oldies App?</TextNative>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                            <Button
                                icon={{ name: 'link' }}
                                onPress={() => { console.log('JES yessssss'); BackHandler.exitApp(); }}
                                fontFamily='Lato'
                                backgroundColor='#03A9F4'
                                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                title='Yes'
                            />
                            <Button
                                icon={{ name: 'link' }}
                                onPress={() => { console.log('JES nooooooo'); this.setModalVisible(!this.state.modalVisible); }}
                                fontFamily='Lato'
                                backgroundColor='#03A9F4'
                                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                title='No'
                            />
                        </View>
                    </View>
                </Modal>
 * 
 * 
 * {this.renderRow('goldenAge')}
 * 
 *             <Grid>
                <Col style={{ backgroundColor: '#635DB7', height: 200 }} />
                <Col style={{ backgroundColor: '#00CE9F', height: 200 }} />
              </Grid>
              
              
              render() {
        const title = 'Ages'; 
        return (
            <View>
                <Header headerText={title} />
                <ListView
                    style={{ backgroundColor: '#ffffff' }}
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </View>

        );
    }
 */