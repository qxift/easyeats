import { Container, Row, Col, Form, FormGroup, Label, Input, CardImg, Button, FormText } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SignUp.css';
//import React, {useState} from "react";

function SignUp(){

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
  e.preventDefault();  

  fetch('http://localhost:3000/signUp', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})
    })
    .then(res => {
      if (res.status == 200) {
        history.push('/fridge')
      } else {
        setError("Username already exists. Select other username or sign in.")
      }
    })
}

function clickHandler(e) {
  history.push('/signIn')
}
  return (
     <div className="auth-form-container">
      <h2>Sign Up</h2>
     <Form className="signup-form" onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input onChange={changeUserHandler} className={"username"} type="text" placeholder="name" id="username" name="username" required/>
        
        <label htmlFor="password">Password</label>
        <input onChange={changePassHandler} className={"password"} type="password" placeholder="*******" id="password" name="password" required/>
        {error &&
        <label style={{color:"red"}}>
          {error}
          
        </label>}
        <button type="submit">Sign up</button>
    </Form>
     <button onClick={clickHandler} className="link-btn">Already have an account? Sign in here.</button>
     </div>
	)
}

export default SignUp;
