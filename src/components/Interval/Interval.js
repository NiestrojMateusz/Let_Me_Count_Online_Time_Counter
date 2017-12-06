import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import Timer from '../Timer/Timer';
import { formatPickerVals} from '../../utilities'
import Aux from '../../hoc/Auxilary';



class Interval extends Component {

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    this.defaultsValues = {}
    for (let param of query.entries()) {
      this.defaultsValues[param[0]] = param[1];
    }
  }

  componentDidMount() {
    this.props.onIntervalMount(this.defaultsValues.workDuration,this.defaultsValues.breakDuration,this.defaultsValues.rounds);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.secElapsed === 0 && nextProps.numberOfRounds > 0 && !this.props.break) {
      this.props.onWorkEnds();
    }

    if (nextProps.secElapsed === 0 && nextProps.numberOfRounds > 0 && this.props.break) {
      this.roundCounter += 1
      this.props.onBreakEnds();
    }

    if (this.props.secElapsed === 0 && this.props.numberOfRounds === 0 && this.props.break) {
      this.roundCounter = 1;
      this.props.onIntervalEnds();
    }
  }

  handleRestValueChange = (value) => {
    let seconds = formatPickerVals(value);
    this.props.onBreakDurationChange(seconds);
  }

  handleWorkValueChange = (value) => {
    let seconds = formatPickerVals(value);
    this.props.onWorkDurationChange(seconds);
  }
  handleRoundsValueChange = (value) => {
    let rounds = formatPickerVals(value);
    this.props.onRoundChange(rounds)
  }
  roundCounter = 1;

  render () {
    let layout = null;
    if (!this.props.isRunning) {
      layout = (
        <Aux>
          <span>Work: </span><TimePicker
            // placeholder={formattedTime(this.props.defaultWorkDuration)}
            minuteStep={1} onChange={this.handleWorkValueChange}
            defaultValue={moment(`00:01:00`, "HH:mm:ss")}
            showHour={false} />
          <span>Rest</span><TimePicker defaultValue={moment("00:00:10", "HH:mm:ss")} minuteStep={1} onChange={this.handleRestValueChange} showHour={false}/>
          <span>Rounds</span><TimePicker defaultValue={moment("00:00:01", "HH:mm:ss")} minuteStep={1} onChange={this.handleRoundsValueChange} showHour={false} showMinute={false}/>
        </Aux>
      )
    } else {
      layout = (
        <Aux>
          <h2>Round {this.roundCounter}</h2>
          {this.props.break
            ? <h3>Break</h3>
            : <h3>Work!</h3>
          }
        </Aux>
      )
    }
    return (
      <div>
        <h2>{this.defaultsValues.title}</h2>
        {layout}
        <Timer setTime={this.props.secElapsed} />
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
    countFrom: state.countdownFrom,
    workDuration: state.workDuration,
    breakDuration: state.breakDuration,
    break: state.break,
    numberOfRounds: state.numberOfRounds,
    isRunning: state.isRunning
  }
}

const mapDispatchToPropos = dispatch => {
  return {
    onIntervalMount: (workDuration, breakDuration, numberOfRounds) => dispatch({type: "INTERVAL_MOUNT", workDuration: workDuration, breakDuration: breakDuration, numberOfRounds: numberOfRounds}),
    onWorkDurationChange: (value) => dispatch({type:"WORK_DURATION_CHANGE", workDuration: value}),
    onBreakDurationChange: (value) => dispatch({type:"BREAK_DURATION_CHANGE", breakDuration: value}),
    onRoundChange: (value) => dispatch({type:"ROUNDS_CHANGE", numberOfRounds: value}),
    onWorkEnds: () => dispatch({type: "WORK_ENDS"}),
    onBreakEnds: () => dispatch({type: "BREAK_ENDS"}),
    onIntervalEnds: () => dispatch({type: "INTERVAL_ENDS"})
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToPropos)(Interval));