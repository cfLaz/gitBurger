import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import bbreducer from './store/reducers/burgerBuilderR';
import orderReducer from './store/reducers/orderR';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducers/authR';
import createSagaMiddleware from 'redux-saga';
//import {logoutSaga} from './store/sagas/authS';
import {watchAuth, watchBB} from './store/sagas/indexS';


const composeEnhancers = (process.env.REACT_APP_NODE_ENVX === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : '') || compose; //348

const rootReducer = combineReducers({
    burgerBuilder: bbreducer,
    order: orderReducer,
    auth: authReducer,
})
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(ReduxThunk, sagaMiddleware)),
    );

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBB);

const app=(
    /* provider wraps BR, The <Provider /> makes the Redux store available to any nested components that have been wrapped in the connect() function*/
    <Provider store={store}>  
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
