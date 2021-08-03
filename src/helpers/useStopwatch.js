import { useState, useEffect } from 'react';

const useStopwatch = ({ autoStart = false }) => {
    const [isRunning, setIsRunning] = useState(autoStart); 
    const [startDate, setStartDate] = useState(Date.now());
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [hundredths, setHundredths] = useState(0);

    const start = () => {
        setIsRunning(true);
        setStartDate(Date.now());
    }

    // TODO: move the starting date or use a stopwatch to keep track of pause length
    const pause = () => {
        setIsRunning(false);
    }

    const reset = () => {
        setIsRunning(false);
        setMinutes(0);
        setSeconds(0);
        setHundredths(0);
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if(isRunning) {
                var diff = Date.now() - startDate;
                const newTimes = { "hundredths": Math.floor(diff / 10)  };
    
                while(newTimes.hundredths > 100) {
                    newTimes.hundredths -= 100;
                }
    
                newTimes["seconds"] = Math.floor(diff / 1000); 
    
                while(newTimes.seconds > 60) {
                    newTimes.seconds -= 60;
                }
    
                newTimes["minutes"] = Math.floor(diff / 60000);  
    
                setMinutes(newTimes.minutes);
                setSeconds(newTimes.seconds);
                setHundredths(newTimes.hundredths);
            }
        }, 32);

        return (() => {
            clearInterval(interval);
        });
    }, [isRunning]);

    return [{ minutes, seconds, hundredths, start, pause, reset, isRunning }];
}

export default useStopwatch;