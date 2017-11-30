import React from 'react';
import { Link } from 'react-router-dom';

const TimerChooser = (props) => (
  <div>
    <h1>Let Me Count!</h1>
    <h2>Choose your counter...</h2>
    <ul>
      <li><Link to="/stopwatch">Stopwatch</Link></li>
      <li><Link to="/">Countdown</Link></li>
      <li><Link to="/">EMOM</Link></li>
      <li><Link to="/">Tabata</Link></li>
      <li><Link to="/">Interval</Link></li>
      <li><Link to="/">Pomodoro</Link></li>
    </ul>
  </div>
);
export default TimerChooser;