import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import TimerChooser from './components/TimerChooser/TimerChooser';
import Countdown from './components/Countdown/Countdown';
import Stopwatch from './components/Stopwatch/Stopwatch';
import Interval from './components/Interval/Interval';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/interval" component={Interval} />
          <Route path="/stopwatch" component={Stopwatch} />
          <Route path="/countdown" component={Countdown} />
          <Route exact path="/" component={TimerChooser} />
        </Switch>
      </div>
    );
  }
}

export default App;
