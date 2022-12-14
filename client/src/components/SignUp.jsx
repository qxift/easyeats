import { Container, Row, Col, Form, FormGroup, Label, Input, CardImg, Button, FormText } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSwitch from './Mode'
import './SignUp.css';
import { useCookies } from 'react-cookie';
import fridge_logo from './images/logo_title.png';
//import React, {useState} from "react";

function SignUp({setCookie}){
  const [pmode, togglePMode] = useSwitch();
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
  e.preventDefault();  

  const res = await fetch('http://localhost:3000/signUp', {
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
    } else {
      setError("Username taken. Try another or sign in.")
    }
}

function clickHandler(e) {
  history.push('/signIn')
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

        <button type="submit">Sign Up</button>
    </Form>
     <button onClick={clickHandler} className="link-btn">Already have an account? Sign in here.</button>
     </div>
	)
}

export default SignUp;
