import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Page from './Page';
require('../../../Markup.Kassa/markup/stylus/style_kassa.styl');

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery-datetimepicker/build/jquery.datetimepicker.min.css' //костыль с дизайном
// import './drop.css'
// import 'react-select/dist/react-select.css';
// import './modal.css';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Page} />
    </Router>,
    document.getElementById('container')
);