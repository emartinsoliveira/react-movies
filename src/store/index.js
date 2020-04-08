import { reducers } from '../reducers';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import multi from 'redux-multi';
import { createStore, applyMiddleware, compose } from 'redux';
import Reactotron from '../config/reactotronConfig';

const middlewares = applyMiddleware(multi, thunk, promise);
const store = createStore(
  reducers,
  compose(
    middlewares,
    Reactotron.createEnhancer()
  )
);

export default store;
