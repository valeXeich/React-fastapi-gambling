import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import Chat from './Chat';
import Roulette from './UI/roulette/Roulette';
import Bolls from './UI/bolls/Bolls';
import BetPanel from './UI/bet-panel/BetPanel';


import '../styles/Main.css';
import Bets from './Bets';
import { AuthContext } from '../contex';
import UserService from '../API/UserService';



const Main = () => {

    const {authData, setAuthData} = useContext(AuthContext);

    const data = [
        { option: 1, color: 'red', style: { backgroundColor: '#d4594c'}},
        { option: 14, color: 'black', style: { backgroundColor: '#393939'}},
        { option: 2, color: 'red', style: { backgroundColor: '#d4594c'}},
        { option: 13, color: 'black', style: { backgroundColor: '#393939'}},
        { option: 3, color: 'red', style: { backgroundColor: '#d4594c'}},
        { option: 12, color: 'black', style: { backgroundColor: '#393939'}},
        { option: 4, color: 'red', style: { backgroundColor: '#d4594c'}},
        { option: 0, color: 'green', style: { backgroundColor: '#5eb76e'}},
        { option: 11, color: 'black', style: { backgroundColor: '#393939'}},
        { option: 5, color: 'red', style: { backgroundColor: '#d4594c'}},
        { option: 10, color: 'black', style: { backgroundColor: '#393939'}},
        { option: 6, color: 'red', style: { backgroundColor: '#d4594c'}},
        { option: 9, color: 'black', style: { backgroundColor: '#393939'}},
        { option: 7, color: 'red', style: { backgroundColor: '#d4594c'}},
        { option: 8, color: 'black', style: { backgroundColor: '#393939'}},
      ];

    const [result, setResult] = useState(1);

    const [results, setResults] = useState([]);

    const [totalRed, setTotalRed] = useState(0)

    const [totalGreen, setTotalGreen] = useState(0)
  
    const [totalBlack, setTotalBlack] = useState(0)

    const [accessBet, setAccessBet] = useState(true)

    const [balance, setBalance] = useState(0)

    const [bets, setBets] = useState([])

    const [spin, setSpin] = useState(false)

    const socket = useRef()

  if (authData.auth) {
    UserService.getUserBalance(setBalance)
  }

  console.log(authData)

  const setStop = () => {
    setSpin(false)
    setResults((results) => [data[result], ...results.slice(0, 4)])
    setAccessBet(true)
    setBets([])
    setTotalRed(0)
    setTotalGreen(0)
    setTotalBlack(0)
    changeBalance()
  }

  const filterBets = (color) => {
    const filteredBets = bets.filter((bet) => {
      return bet.username === authData.user.username && bet.color === color
    })
    const sumOfBets = filteredBets.reduce((a, b) => {
      return a + b['bet']
    }, 0)
    return sumOfBets
  }

  const changeBalance = () => {
    const myTotalRed = filterBets('red')
    const myTotalGreen = filterBets('green')
    const myTotalBlack = filterBets('black')
    const victoryColor = data[result].color
    let totalLost = 0
    if (victoryColor === 'red') {
      setBalance(balance + (myTotalRed * 2))
      totalLost = myTotalBlack + myTotalGreen
    } else if (victoryColor === 'green') {
      setBalance(balance + (myTotalGreen * 14))
      totalLost = myTotalRed + myTotalBlack
    } else {
      setBalance(balance + (myTotalBlack * 2))
      totalLost = myTotalRed + myTotalGreen
    }
    if (myTotalBlack || myTotalGreen || myTotalRed) {
      console.log('bet')
    }
  }

  useEffect(() => {

    socket.current = new WebSocket('ws://localhost:8000/roll')

    socket.current.onopen = () => {
      console.log('Connect roulette')
    }

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data).result
      data.map((res, index) => {
        if (res.option === message) {
          setResult(index)
          setSpin(true)
          setAccessBet(false)
        }
      })

      console.log(message, 'message')
    }

    socket.current.onclose = () => {
      console.log('Roulette socket closed')
    }

    socket.current.onerror = () => {
      console.log('Roulette socket get some error')
    }

    return () => socket.current.close();
  }, [])

    return (
        <main className="main mt-3 ms-4 me-5">
            <div className="row">
                <div className="col-4">
                    <Chat/>
                </div>
                <div className="col-8 roll">
                    <div className="progress mt-3"></div>
                    <Roulette result={result} data={data} spin={spin} setStop={setStop}/>
                    <Bolls results={results}/>
                    <BetPanel 
                      totalRed={totalRed} 
                      setTotalRed={setTotalRed}
                      totalGreen={totalGreen}
                      setTotalGreen={setTotalGreen}
                      totalBlack={totalBlack}
                      setTotalBlack={setTotalBlack}
                      setBets={setBets}
                      accessBet={accessBet}
                      balance={balance}
                      setBalance={setBalance}
                      filterBets={filterBets}
                    />
                    <Bets
                      totalRed={totalRed}
                      totalGreen={totalGreen}
                      totalBlack={totalBlack}
                      bets={bets}
                    />
                </div>
            </div>
        </main>
    );
};

export default Main;