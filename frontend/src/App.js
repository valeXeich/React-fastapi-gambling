import axios from 'axios';
import { useState, useEffect } from 'react';
import AuthService from './API/AuthService';
import Main from './components/Main';
import Navbar from './components/UI/navbar/Navbar';
import {AuthContext} from './contex';
import './styles/App.css';

function App() {
  
  const [authData, setAuthData] = useState({auth: false});


  return (
    <div className="App">
      <AuthContext.Provider value={{
        authData,
        setAuthData
      }}>
        <Navbar/>
        <Main/>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
