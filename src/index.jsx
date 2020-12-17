import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';
import CustomThemeProvider from './_styles/theme/CustomThemeProvider'

import "./_styles/index.css";

render(

    <Provider store={store}>
        <CustomThemeProvider>
            <App />
        </CustomThemeProvider>
    </Provider>,
    document.getElementById('app')
);