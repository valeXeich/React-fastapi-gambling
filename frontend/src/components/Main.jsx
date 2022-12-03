import React from 'react';
import Chat from './Chat';
import Roulette from './UI/roulette/Roulette';
import Bolls from './UI/bolls/Bolls';
import BetPanel from './UI/bet-panel/BetPanel';


import '../styles/Main.css';
import Bets from './Bets';



const Main = () => {
    return (
        <main className="main mt-3 ms-4 me-5">
            <div className="row">
                <div className="col-4">
                    <Chat/>
                </div>
                <div className="col-8 roll">
                    <div className="progress mt-3"></div>
                    {/* <Roulette/> */}
                    <Bolls/>
                    <BetPanel/>
                    <Bets/>
                </div>
            </div>
        </main>
    );
};

export default Main;