import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import TimerChooser from './components/TimerChooser/TimerChooser';
import Stopwatch from './components/Stopwatch/Stopwatch';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/stopwatch" component={Stopwatch} />
          <Route exact path="/" component={TimerChooser} />
        </Switch>
      </div>
    );
  }
}

export default App;
