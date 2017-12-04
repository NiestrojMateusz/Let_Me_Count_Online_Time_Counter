import React, { Component } from 'react';
import { connect } from 'react-redux';


import Button from '../Button/Button';

class Timer extends Component {

    handleButtons = (e) => {
      const btnType = e.target.innerText

      if (btnType === "Start") {
        this.interval = setInterval(() => {
          this.props.onTimerStart();
          this.props.onIntervalChange(this.interval);
        },1000)
      }

      if (btnType === "Stop") {
        clearInterval(this.interval);
        this.props.onTimerStop(this.interval);
      }

      if (btnType === "Reset") {
        this.props.onTimerReset();
      }

      if (btnType === "Lap") {
        this.props.onTimerLap();
      }
    }

   formattedTime = (sec) => {
    const seconds = ('0' + sec % 60).slice(-2);
    const minutes = ("0" + Math.floor(sec / 60)).slice(-2);

    return minutes + ':' + seconds;
  }

  render () {
    let buttons = this.props.btnTypes.split(" ");
    return (
     <div>
       <h3>{this.formattedTime(this.props.secElapsed)}</h3>
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
    currInt: state.currentInterval
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTimerStart: () => dispatch({type:"TIMER_START"}),
    onTimerStop: (lastClearedInterval) => dispatch({type:"TIMER_STOP", lastClearedInterval: lastClearedInterval}),
    onTimerReset: () => dispatch({type:"TIMER_RESET"}),
    onTimerLap: () => dispatch({type:"TIMER_LAP"}),
    onIntervalChange: (currentInterval) => dispatch({type:"INTERVAL_CHANGE", currentInterval: currentInterval})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
