const initialState = {
  secondsElapsed: 0,
  laps: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TIMER_START":
      return {
        ...state,
        secondsElapsed: state.secondsElapsed + 1
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
    default:
      return state;
  }
}

export default reducer;