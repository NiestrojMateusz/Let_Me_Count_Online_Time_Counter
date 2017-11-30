import React, { Component } from 'react';

class Stopwatch extends Component {

  state = {
    secondsElapsed: 0
  }

  getSeconds = () => {
    return ("0" + this.state.secondsElapsed % 60).slice(-2);
  }

  getMinutes = () => {
    return ("0" + Math.floor(this.state.secondsElapsed / 60)).slice(-2);
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
  }

  render () {
    return (
      <div>
        <h2>Stopwatch</h2>
        <h3>{this.getMinutes()}:{this.getSeconds()}</h3>
        <button type="button" onClick={this.handleStartClick}>Start</button>
        <button type="button" onClick={this.handleStopClick}>Stop</button>
      </div>
    )
  }
}
export default Stopwatch;