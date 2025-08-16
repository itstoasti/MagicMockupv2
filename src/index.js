import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Global} from "@emotion/core";
import {styles} from "./styles";
import {MainApp} from "./components/layout";

ReactDOM.render(
    React.createElement(React.StrictMode, null,
        React.createElement(Global, {styles: styles()}),
        React.createElement(MainApp)
    ),
    document.getElementById('magic-mockup')
);

serviceWorker.register(); 