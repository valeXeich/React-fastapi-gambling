import React from 'react';
import { useState, useEffect  } from 'react';
import { Wheel } from 'react-custom-roulette'
import './Roulette.css'

const Roulette = () => {

  const [result, setVasya] = useState(10);

  const [mustSpin, setMustSpin] = useState(false);

  const ws = new WebSocket('ws://localhost:8000/roll');

  function sendMessage(event) {
    ws.send('start')
    console.log('send message')
  }

  ws.onmessage = (event) => {
    const roll = JSON.parse(event.data).result;
    setVasya(roll);
    console.log(`get message ${result}`);
    console.log(`get result ${roll}`);
  }
    
  const handleSpinClick = () => {
    sendMessage();
    // const newPrizeNumber = Math.floor(Math.random() * data.length);
    setMustSpin(true);
  };
    
  useEffect(() => {
    const interval = setInterval(() => {
        handleSpinClick();
    }, 25000);
  
    return () => clearInterval(interval);
  }, []);

    const data = [
        { option: '1', style: { backgroundColor: '#d4594c'}},
        { option: '14' , style: { backgroundColor: '#393939'}},
        { option: '2' , style: { backgroundColor: '#d4594c'}},
        { option: '13' , style: { backgroundColor: '#393939'}},
        { option: '3' , style: { backgroundColor: '#d4594c'}},
        { option: '12' , style: { backgroundColor: '#393939'}},
        { option: '4' , style: { backgroundColor: '#d4594c'}},
        { option: '0', style: { backgroundColor: '#5eb76e'}},
        { option: '11' , style: { backgroundColor: '#393939'}},
        { option: '5' , style: { backgroundColor: '#d4594c'}},
        { option: '10' , style: { backgroundColor: '#393939'}},
        { option: '6' , style: { backgroundColor: '#d4594c'}},
        { option: '9' , style: { backgroundColor: '#393939'}},
        { option: '7' , style: { backgroundColor: '#d4594c'}},
        { option: '8' , style: { backgroundColor: '#393939'}},
      ];

    return (
        <div className="roulette mb-2">
            <Wheel
            mustStartSpinning={mustSpin}
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
            setMustSpin(false);
            }}
        />
        </div>
    );
};

export default Roulette;