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
          <Route path="/interval" render={() => (
            <Interval
              defaultWorkDuration={60}
              defaultBreakDuration={10}
              defaultRounds={1}
              intervalTitle="Interval Timer"/>
          )}/>
          <Route path="/pomodoro" render={() => (
            <Interval
              defaultWorkDuration={25*60}
              defaultBreakDuration={5*60}
              defaultRounds={1}
              intervalTitle="Pomodoro Timer"/>
          )}/>
          <Route path="/stopwatch" component={Stopwatch} />
          <Route path="/countdown" component={Countdown} />
          <Route exact path="/" component={TimerChooser} />
        </Switch>
      </div>
    );
  }
}

export default App;
