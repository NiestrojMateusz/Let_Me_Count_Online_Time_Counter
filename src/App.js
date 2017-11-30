import React, { Component } from 'react';

import TimerChooser from './components/TimerChooser/TimerChooser';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TimerChooser />
      </div>
    );
  }
}

export default App;
