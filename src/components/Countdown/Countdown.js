import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import Timer from '../Timer/Timer';


class Countdown extends Component {

  componentWillMount() {
    this.props.onCountdownMount();
  }

  handleValueChange = (value) => {
    const [hours, minutes, seconds] = value.format('HH:mm:ss').split(':');
    const pickedSeconds = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    this.props.onTimePickerChange(pickedSeconds);
  }

  render () {
    let timer = null;
    if (!this.props.isRunning || this.props.currInt === this.props.lastClearedInt) {
      timer = <Timer btnTypes="Start" />
    }

    if (this.props.isRunning) {
      timer = <Timer btnTypes="Pause" />
    }

  if (this.props.secElapsed === 0 ||  this.props.currInt === this.props.lastClearedInt) {
    timer = <Timer btnTypes="Start Reset" />
  }

    return (
      <div>
        <h1>Countdown Timer</h1>
        <TimePicker defaultValue={moment("00:01:00", "HH:mm:ss")} minuteStep={1} onChange={this.handleValueChange} showHour={false} />
        {timer}
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    secElapsed: state.secondsElapsed,
    lastClearedInt: state.lastClearedInterval,
    laps: state.laps,
    currInt: state.currentInterval,
    isRunning: state.isRunning
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCountdownMount: (value) => dispatch({type:"COUNTDOWN_MOUNT", countdownFrom: value}),
    onTimePickerChange: (value) => dispatch({type:"TIME_PICKER_CHANGE", pickedTime: value})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);