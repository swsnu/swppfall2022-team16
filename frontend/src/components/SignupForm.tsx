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
