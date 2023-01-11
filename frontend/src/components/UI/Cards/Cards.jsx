import {useState, React} from 'react';
import Card from './Card';
import './Cards.css';

const Cards = ({method, setSelected}) => {

    const select = (methodPay) => {
        const cards = document.getElementsByClassName('card');
        setSelected(true);
        for (let card of cards) {
            const clickedCard = card.attributes['data-pay-method'].textContent
            const cardMethod = card.attributes['data-method'].textContent
            if (clickedCard === methodPay && cardMethod === method) {
                card.style.border = '1px solid #5EB76E';
            } else if (cardMethod === method) {
                card.style.border = 'none';
            }
        }
    }

    return (
        <div className="cards d-flex flex-wrap">
            <Card payMethod={'visa_mc'} select={select} method={method} card={`${process.env.PUBLIC_URL}/cards/visa_mc.png`}/>
            <Card payMethod={'ae'} select={select} method={method} card={`${process.env.PUBLIC_URL}/cards/ae.png`}/>
            <Card payMethod={'neteller'} select={select} method={method} card={`${process.env.PUBLIC_URL}/cards/neteller.png`}/>
            <Card payMethod={'paypal'} select={select} method={method} card={`${process.env.PUBLIC_URL}/cards/paypal.png`}/>
            <Card payMethod={'skrill'} select={select} method={method} card={`${process.env.PUBLIC_URL}/cards/skrill.png`}/>
        </div>
    );
};

export default Cards;