import React, { useContext, useState } from 'react';
import AuthService from '../../../API/AuthService';
import { AuthContext } from '../../../contex';

const RightPanel = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    const [username, setUsername] = useState('');

    const logout = () => {
        localStorage.removeItem("auth_token");
        setIsAuth(false)
    }

    const getUserInfo = async () => {
        const user = await AuthService.getActiveUser()
        setUsername(user.username)
    }

    getUserInfo()

    return (
        <div>
            <img src={`${process.env.PUBLIC_URL}/avatar.jpg`} width="45" height="45" alt="" className="img-fluid rounded-circle"/>
            <span className='text-white ms-2'>{username}</span>
            <button onClick={logout} className="btn btn-outline-danger text-uppercase">logout</button>
        </div>
    );
};

export default RightPanel;