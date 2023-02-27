import React from 'react';
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter basename={'/'}>
		<App/>
	</BrowserRouter>,
	document.querySelector('#root')
);
