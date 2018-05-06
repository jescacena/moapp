import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue';
import { Font, AppLoading } from 'expo';
import permanentMarkerRegularFont from './assets/fonts/PermanentMarker-Regular.ttf';
import latoRegularFont from './assets/fonts/Lato-Regular.ttf';

// import mightyAvengersFont from './assets/fonts/The-Mighty-Avengers.ttf';
import reducers from './reducers';
import Router from './Router';

class App extends Component {

  async componentDidMount() {
    //MessageQueue.spy(true);
    await Font.loadAsync({
      'permanent-marker': permanentMarkerRegularFont,
      'Lato': latoRegularFont
    });
    // this.setState({ fontLoaded: true });
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    console.disableYellowBox = true;

    return (
      <Provider store={store}>
        <Router />
      </Provider>

    );
  }
}

export default App;

/**
      <AppLoading />
 *       
 */

