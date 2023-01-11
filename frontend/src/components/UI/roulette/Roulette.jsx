import React from 'react';
import { Wheel } from 'react-custom-roulette'
import './Roulette.css'

const Roulette = ({result, data, spin, setStop}) => {

  console.log(spin, 'spin')

    return (
        <div className="roulette mb-2">
            <Wheel
            mustStartSpinning={spin}
            prizeNumber={result}
            data={data}
            outerBorderColor={'#1b1b1e'}
            outerBorderWidth={10}
            innerRadius={10}
            innerBorderColor={'#fcf4f3'}
            textColors={['#fcf4f3']}
            innerBorderWidth={5}
            radiusLineColor={'#e6e6eef2'}
            radiusLineWidth={0.5}
            onStopSpinning={() => {
            setStop();
            }}
        />
        </div>
    );
};

export default Roulette;