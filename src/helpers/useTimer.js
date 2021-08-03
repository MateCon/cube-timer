import { useState, useEffect } from 'react';

const useTimer = ( initialLength = 15 ) => {
    const [length, setLength] = useState(initialLength);
    const [startDate, setStartDate] = useState(Date.now());
    const [seconds, setSeconds] = useState(initialLength);
    const [isRunning, setIsRunning] = useState(false);

    const start = () => {
        setStartDate(Date.now());
        setIsRunning(true);
    }

    useEffect(() => {
        if(seconds === 0) {
            setIsRunning(false);
        }
    }, [seconds]);

    useEffect(() => {
        setSeconds(length);
    }, [length]);

    useEffect(() => {
        if(isRunning) {
            let interval = setInterval(() => {
                var diff = Date.now() - startDate;
                setSeconds(initialLength - Math.floor(diff / 1000));
            }, 200);

            return (() => {
                clearInterval(interval);
            });
        }
    }, [isRunning]);

    return [{ seconds, isRunning, setLength, start }];
}

export default useTimer;