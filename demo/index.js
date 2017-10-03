import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Page from './Page';
import Select from './Select';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Page} />
        <Route path="/select" component={Select} />
    </Router>,
    document.getElementById('container')
);