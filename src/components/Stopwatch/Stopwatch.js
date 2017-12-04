import React, { Component } from 'react';
import formattedTime from '../../utilities';
import { connect } from 'react-redux';

class Stopwatch extends Component {

  handleStartClick = () => {
    this.interval = setInterval(() => {
      this.props.onTimerStart()
    },1000)
  }

  handleStopClick = () => {
    clearInterval(this.interval);
    this.props.onTimerStop(this.interval);
  }

  handleResetClick = () => {
    this.props.onTimerReset();
  }

  handleLapClick = () => {
    this.props.onTimerLap()
  }

  formattedTime(sec) {
    const seconds = ('0' + sec % 60).slice(-2);
    const minutes = ("0" + Math.floor(sec / 60)).slice(-2);

    return minutes + ':' + seconds;
  }

  render () {
    let button = null,
        lapButton = null,
        resetButton = null

    if (this.props.secElapsed === 0 || this.interval === this.props.lastCleredInt) {
      button = <button type="button" onClick={this.handleStartClick}>Start</button>
    } else {
      button = <button type="button" onClick={this.handleStopClick}>Stop</button>
    }

    if (this.props.secElapsed !== 0 && this.interval !== this.props.lastCleredInt ) {
      lapButton = <button type="button" onClick={this.handleLapClick}>Lap</button>
    }

    if (this.props.secElapsed !== 0 && this.interval === this.props.lastCleredInt) {
      resetButton = <button type="button" onClick={this.handleResetClick}>Reset</button>
    }


    return (
      <div>
        <h2>Stopwatch</h2>
        <h3>{formattedTime(this.props.secElapsed)}</h3>
        {button}
        {resetButton}
        {lapButton}
        <ul>
          {this.props.laps.map((lap, i) => {
            return <li key={i}><strong>{i + 1}</strong>/ {formattedTime(lap)}</li>
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    secElapsed: state.secondsElapsed,
    lastCleredInt: state.lastClearedInterval,
    laps: state.laps
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTimerStart: () => dispatch({type:"TIMER_START"}),
    onTimerStop: (lastClearedInterval) => dispatch({type:"TIMER_STOP", lastClearedInterval: lastClearedInterval}),
    onTimerReset: () => dispatch({type:"TIMER_RESET"}),
    onTimerLap: () => dispatch({type:"TIMER_LAP"})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch);