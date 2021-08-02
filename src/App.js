import React from 'react';
import useStopwatch from './helpers/useStopwatch';
import './App.css';

const App = () => {
  const [minutes, seconds, hundreaths, start, pause, reset] = useStopwatch({ autoStart: false });

  return (
    <div className="App">
      {`${minutes}:${seconds}.${hundreaths}`}
      <button onClick={() => start()}>start</button> 
      <button onClick={() => pause()}>pause</button>
      <button onClick={() => reset()}>reset</button>
    </div>
  );
}

export default App;