import React, { useState, useEffect } from 'react';
import useStopwatch from '../../helpers/useStopwatch';
import useTimer from '../../helpers/useTimer';
import { format_time, format_inspection } from '../../helpers/helper-methods';
import './stopwatch-style.scss';

const Stopwatch = () => {
    const [{ minutes, seconds, hundredths, start, pause, reset, isRunning }] = useStopwatch({ autoStart: false });
    const [inspection] = useTimer();
    const [helperTimer] = useStopwatch({ autoStart: false });
    const [showInspection, setShowInspection] = useState(false);
    const [isSpacePressed, setIsSpacePressed] = useState(false);
    const [color, setColor] = useState('white');

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
            if(!showInspection) {
                if(!isRunning) {
                    setShowInspection(true);
                    inspection.reset();
                    setColor('green');
                } else {
                    pause();
                }
            } else {
                helperTimer.start();
                setColor('yellow');
            }
        } else {
            if(showInspection) {
                if(!inspection.isRunning) {
                    inspection.start();
                    setColor('red');
                } else {
                    if(color === 'green') {
                        setColor('white');
                        setShowInspection(false);
                        inspection.stop();
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
        if(helperTimer.hundredths >= 30 && showInspection && color !== 'red') {
            setColor('green');
        }
    }, [helperTimer.hundredths]);
  
    return (
      <div id="stopwatch" onKeyPressCapture={handleKeyDown} onKeyUpCapture={handleKeyUp} tabIndex="0">
        {
            showInspection
                ? <p style={{'color': color}}>{format_inspection(inspection.seconds)}</p>
                : <p style={{'color': color}}>{format_time(minutes, seconds, hundredths)}</p>
        }
      </div>
    );
  }
  
  export default Stopwatch;