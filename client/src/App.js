import React,{ useState, useEffect} from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Fridge from './components/Fridge'
import useSwitch from "./components/Mode";


function App() {
  const [pmode, togglePMode] = useSwitch()
  return (
    <div className="App">
      <button 
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
        }}
        onClick={() => togglePMode()}> {pmode ? 'Set to Light Mode' : 'Set to Dark Mode'}
      </button>
      <Router>
        <Route exact path="/">
          <SignUp />
        </Route>
        <Route path="/signIn">
          <SignIn />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/fridge">
          <Fridge />
        </Route>
      </Router>
    </div>
  );
}

export default App;
