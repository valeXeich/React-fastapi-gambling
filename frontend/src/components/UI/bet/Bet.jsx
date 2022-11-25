import React from 'react';
import './Bet.css';

const Bet = () => {
    return (
        <div className="col-4 text-center">
                        <div className="all-bets">
                          
                          <div className="d-flex justify-content-between">
                            <i className="bi bi-person ms-2 total-people"><span className="text-white">6</span></i>
                            <span className="me-2 total-text">Total bet: <span className="text-white">6434</span></span>
                          </div>

                          <div className="line"></div>

                          <div className="person d-flex justify-content-between mt-2">
                            <div className="person-info ms-2 mb-3">
                              <img src="img/avatar.jpg" width="30" height="30" alt="" className="img-fluid rounded-circle"/>
                              <span className="name-color ms-1">valex</span>
                            </div>
                            <span className="person-bet me-2">500</span>
                          </div>
                          
                        </div>
                      </div>
    );
};

export default Bet;