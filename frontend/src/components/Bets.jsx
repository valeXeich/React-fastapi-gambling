import React from 'react';
import Bet from './UI/bet/Bet';

const Bets = ({totalRed, totalGreen, totalBlack, bets}) => {
    return (
        <div className="row mb-3">
            <Bet color={'red'} total={totalRed} bets={bets}/>
            <Bet color={'green'} total={totalGreen} bets={bets}/>
            <Bet color={'black'} total={totalBlack} bets={bets}/>
        </div>
    );
};

export default Bets;