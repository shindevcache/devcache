import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app.jsx';
const path = require('path');
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/combine'
import { createStore } from 'redux';
import styles from './css/index.css';

const store = createStore(
                          rootReducer, 
                          composeWithDevTools( )
                          );

render(
        <Provider store={store}>
          <App />
        </Provider>, document.getElementById('root'));