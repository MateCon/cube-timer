import React from 'react';
import './time-viewer-style.scss';

const TimeViewer = ({times}) => {
    const getTime = (time, penalty) => penalty === 'DNF' && penalty || penalty === '+2' && time + penalty || time;
    
    return <div id='time-viewer'>
        {
            times.map((data, index) => {
                return <div key={data.id}>
                    <div>{index + 1}</div>
                    <div>{getTime(data['time'], data['penalty'])}</div>
                </div>
            })
        }
    </div>
}

export default TimeViewer;