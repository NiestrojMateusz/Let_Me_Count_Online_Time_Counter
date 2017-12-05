import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import Timer from '../Timer/Timer';


class Interval extends Component {
  componentWillMount() {
    this.props.onIntervalMount();
  }

  handleRestValueChange = (value) => {

  }

  handleWorkValueChange = (value) => {

  }

  render () {

    return (
      <div>
        <h2>Interval Timer</h2>
        <span>Work: </span><TimePicker defaultValue={moment("00:01:00", "HH:mm:ss")} minuteStep={1} onChange={this.handleWorkValueChange} showHour={false} />
        <span>Rest</span><TimePicker defaultValue={moment("00:00:20", "HH:mm:ss")} minuteStep={1} onChange={this.handleRestValueChange} showHour={false} />
        <Timer btnTypes="Start" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    secElapsed: state.secondsElapsed,
    lastClearedInt: state.lastClearedInterval,
    laps: state.laps,
    currInt: state.currentInterval
  }
}

const mapDispatchToPropos = dispatch => {
  return {
    onIntervalMount: () => dispatch({type: "INTERVAL_MOUNT"})
  }
}

export default connect(mapStateToProps, mapDispatchToPropos)(Interval);