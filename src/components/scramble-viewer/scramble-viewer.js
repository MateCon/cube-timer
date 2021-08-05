import React, { useState, useEffect } from 'react';
import { scrambler3x3 } from '../../helpers/scramblers';
import './scramble-viewer.scss';

const LENGTH_3X3 = 20;

const ScrambleViewer = () => {
    const [scramble, setScramble] = useState(scrambler3x3(LENGTH_3X3));

    return <div id='scramble-viewer'>
        <p>{scramble}</p>
    </div>;
}

export default ScrambleViewer;