import { BrowserRouter as Router, Route} from "react-router-dom";
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Fridge from './components/Fridge'

function App() {
  return (
    <div className="App">
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
