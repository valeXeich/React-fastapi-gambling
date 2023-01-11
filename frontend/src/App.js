import axios from 'axios';
import { useState, useEffect } from 'react';
import AuthService from './API/AuthService';
import Main from './components/Main';
import Navbar from './components/UI/navbar/Navbar';
import {AuthContext} from './contex';
import './styles/App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import DepositWinsdraw from './components/DepositWinsdraw';


function App() {

  const [authData, setAuthData] = useState({auth: false});

  const token = localStorage.getItem('auth_token')

  const checkAuth = async () => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
      const data = await AuthService.getActiveUser()
      setAuthData({auth: true, user: data})
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])
  

  return (
    <div className="App">
      <AuthContext.Provider value={{
        authData,
        setAuthData
      }}>
        <BrowserRouter>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/deposit-withdraw" element={<DepositWinsdraw/>}/>
      </Routes>
      </BrowserRouter>

      </AuthContext.Provider>
    </div>
  );
}

export default App;
