import React from 'react';
import Boll from './Boll';
import './Boll.css';

const Bolls = ({results}) => {
    return (
        <div className='bolls d-flex text-white'>
           {results.map((res, index) => (
                <Boll number={res.option} color={res.style} key={index}/>
            ))}
        </div>
    );
};

export default Bolls;