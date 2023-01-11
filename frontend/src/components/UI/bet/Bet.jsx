import React, {useState} from 'react';
import './Bet.css';

const Bet = ({bets, color}) => {

    let res = bets.filter((e) => {
      return e.color === color
    })

    let total = 0
    res.forEach(element => total += element.bet)

    return (
        <div className="col-4 text-center">
                        <div className="all-bets">
                          
                          <div className="d-flex justify-content-between">
                            <i className="bi bi-person ms-4 total-people"><span className="number-total">{res.length}</span></i>
                            <span className="me-4 total-text">Total bet: <span className="number-total">{total}</span></span>
                          </div>

                          <div className="line"></div>
                          {res.map((bet, index) => (
                            <div key={index} className="person d-flex justify-content-between mt-2">
                            <div className="person-info ms-2 mb-3">
                              <img src={`${process.env.PUBLIC_URL}/avatar.jpg`} width="30" height="30" alt="" className="img-fluid rounded-circle ms-2"/>
                              <span className="name-color ms-1">{bet.username}</span>
                            </div>
                            <span className="person-bet me-4 number-total">{bet.bet}</span>
                          </div>
                          ))}
                        </div>
                      </div>
    );
};

export default Bet;