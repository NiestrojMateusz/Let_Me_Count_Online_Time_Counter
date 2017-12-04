import React, { Component } from 'react';
import formattedTime from '../../utilities';

class Stopwatch extends Component {

  state = {
    secondsElapsed: 0,
    laps: []
  }

  handleStartClick = () => {
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        return {secondsElapsed: prevState.secondsElapsed + 1}
      })
    },1000)
  }

  handleStopClick = () => {
    clearInterval(this.interval);
    this.setState({lastClearedInterval: this.interval})
  }

  handleResetClick = () => {
    this.setState({secondsElapsed: 0, laps: []})
  }

  handleLapClick = () => {
    this.setState((prevState) => {
      return {laps: prevState.laps.concat([this.state.secondsElapsed])}
    });
    console.log(this.state.laps)
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

    if (this.state.secondsElapsed === 0 || this.interval === this.state.lastClearedInterval) {
      button = <button type="button" onClick={this.handleStartClick}>Start</button>
    } else {
      button = <button type="button" onClick={this.handleStopClick}>Stop</button>
    }

    if (this.state.secondsElapsed !== 0 && this.interval !== this.state.lastClearedInterval ) {
      lapButton = <button type="button" onClick={this.handleLapClick}>Lap</button>
    }

    if (this.state.secondsElapsed !== 0 && this.interval === this.state.lastClearedInterval) {
      resetButton = <button type="button" onClick={this.handleResetClick}>Reset</button>
    }


    return (
      <div>
        <h2>Stopwatch</h2>
        <h3>{formattedTime(this.state.secondsElapsed)}</h3>
        {button}
        {resetButton}
        {lapButton}
        <ul>
          {this.state.laps.map((lap, i) => {
            return <li key={i}><strong>{i + 1}</strong>/ {formattedTime(lap)}</li>
          })}
        </ul>
      </div>
    )
  }
}
export default Stopwatch;