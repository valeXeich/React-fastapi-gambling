import React from "react";
import "./BetPanel.css";

const BetPanel = () => {
  return (
    <div>
      <div className="bets d-flex">
        <div className="balance name-color p-3 mt-3 mb-3">Balance: 3.0$</div>
        <input
          type="text"
          placeholder="YOUR BET..."
          className="form-control ms-3 mt-3 shadow-none form-bet"
        />
      </div>
      <div className="row">
        <div className="col-4 text-center">
          <button className="btn btn-danger btn-bet">Red x2</button>
        </div>
        <div className="col-4 text-center">
          <button className="btn btn-success btn-bet">Green x14</button>
        </div>
        <div className="col-4 text-center">
          <button className="btn btn-dark btn-bet">Black x2</button>
        </div>
      </div>
      <div className="row mt-3 mb-3">
        <div className="col-4 text-center">
          <div className="my-total">0</div>
        </div>
        <div className="col-4 text-center">
          <div className="my-total">0</div>
        </div>
        <div className="col-4 text-center">
          <div className="my-total">0</div>
        </div>
      </div>
    </div>
  );
};

export default BetPanel;
