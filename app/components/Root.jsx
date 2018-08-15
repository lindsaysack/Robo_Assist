import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import store from '../store';
import Navbar from './Navbar';
import AllBots from './AllBots';
import SingleBot from './SingleBot';
import HomePage from './HomePage';

export default class Main extends Component {
  render() {
    return (
      <Router>
        <div id="main" className="container-fluid">
          <div>
          <Navbar className="col-sm-2"/>
          </div>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/bots" component={AllBots} />
          <Route exact path="/detail/:robo_id" component={SingleBot} />
        </div>
      </Router>
    );
  }
}
