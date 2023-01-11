import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../contex';
import ModalLogin from '../../modal-login/ModalLogin';
import RightPanel from '../right-panel/RightPanel';
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {

    const {authData, setAuthData} = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <img src={`${process.env.PUBLIC_URL}/logo.svg`} width="250" height="58" alt="" className="img-fluid"/>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav p-3">
                    <li className="nav-item">
                        <Link to="/" className="nav-link ms-3">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/deposit-withdraw" className="nav-link ms-3">Deposit/Withdraw</Link>
                    </li>
                    <li className="nav-item">
                        <span  className="nav-link ms-3">Contacts</span >
                    </li>
                </ul>
            </div>
            {authData.auth
                ? <RightPanel/>
                : <button data-bs-toggle="modal" data-bs-target="#loginModal" className="btn btn-outline-danger text-uppercase">sign in</button>
            }
            <ModalLogin/>
            </div>
        </nav>
    );
};

export default Navbar;