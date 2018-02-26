import React from 'react'
import ReactDOM from 'react-dom'
// import { Router, Route, browserHistory } from 'react-router'
import Page from './Page'
// console.log(__STYLES__)
// require(__STYLES__)
require(__STYLES__)
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery-datetimepicker/build/jquery.datetimepicker.min.css' //костыль с дизайном
// import './drop.css'
// import 'react-select/dist/react-select.css';
// import './modal.css';

ReactDOM.render(
    <Page/>,
    document.getElementById('container')
)
// <Router history={browserHistory}>
//   <Route path="/" component={Page} />
// </Router>
