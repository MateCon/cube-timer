import React from 'react';

const TimeViewer = times => {
    const getTime = (time, penalty) => penalty === 'DNF' && penalty || penalty === '+2' && time + penalty || penalty;

    return <div id='time-viewer'>
        {
            times.map((time, key) => {
                <div>
                    <div>{key}</div>
                    <div>{getTime(time.time, time.penalty)}</div>
                </div>
            })
        }
    </div>
}

export default TimeViewer;