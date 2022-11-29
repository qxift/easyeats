import React,{ useState, useEffect} from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Fridge from './components/Fridge'
import useSwitch from "./components/Mode";
import { useCookies } from 'react-cookie';


function App() {
  const [pmode, togglePMode] = useSwitch()
  const [cookies, setCookie, removeCookie] = useCookies(['name']);

  return (
    <div className="App">
      <button style={{
          position: 'absolute',
          top: '0px',
          right: '50px',
        }}
        onClick={() => removeCookie('name', cookies.Name, { path: '/' })}>Logout</button>
      {/* <button 
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
        }}
        onClick={() => togglePMode()}> {pmode ? 'Set to Light Mode' : 'Set to Dark Mode'}
      </button> */}
      <Router>
        <Route exact path="/" component={() => <Fridge cookies={cookies} />} />
        <Route exact path="/signIn" component={() => <SignIn setCookie={setCookie} />} />
        <Route exact path="/signUp" component={() => <SignUp setCookie={setCookie} />} />
        <Route exact path="/fridge" component={() => <Fridge cookies={cookies} />} />
      </Router>
    </div>
  );
}

export default App;
