import { Container, Row, Col, Form, FormGroup, Label, Input, CardImg, Button } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom'

function SignIn() {

  const dispatch = useDispatch();
  const history = useHistory();   

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function changeUserHandler(e) {
    setUsername(e.target.value)
  }
  
  function changePassHandler(e) {
    setPassword(e.target.value)
  }

  function submitHandler(e) {
    e.preventDefault()
    fetch('http://localhost:3000/signIn', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})
    })
    .then(res => {
      console.log(res);
      if (res.status == 200) {
        history.push('/fridge')
      } else if (res.status == 401) {
        setError("Wrong password.")
      } else {
        setError("Username not found. Double check or sign up.")
      }
    })
  }

  function clickHandler(e) {
    history.push('/signUp')
  }

  return (
    <div className="auth-form-container">
    <h2>Sign In</h2>
    <Form className="signup-form" onSubmit={submitHandler}>
      <label htmlFor="username">Username</label>
      <input onChange={changeUserHandler} className={"username"} type="text" placeholder="name" id="username" name="username" required/>
      
      <label htmlFor="password">Password</label>
      <input onChange={changePassHandler} className={"password"} type="password" placeholder="*******" id="password" name="password" required/>
      {error &&
      <label style={{color:"red"}}>
        {error}
      </label>}
      <button type="submit">Sign in</button>
    </Form>
    <button onClick={clickHandler} className="link-btn" >Don't have an account? Sign up here.</button>
    </div>
  );
}

export default SignIn
