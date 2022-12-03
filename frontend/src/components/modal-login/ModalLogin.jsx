import React, { useState, useContext } from 'react';
import axios from "axios";
import './ModalLogin.css';
import { AuthContext } from '../../contex';

const ModalLogin = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
      const headers = {
        'headers': {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      const formData = {
        username: username,
        password: password
      }
      try {
        const response = await axios.post('http://127.0.0.1:8000/login', formData, headers)
        const token = response.data.access_token
        localStorage.setItem("auth_token", token)
        setIsAuth(true)
        console.log(response.data)
      } catch(e) {
        const status = e.response.status
        if (status === 404) {
          console.log('user not defind')
        } else if (status === 400) {
          console.log('bad password')
        }
      }
    }

    return (
        <div className="modal fade" id="loginModal" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">SIGN IN</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <a href="#" className="steam_login text-uppercase">Sign in through steam</a>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-5">
                  <hr/>
                </div>
                <div className="col-2">
                  <span className="ms-3 mt-2">OR</span>
                </div>
                <div className="col-5">
                  <hr/>
                </div>
              </div>

              <form>
                <div className="mb-3">
                  <label className="col-form-label text-uppercase">username:</label>
                  <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control login-input shadow-none" id="recipient-name"/>
                </div>
                <div className="mb-3">
                  <label className="col-form-label text-uppercase">password:</label>
                  <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control login-input shadow-none" id="message-text"/>
                </div>
              </form>
              <div className="row">
                <div className="col-12">
                  <button onClick={login} type="button" className="btn btn-outline-success login-btn" aria-label="Close">Login</button>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <button type="button" className="btn btn-outline-info login-btn">Create an account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ModalLogin;