import React from "react";
import ReactDOM from "react-dom";
import RoutedApp from "./App";
import { BrowserRouter } from "react-router-dom";
import configureStore from './store/store';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <RoutedApp />
        </BrowserRouter>
    </Provider>
    , document.getElementById("root"));