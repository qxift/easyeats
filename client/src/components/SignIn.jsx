import { Container, Row, Col, Form, FormGroup, Label, Input, CardImg, Button } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import fridge_logo from './images/logo_title.png';
function SignIn({setCookie}) {

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

  const submitHandler = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:3000/signIn', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})
    })
    if (res.status == 200) {
      const user = await res.json()
      setCookie('name', username, { path: '/' });
      history.push('/fridge')
    } else if (res.status == 401) {
      setError("Incorrect password. Try again.")
    } else {
      setError("Username not found. Try again or sign up.")
    }
  }

  function clickHandler(e) {
    history.push('/signUp')
  }

  return (
    <div className="auth-form-container">
    <img src={fridge_logo} style={{width:310 , marginTop: -70, marginBottom: -40, paddingRight: 12}}/>
    <Form className="signup-form" onSubmit={submitHandler}>
      <label htmlFor="username">Username</label>
      <input onChange={changeUserHandler} className={"username"} type="text" placeholder="name" id="username" name="username" required/>
      
      <label htmlFor="password">Password</label>
      <input onChange={changePassHandler} className={"password"} type="password" placeholder="*******" id="password" name="password" required/>
      {error &&
      <label style={{color:"red"}}>
        {error}
      </label>}
      <button type="submit">Sign In</button>
    </Form>
    <button onClick={clickHandler} className="link-btn" >Don't have an account? Sign up here.</button>
    </div>
  );
}

export default SignIn
