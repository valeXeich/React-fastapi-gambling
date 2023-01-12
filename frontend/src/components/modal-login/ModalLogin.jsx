import React, { useState, useContext } from 'react';
import './ModalLogin.css';
import { AuthContext } from '../../contex';
import AuthService from '../../API/AuthService';


const ModalLogin = () => {

    const {authData, setAuthData} = useContext(AuthContext);
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
     const response = await AuthService.login(formData, headers, setAuthData)
     setUsername('');
     setPassword('');
     if (!response.login) {
      setError(response.message)
     } else {
      document.querySelector('.btn-close').click()
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
      } else {
        document.querySelector('.btn-close').click()
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
              <div className="row mt-3">
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
                  <button onClick={login} type="button" className="btn btn-outline-success login-btn" aria-label="Close">Login</button>
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