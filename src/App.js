import React, { useState } from 'react';
import Stopwatch from './components/stopwatch/stopwatch';
import ScrambleViewer from './components/scramble-viewer/scramble-viewer';
import './App.css';

const App = () => {
  const [lastSolve, setLastSolve] = useState({});

  return (
    <div id="app">
      <ScrambleViewer
        lastSolve={lastSolve}
      />
      <Stopwatch
        setLastSolve={setLastSolve}
      />
    </div>
  );
}

export default App;