import React from 'react';
import Bet from './UI/bet/Bet';

const Bets = ({bets}) => {
    return (
        <div className="row mb-3">
            <Bet color={'red'} bets={bets}/>
            <Bet color={'green'} bets={bets}/>
            <Bet color={'black'} bets={bets}/>
        </div>
    );
};

export default Bets;