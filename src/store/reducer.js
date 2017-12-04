const initialState = {
  secondsElapsed: 0,
  laps: [],
  currentInterval: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TIMER_START":
      return {
        ...state,
        secondsElapsed: state.secondsElapsed + 1,
      }
    case "TIMER_STOP":
      return {
        ...state,
        lastClearedInterval: action.lastClearedInterval
      }
      case "TIMER_RESET":
        return {
          ...state,
          secondsElapsed: 0,
          laps: []
        }
      case "TIMER_LAP":
        return {
          ...state,
          laps: [...state.laps].concat([state.secondsElapsed])
      }
      case "INTERVAL_CHANGE":
        return {
          ...state,
          currentInterval: action.currentInterval
        }
    default:
      return state;
  }
}

export default reducer;