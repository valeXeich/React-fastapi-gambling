import React from 'react';

const Card = ({card, payMethod, select, method}) => {

    const chooseCard = () => {
        select(payMethod)
    }

    return (
        <div onClick={chooseCard} data-method={method} data-pay-method={payMethod} className='card'>
            <img src={card} className='img-fluid card-img'/>
        </div>
    );
};

export default Card;