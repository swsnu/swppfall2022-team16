import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function SignupForm (): JSX.Element {
  const [name, setName] = useState('Full name');
  const [email, setEmail] = useState('Email Address');
  const [password, setPassword] = useState('Password');
  const [height, setHeight] = useState('Height');
  const [weight, setWeight] = useState('Weight');
  const [gender, setGender] = useState('Male');

  const signupbuttonHandler = () => {

  }

  return (
    <div className='Signup'>
      <div className='Signup'>
        <div className = "pageTitle"> Create Account </div>
        <div className = "name">
          <input id = "name" type = "name" onChange = {(e) => setName(e.target.value)}></input>
        </div>
        <div className = "email">
          <input id = "email" type = "email" onChange = {(e) => setEmail(e.target.value)}></input>
        </div>
        <div className = "password">
          <input id = "password" type = "password" onChange = {(e) => setPassword(e.target.value)}></input>
        </div>
        <div className = "height">
          <input id = "height" type = "height" onChange = {(e) => setHeight(e.target.value)}></input>
        </div>
        <div className = "weight">
          <input id = "weight" type = "weight" onChange = {(e) => setWeight(e.target.value)}></input>
        </div>
        <div className = "gender">
          Male
          <input id = "male" type = "radio" name = "gender" onChange = {(e) => setGender("male")}></input>
        </div>
        <div className = "gender">
          Female
          <input id = "female" type = "radio" name = "gender" onChange = {(e) => setGender("female")}></input>
        </div>
      </div>
      <button id = "login-button" onClick = {() => signupbuttonHandler()}>login</button>
    </div>
  )
}
