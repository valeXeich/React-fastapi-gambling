import React, { useState, useContext } from 'react';
import './ModalLogin.css';
import { AuthContext } from '../../contex';
import AuthService from '../../API/AuthService';

const ModalLogin = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);
    const [error, setError] = useState('');
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
     const value = await AuthService.login(formData, headers)
     setIsAuth(value.login);
     setUsername('');
     setPassword('');
     if (value.status === 404) {
      setError('User not found')
     } else if (value.status === 400) {
      setError('Incorrect username or password')
     }
    }

    const createAccount = async () => {
      const formData = {
        username: username,
        password: password
      }
      const response = await AuthService.createAccount(formData)
      if (!response.created) {
        setError(response.message)
      }
      setUsername('');
      setPassword('');
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
                {error
                  ? <p className='text-danger'>{error}</p>
                  : null
                }
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
                  <button onClick={login} type="button" className="btn btn-outline-success login-btn" data-bs-dismiss="modal" aria-label="Close">Login</button>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <button onClick={createAccount} type="button" className="btn btn-outline-info login-btn">Create an account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ModalLogin;