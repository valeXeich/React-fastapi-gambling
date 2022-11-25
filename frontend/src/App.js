import { useState } from 'react';
import Main from './components/Main';
import Navbar from './components/UI/navbar/Navbar';
import {AuthContext} from './contex';
import './styles/App.css';

function App() {
  const [isAuth, setIsAuth] = useState(false);

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
