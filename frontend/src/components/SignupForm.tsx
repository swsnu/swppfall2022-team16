import React, { useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'

/*eslint-disable */

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
    // <div className='Signup'>
    //   <div className='Signup'>
    //     <div className = "pageTitle"> Create Account </div>
    //     <div className = "name">
    //       <input id = "name" type = "name" onChange = {(e) => setName(e.target.value)}></input>
    //     </div>
    //     <div className = "email">
    //       <input id = "email" type = "email" onChange = {(e) => setEmail(e.target.value)}></input>
    //     </div>
    //     <div className = "password">
    //       <input id = "password" type = "password" onChange = {(e) => setPassword(e.target.value)}></input>
    //     </div>
    //     <div className = "height">
    //       <input id = "height" type = "height" onChange = {(e) => setHeight(e.target.value)}></input>
    //     </div>
    //     <div className = "weight">
    //       <input id = "weight" type = "weight" onChange = {(e) => setWeight(e.target.value)}></input>
    //     </div>
    //     <div className = "gender">
    //       Male
    //       <input id = "male" type = "radio" name = "gender" onChange = {(e) => setGender("male")}></input>
    //     </div>
    //     <div className = "gender">
    //       Female
    //       <input id = "female" type = "radio" name = "gender" onChange = {(e) => setGender("female")}></input>
    //     </div>
    //   </div>
    //   <button id = "login-button" onClick = {() => signupbuttonHandler()}>login</button>
    // </div>
  <div className='Signup'>
    <h1>Create Account</h1>
    <Form>
      <Form.Group className='nameForm'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='name' placeholder='Name' onChange = {(e) => setName(e.target.value)} />
      </Form.Group>
      <Form.Group className='emailForm'>
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' placeholder='Email Address' onChange = {(e) => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className='passwordForm'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' onChange = {(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Stack direction = "horizontal" gap = {3}>
      <Form.Group className='heightForm'>
        <Form.Label>Height</Form.Label>
        <Form.Control type='height' placeholder='Your height in cm' onChange = {(e) => setHeight(e.target.value)} />
      </Form.Group>
      <Form.Group className='weightForm'>
        <Form.Label>Weight</Form.Label>
        <Form.Control type='weight' placeholder='Your weight in kg' onChange = {(e) => setWeight(e.target.value)} />
      </Form.Group>
      </Stack>
      <Stack direction = "horizontal" gap = {5}>
      <Form.Group className='male'>
        <Stack direction = "horizontal" gap = {1}>
        <Form.Check type='radio' name = "gender" id = "gender1" onClick={(e) => setGender("Male")} checked />
        <Form.Label for = "gender1"> Male </Form.Label>
        </Stack>
      </Form.Group>
      <Form.Group className='female'>
        <Stack direction = "horizontal" gap = {1}>
        <Form.Check type='radio' name = "gender" id = "gender2" onClick={(e) => setGender("Female")}/> 
        <Form.Label for = "gender2"> Female </Form.Label>
        </Stack>
      </Form.Group>
      </Stack>
      <Button onClick = {() => signupbuttonHandler()}>Sign-up</Button>
    </Form>
  </div>
  );
}
