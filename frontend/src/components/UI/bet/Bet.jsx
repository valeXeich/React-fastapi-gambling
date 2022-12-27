import React, {useState} from 'react';
import './Bet.css';

const Bet = ({total, bets, color}) => {

    let res = bets.filter((e) => {
      return e.color === color
    })

    return (
        <div className="col-4 text-center">
                        <div className="all-bets">
                          
                          <div className="d-flex justify-content-between">
                            <i className="bi bi-person ms-2 total-people"><span className="text-white">{res.length}</span></i>
                            <span className="me-2 total-text">Total bet: <span className="text-white">{total}</span></span>
                          </div>

                          <div className="line"></div>
                          {res.map((bet, index) => (
                            <div key={index} className="person d-flex justify-content-between mt-2">
                            <div className="person-info ms-2 mb-3">
                              <img src={`${process.env.PUBLIC_URL}/avatar.jpg`} width="30" height="30" alt="" className="img-fluid rounded-circle"/>
                              <span className="name-color ms-1">{bet.username}</span>
                            </div>
                            <span className="person-bet me-2">{bet.bet}</span>
                          </div>
                          ))}
                        </div>
                      </div>
    );
};

export default Bet;