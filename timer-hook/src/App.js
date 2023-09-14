import React, {useState, useEffect, useReducer, useRef} from 'react';
import logo from './logo.svg';
import './App.css';

const useToggle = (initialBool) => useReducer((state, action) => action ? action : !state, initialBool);

const useTimer = (initialTime = 0, interval = 100) => {
  const [time, setTime] = useState(initialTime);
  const [timerState, toggleTimer] = useToggle(true);
  const [shouldReset, setShouldReset] = useState(false);
  const timeInterval = useRef();

  useEffect(() => {
    if (!timerState) {
      timeInterval.current = setInterval(() => {
        setTime(prevTime => prevTime + interval);
      }, interval);
    } else {
      if (timeInterval.current) {
        clearInterval(timeInterval.current);
        timeInterval.current = null;
      }
    }
  }, [timerState]);

  useEffect(() => {
    if (shouldReset) {
      if (timeInterval.current) {
        clearInterval(timeInterval.current);
        timeInterval.current = null;
      }

      setTime(initialTime);
      setShouldReset(false);
      toggleTimer(true);
    }
  }, [shouldReset]);

  return [time, timerState, toggleTimer, () => setShouldReset(true)];
}

function App() {
  const [currentTime, stopped, toggleTimer, reset] = useTimer(0, 100);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{display: "block", backgroundColor: "green"}} onClick={() => toggleTimer()}>{stopped ? 'Start' : 'Stop'}</div>
        <div style={{display: "block", backgroundColor: "red"}} onClick={() => reset()}>Reset</div>
        <p>
          Edit {currentTime / 1000} <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
