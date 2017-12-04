import React from 'react';
import formattedTime from '../../utilities';
import { connect } from 'react-redux';
import Timer from '../Timer/Timer';

const Stopwatch = (props) => {

  let timer = null

  if (props.secElapsed === 0 || props.currInt === props.lastClearedInt) {
    timer = <Timer btnTypes="Start" />
  }

  if (props.secElapsed !== 0 && props.currInt !== props.lastClearedInt ) {
    timer = <Timer btnTypes="Stop Lap" />
  }

  if (props.secElapsed !== 0 && props.currInt === props.lastClearedInt) {
    timer = <Timer btnTypes="Start Reset" />
  }


  return (
    <div>
      <h2>Stopwatch</h2>
      {timer}
      <ul>
        {props.laps.map((lap, i) => {
          return <li key={i}><strong>{i + 1}</strong>/ {formattedTime(lap)}</li>
        })}
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    secElapsed: state.secondsElapsed,
    lastClearedInt: state.lastClearedInterval,
    laps: state.laps,
    currInt: state.currentInterval
  }
}

export default connect(mapStateToProps)(Stopwatch);