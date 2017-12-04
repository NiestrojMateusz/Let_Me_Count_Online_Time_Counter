import React, { Component } from 'react';

class Timer extends Component {

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

   formattedTime = (sec) => {
    const seconds = ('0' + sec % 60).slice(-2);
    const minutes = ("0" + Math.floor(sec / 60)).slice(-2);

    return minutes + ':' + seconds;
  }

  render () {
    return ()
  }
}
export default Timer;
