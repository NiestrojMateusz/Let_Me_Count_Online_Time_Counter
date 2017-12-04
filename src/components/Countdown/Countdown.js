import React, { Component } from 'react';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';


class Countdown extends Component {
  state = {
    secondElapsed: 0,
    isRunning: false
  }

  render () {
    return (

      <TimePicker defaultValue={moment()} minuteStep={1} />

    )
  }
}
export default Countdown;