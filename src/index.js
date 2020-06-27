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
import thunk from 'redux-thunk';
import authReducer from './store/reducers/authR';

const composeEnhancers = process.env.REACT_APP_NODE_ENVX === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose; //348

const rootReducer = combineReducers({
    burgerBuilder: bbreducer,
    order: orderReducer,
    auth: authReducer,
})

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
    );

const app=(
    /* provider wraps BR */
    <Provider store={store}>  
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
