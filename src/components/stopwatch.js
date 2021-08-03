import React, { useState, useEffect } from 'react';
import useStopwatch from '../helpers/useStopwatch';
import useTimer from '../helpers/useTimer';

const Stopwatch = () => {
    const [{ minutes, seconds, hundredths, start, pause, reset, isRunning }] = useStopwatch({ autoStart: false });
    const [inspection] = useTimer();
    const [helperTimer] = useStopwatch({ autoStart: false });
    const [showInspection, setShowInspection] = useState(false);
    const [isSpacePressed, setIsSpacePressed] = useState(false);
    const [color, setColor] = useState('black');

    const handleKeyDown = event => {
        if(event.charCode === 32) {
            setIsSpacePressed(true);
        }
    }

    const handleKeyUp = event => {
        if(event.charCode === 0) {
            setIsSpacePressed(false);
        }
    }

    useEffect(() => {
        if(isSpacePressed) {
            console.log('press')
            if(!showInspection) {
                setShowInspection(true);
                setColor('green');
            } else {
                helperTimer.start();
                setColor('yellow');
            }
        } else {
            console.log('release')
            if(showInspection) {
                if(!inspection.isRunning) {
                    inspection.start();
                    setColor('red');
                } else {
                    if(color === 'green') {
                        console.log('Start! Wait what?');
                        setColor('black');
                        setShowInspection(false);
                        start();
                    } else {
                        setColor('red');
                        helperTimer.reset();
                    }
                }
            }
        }
    }, [isSpacePressed]);

    useEffect(() => {
        if(helperTimer.hundredths >= 30 && showInspection) {
            setColor('green');
        }
    }, [helperTimer]);
  
    return (
      <div id="stopwatch" onKeyPressCapture={handleKeyDown} onKeyUpCapture={handleKeyUp} tabIndex="0">
        <br></br>
        {
            showInspection
                ? <p style={{'color': color}}>{inspection.seconds}</p>
                : <p style={{'color': color}}>{`${minutes}:${seconds}.${hundredths}`}</p>
        }
      </div>
    );
  }
  
  export default Stopwatch;