import React from 'react';
import Stopwatch from './components/stopwatch/stopwatch';
import ScrambleViewer from './components/scramble-viewer/scramble-viewer';
import './App.css';

const App = () => {
  return (
    <div id="app">
      <ScrambleViewer />
      <Stopwatch />
    </div>
  );
}

export default App;