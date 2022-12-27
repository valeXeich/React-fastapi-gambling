import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contex';

const RightPanel = () => {

    const {authData, setAuthData} = useContext(AuthContext);

    console.log(authData)

    const logout = () => {
        localStorage.removeItem("auth_token");
        setAuthData({auth: false})
    }

    return (
        <div>
            <img src={`${process.env.PUBLIC_URL}/avatar.jpg`} width="45" height="45" alt="" className="img-fluid rounded-circle"/>
            <span className='text-white ms-2'>{authData.user.username}</span>
            <button onClick={logout} className="btn btn-outline-danger text-uppercase">logout</button>
        </div>
    );
};

export default RightPanel;