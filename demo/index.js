import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Page from './Page';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as dtp1 from 'jquery-datetimepicker/build/jquery.datetimepicker.min.css' //костыль с дизайном

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Page} />
    </Router>,
    document.getElementById('container')
);