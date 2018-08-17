import React from 'react';
import ReactDOM from 'react-dom';
import ReactSVG from 'react-svg';
import './index.css';
import logo from './logo.svg';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<ReactSVG svgClassName="App-logo" path={logo}/>, document.getElementById("logo-wrapper"));
registerServiceWorker();
