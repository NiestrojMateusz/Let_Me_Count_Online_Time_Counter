import React, { Component } from 'react';
import { connect } from 'react-redux';


import Button from '../Button/Button';

var audioTick = new Audio('http://soundbible.com/mp3/Tick-DeepFrozenApps-397275646.mp3');
var alarm = new Audio('http://soundbible.com/mp3/Ship_Bell-Mike_Koenig-1911209136.mp3');

class Timer extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.isRunning !== nextProps.isRunning) {

     if (!this.props.countdown) {
        if (!nextProps.isRunning && nextProps.secElapsed === 0 ) {
          this.buttons = "Start";
        }

        if (nextProps.secElapsed !== 0 && this.props.currInt !== nextProps.lastClearedInt ) {
          this.buttons = "Stop Lap";
        }

        if (!nextProps.isRunning && nextProps.secElapsed !== 0) {
          this.buttons = "Start Reset";
        }
      } else {
          if (nextProps.secElapsed !== 0 && this.props.currInt !== nextProps.lastClearedInt ) {
              this.buttons = "Stop Reset";
          }

          if (!nextProps.isRunning) {
            alarm.play();
            this.buttons = "Start Reset";
          }


      }
    }
  }

  handleButtons = (e) => {
    const btnType = e.target.innerText

    if (btnType === "Start") {
      this.interval = setInterval(() => {
        if (this.props.countdown) {
          this.props.onCountdownStart();
        } else {
          this.props.onTimerStart();
        }



        this.props.onIntervalChange(this.interval);
      },1000)
    }

    if (btnType === "Stop" || btnType === "Pause") {
      clearInterval(this.interval);
      this.props.onTimerStop(this.interval);
    }

    if (btnType === "Reset") {
      this.props.onTimerReset();
      if (!this.props.isRunning) {
        this.buttons = "Start"
      }
    }

    if (btnType === "Lap") {
      this.props.onTimerLap();
    }
  }

  formattedTime = (sec) => {
    sec = parseInt(sec, 10);
    const seconds = ('0' + sec % 60).slice(-2);
    const minutes = ("0" + Math.floor(sec / 60)).slice(-2);

    return minutes + ':' + seconds;
  }

  buttons = "Start";

  render () {
    if (this.props.isRunning && this.props.countdown && this.props.secElapsed <= 3 && this.props.secElapsed > 0) {
      audioTick.play();
    }

    let buttons = this.buttons.split(" ");
    return (
     <div>
       <h3>{this.formattedTime(this.props.setTime)}</h3>
       {buttons.map(btn => (
           <Button key={btn} clicked={(btn) => this.handleButtons(btn)}>{btn}</Button>
       ))}
     </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    secElapsed: state.secondsElapsed,
    lastCleredInt: state.lastClearedInterval,
    laps: state.laps,
    currInt: state.currentInterval,
    countdown: state.countdown,
    isRunning: state.isRunning
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTimerStart: () => dispatch({type:"TIMER_START"}),
    onTimerStop: (lastClearedInterval) => dispatch({type:"TIMER_STOP", lastClearedInterval: lastClearedInterval}),
    onTimerReset: () => dispatch({type:"TIMER_RESET"}),
    onTimerLap: () => dispatch({type:"TIMER_LAP"}),
    onIntervalChange: (currentInterval) => dispatch({type:"INTERVAL_CHANGE", currentInterval: currentInterval}),
    onCountdownStart: () => dispatch({type:"COUNTDOWN_START"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
