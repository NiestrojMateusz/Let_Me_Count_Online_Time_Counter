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
      <li><Link to={{
        pathname: '/interval',
        search: `?workDuration=${20}&breakDuration=${10}&rounds=8&title=Pomodoro%20Timer`
      }}>Tabata</Link></li>
      <li><Link to={{
        pathname: '/interval',
        search: '?workDuration=60&breakDuration=20&rounds=1&title=Interval%20Timer'
      }}>Interval</Link></li>
      <li><Link to={{
        pathname: '/interval',
        search: `?workDuration=${25*60}&breakDuration=${5*60}&rounds=1&title=Pomodoro%20Timer`
      }}>Pomodoro</Link></li>
    </ul>
  </div>
);
export default TimerChooser;