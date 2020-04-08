/**
 * Desafio React
 *
 * @format
 * @flow
 */
import React from 'react';
import { Root } from 'native-base';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import GeneralStatusBarColor from './src/components/GeneralStatusBarColor';
import AppNavigator from './src/AppNavigator';
import store from './src/store';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <GeneralStatusBarColor backgroundColor="#000000" barStyle="light-content"/>
      <Root>
        <AppNavigator />
      </Root>
    </Provider>
  );
};

export default App;
