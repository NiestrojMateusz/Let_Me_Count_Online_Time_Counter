const initialState = {
  secondsElapsed: 0,
  laps: [],
  currentInterval: 0,
  countdown: false,
  isRunning: false,
  isIntervalTimer: false,
  break: false,
  countdownFrom: 60,
  rounds: 1
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
          secElapsed = state.workDuration || state.countdownFrom || 60
        }
        return {
          ...state,
          secondsElapsed: secElapsed,
          laps: [],
          break: false,
          numberOfRounds: state.rounds
        }
      case "TIMER_LAP":
        return {
          ...state,
          laps: [...state.laps].concat([state.secondsElapsed])
      }
      case "INTERVAL_CHANGE":
        let currentInterval = action.currentInterval;
        let isRunning = true;

        if ( state.countdown && state.secondsElapsed <= 0 ) {
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
          isIntervalTimer: false,
          secondsElapsed: defaultCountdown
        }
      case "COUNTDOWN_START":
        return {
          ...state,
          secondsElapsed: state.secondsElapsed - 1,
          isRunning: true
        }
      case "INTERVAL_MOUNT":
        return {
          ...state,
          isIntervalTimer: true,
          countdown: true,
          secondsElapsed: action.workDuration,
          workDuration: action.workDuration,
          breakDuration: action.breakDuration,
          numberOfRounds: action.numberOfRounds
        }
      case "FINISHED_COUNT":
        return {
          ...state,
          isRunning: false
        }
      case "WORK_DURATION_CHANGE":
        return {
          ...state,
          workDuration: action.workDuration,
          secondsElapsed: action.workDuration
        }
      case "BREAK_DURATION_CHANGE":
        return {
          ...state,
          breakDuration: action.breakDuration
        }
      case "ROUNDS_CHANGE":
        return {
          ...state,
          numberOfRounds: action.numberOfRounds,
          rounds: action.numberOfRounds
        }
      case "WORK_ENDS":
        return {
          ...state,
          numberOfRounds: state.numberOfRounds - 1,
          isRunning: true,
          secondsElapsed: state.breakDuration,
          break: true
      }
      case "BREAK_ENDS":
        return {
          ...state,
          isRunning: true,
          secondsElapsed: state.workDuration,
          break: false
      }
      case "INTERVAL_ENDS":
        return {
          ...state,
          isRunning: false,
          secondsElapsed: state.workDuration,
          break: false
      }
    default:
      return state;
  }
}

export default reducer;



