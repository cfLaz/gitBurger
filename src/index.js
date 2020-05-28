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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilder: bbreducer,
    order: orderReducer,
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
