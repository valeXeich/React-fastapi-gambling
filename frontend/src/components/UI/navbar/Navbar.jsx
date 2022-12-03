import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../contex';
import ModalLogin from '../../modal-login/ModalLogin';
import './Navbar.css';

const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    const get_user = async () => {
        const response = await axios.get('http://127.0.0.1:8000/user')
        console.log(response)
    }

    const logout = () => {
        localStorage.removeItem("auth_token");
        setIsAuth(false)
    }

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <img src={`${process.env.PUBLIC_URL}/logo.svg`} width="250" height="58" alt="" className="img-fluid"/>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav p-3">
                    <li className="nav-item">
                        <span className="nav-link ms-3" aria-current="page">Home</span >
                    </li>
                    <li className="nav-item">
                        <span  className="nav-link ms-3">Deposit</span >
                    </li>
                    <li className="nav-item">
                        <span  className="nav-link ms-3">Withdraw</span >
                    </li>
                    <li className="nav-item">
                        <span  className="nav-link ms-3">Contacts</span >
                    </li>
                </ul>
            </div>
            {isAuth
                ? <button onClick={logout} className="btn btn-outline-danger text-uppercase">logout</button>
                : <button data-bs-toggle="modal" data-bs-target="#loginModal" className="btn btn-outline-danger text-uppercase">sign in</button>
            }
            <ModalLogin/>
            </div>
        </nav>
    );
};

export default Navbar;