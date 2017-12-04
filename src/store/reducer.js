const initialState = {
  secondsElapsed: 0,
  laps: [],
  currentInterval: 0,
  countdown: false,
  isRunning: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TIMER_START":
      return {
        ...state,
        secondsElapsed: state.secondsElapsed + 1,
        isRunning: true
      }
    case "TIMER_STOP":
      return {
        ...state,
        lastClearedInterval: action.lastClearedInterval,
        isRunning: false
      }
      case "TIMER_RESET":
        let secElapsed = 0;
        if (state.countdown) {
          secElapsed = state.countdownFrom || 60
        }
        return {
          ...state,
          secondsElapsed: secElapsed,
          laps: []
        }
      case "TIMER_LAP":
        return {
          ...state,
          laps: [...state.laps].concat([state.secondsElapsed])
      }
      case "INTERVAL_CHANGE":
        let currentInterval = action.currentInterval;
        let isRunning = true;

        if (state.countdown && state.secondsElapsed <= 0) {
          clearInterval(state.currentInterval);
          isRunning = false
        }
        return {
          ...state,
          currentInterval: currentInterval,
          isRunning: isRunning
        }
      case "TIME_PICKER_CHANGE":
        let pickedTime = null;
        pickedTime = action.pickedTime
        return {
          ...state,
          secondsElapsed: pickedTime,
          countdownFrom: pickedTime
        }
      case "COUNTDOWN_MOUNT":
        const defaultCountdown = 60
        return {
          ...state,
          countdown: true,
          secondsElapsed: defaultCountdown
        }
      case "COUNTDOWN_START":
        return {
          ...state,
          secondsElapsed: state.secondsElapsed - 1,
          isRunning: true
        }
    default:
      return state;
  }
}

export default reducer;