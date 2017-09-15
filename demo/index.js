import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Page from './Page';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Page} />
    </Router>,
    document.getElementById('container')
);