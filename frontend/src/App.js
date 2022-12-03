import axios from 'axios';
import { useState } from 'react';
import Main from './components/Main';
import Navbar from './components/UI/navbar/Navbar';
import {AuthContext} from './contex';
import './styles/App.css';

function App() {

  let auth = false

  if (localStorage.getItem('auth_token')) {
    const token = localStorage.getItem('auth_token')
    axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
    auth = true
  }

  const [isAuth, setIsAuth] = useState(auth);

  return (
    <div className="App">
      <AuthContext.Provider value={{
        isAuth,
        setIsAuth
      }}>
        <Navbar/>
        <Main/>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
