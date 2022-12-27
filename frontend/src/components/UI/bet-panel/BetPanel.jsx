import React, {useRef, useEffect, useState, useContext} from "react";
import { AuthContext } from "../../../contex";
import "./BetPanel.css";

const BetPanel = ({
  totalRed, 
  setTotalRed, 
  totalGreen, 
  setTotalGreen, 
  totalBlack, 
  setTotalBlack, 
  setBets, 
  accessBet,
  balance,
  setBalance,
  filterBets
}) => {

  const {authData, setAuthData} = useContext(AuthContext);

  const [bet, setBet] = useState('')

  const socket = useRef();

  useEffect(() => {

    socket.current = new WebSocket('ws://localhost:8000/bet')

    socket.current.onopen = () => {
      console.log('Connect Bet')
    }

    socket.current.onclose = () => {
      console.log('Bet socket closed')
    }

    socket.current.onerror = () => {
      console.log('Bet socket get some error')
    }

    return () => socket.current.close();
  }, [])


  const sendMessage = (e) => {
    if (authData.auth && Number(bet) <= balance) {
      setBalance(balance - Number(bet))
      const message = {
        username: authData.user.username,
        bet: Number(bet),
        color: e.target.dataset.color
      }
      socket.current.send(JSON.stringify(message))
      socket.current.onmessage = (event) => {
        const message = JSON.parse(event.data)
        setBets((prev) => [message, ...prev])
        if (message.color === 'red') {
          setTotalRed(totalRed + message.bet)
        } else if (message.color === 'green') {
          setTotalGreen(totalGreen + message.bet)
        } else {
          setTotalBlack(totalBlack + message.bet)
        }

        console.log(message)
      }
      setBet('')
    }
  }

  return (
    <div>
      <div className="bets d-flex">
        <div className="balance name-color p-3 mt-3 mb-3">Balance: {balance}$</div>
        <input
          type="text"
          placeholder="YOUR BET..."
          className="form-control ms-3 mt-3 shadow-none form-bet"
          value={bet}
          onChange={e => setBet(e.target.value)}
        />
      </div>
      <div className="row">
        <div className="col-4 text-center">
          <button disabled={!accessBet} onClick={sendMessage} data-color='red' className="btn btn-danger btn-bet">Red x2</button>
        </div>
        <div className="col-4 text-center">
          <button disabled={!accessBet} onClick={sendMessage} data-color='green' className="btn btn-success btn-bet">Green x14</button>
        </div>
        <div className="col-4 text-center">
          <button disabled={!accessBet} onClick={sendMessage} data-color='black' className="btn btn-dark btn-bet">Black x2</button>
        </div>
      </div>
      <div className="row mt-3 mb-3">
        <div className="col-4 text-center">
          <div className="my-total">{filterBets('red')}</div>
        </div>
        <div className="col-4 text-center">
          <div className="my-total">{filterBets('green')}</div>
        </div>
        <div className="col-4 text-center">
          <div className="my-total">{filterBets('black')}</div>
        </div>
      </div>
    </div>
  );
};

export default BetPanel;
