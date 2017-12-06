import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TimerChooser.module.css';

const TimerChooser = (props) => (
  <div className={styles.TimerChooser}>
    <h1>Let Me Count!</h1>
    <h2>Choose your counter...</h2>
    <ul>
      <li><Link to="/stopwatch">Stopwatch</Link></li>
      <li><Link to="/countdown">Countdown</Link></li>
      <li><Link to="/">EMOM</Link></li>
      <li><Link to="/">Tabata</Link></li>
      <li><Link to="/interval">Interval</Link></li>
      <li><Link to="/pomodoro">Pomodoro</Link></li>
    </ul>
  </div>
);
export default TimerChooser;