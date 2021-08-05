import React, { useEffect, useState } from 'react';
import Stopwatch from './components/stopwatch/stopwatch';
import ScrambleViewer from './components/scramble-viewer/scramble-viewer';
import TimeViewer from './components/time-viewer/time-viewer';
import './App.css';

const App = () => {
  const [times, setTimes] = useState([]);
  const [lastSolve, setLastSolve] = useState({});

  useEffect(() => {
    console.table(times);
    if(lastSolve.time === undefined) return;
    setTimes([...times, lastSolve]);
  }, [lastSolve]);

  return (
    <div id="app">
      <ScrambleViewer
        lastSolve={lastSolve}
      />
      <TimeViewer 
        times={times}
      />
      <Stopwatch
        setLastSolve={setLastSolve}
      />
    </div>
  );
}

export default App;