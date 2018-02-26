import 'babel-polyfill';
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Page from './Page'

require(__STYLES__)
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery-datetimepicker/build/jquery.datetimepicker.min.css' //костыль с дизайном
// import './drop.css'
// import 'react-select/dist/react-select.css';
// import './modal.css';

ReactDOM.render((
    <Router>
        <Route path="/" component={Page}/>
    </Router>
), document.getElementById('container'))
