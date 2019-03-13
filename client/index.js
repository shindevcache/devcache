import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app.jsx';
const path = require('path');
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/combine'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import styles from './css/index.css';
import ShinApp from './ShinApp.jsx'

const store = createStore(
                          rootReducer, 
                          composeWithDevTools(applyMiddleware(thunk))
                          );

render( // will change to render shinApp
        <Provider store={store}>
          <ShinApp />
        </Provider>, document.getElementById('root'));