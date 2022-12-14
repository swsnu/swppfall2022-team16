/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../store'
import { signup } from '../store/slices/user'
import '../css/signupform.css'

export default function SignupForm (): JSX.Element {
  const [name, setName] = useState('Full name')
  const [email, setEmail] = useState('Email Address')
  const [password, setPassword] = useState('Password')
  const [height, setHeight] = useState('Height')
  const [weight, setWeight] = useState('Weight')
  const [gender, setGender] = useState('Male')

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  let alertMessage = ''

  const signupbuttonHandler = async (): Promise<void> => {
    if (handleSignUpFormSubmit()) {
      const result = await dispatch(signup({ username: email, password, nickname: name, height: Number(height), weight: Number(weight), gender }))
      if (result.type === `${signup.typePrefix}/fulfilled`) {
        navigate('/')
      }
    } else {
      return window.alert(alertMessage)
    }
  }

  const handleSignUpFormSubmit = (): boolean => {
    alertMessage = 'You must correct:\n\n'

    const nameValid = (name.match(/^[a-zA-Z]+$/) !== null)

    if (!nameValid) {
      alertMessage = alertMessage + 'Name :\nLetters must be alphabets \n'
    }

    const emailValid = (email.match(/^[^@\s]+@[^.@\s]+.[a-zA-Z]{2,3}$/) !== null)
    if (!emailValid) {
      alertMessage = alertMessage + 'Email :\nEmail must be xxx@example.com with one . \n'
    }

    const heightValid = (height.match(/^[0-9]{3}$/) !== null)
    if (!heightValid) {
      alertMessage = alertMessage + 'Height :\nMust be a number, 3 digits\n'
    }

    const weightValid = (weight.match(/^[0-9]{2,3}$/) !== null)
    if (!weightValid) {
      alertMessage = alertMessage + 'Weight :\nMust be a number, 2~3 digits\n'
    }

    return (nameValid && emailValid && heightValid && weightValid)
  }

  return (
  <div className='Signup'>
    <style type="text/css">
        {`
             
             .btn-grad {
              background-image: linear-gradient(to right, #5C258D 0%, #4389A2  51%, #5C258D  100%);
              padding: 15px 45px;
              text-align: center;
              font-weight : bold;
              text-transform: uppercase;
              transition: 0.5s;
              background-size: 200% auto;
              color: white;            
              box-shadow: 0 0 20px #eee;
              border-radius: 10px;
              display: block;
            }
  
            .btn-grad:hover {
              background-position: right center; /* change the direction of the change here */
              color: #FFE5B4;
              text-decoration: none;
            }
           
    `}
      </style>
    <div className = 'spacing'></div>
    <h1>Create Account</h1>
    <Form>
      <Form.Group className='nameForm'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='name' placeholder='Name' onChange = {(e) => setName(e.target.value)} />
      </Form.Group>
      <div className = 'spacebetween'></div>
      <Form.Group className='emailForm'>
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' placeholder='Email Address' onChange = {(e) => setEmail(e.target.value)} />
      </Form.Group>
      <div className = 'spacebetween'></div>
      <Form.Group className='passwordForm'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' onChange = {(e) => setPassword(e.target.value)} />
      </Form.Group>
      <div className = 'spacebetween'></div>
      <Stack direction = "horizontal" gap = {3}>
      <Form.Group className='heightForm'>
        <Form.Label>Height cm</Form.Label>
        <Form.Control type='height' placeholder='Your height in cm' onChange = {(e) => setHeight(e.target.value)} />
      </Form.Group>
      <div className = 'spacebetween'></div>
      <Form.Group className='weightForm'>
        <Form.Label>Weight kg</Form.Label>
        <Form.Control type='weight' placeholder='Your weight in kg' onChange = {(e) => setWeight(e.target.value)} />
      </Form.Group>
      </Stack>
      <div className = 'spacebetween'></div>
      <Stack direction = "horizontal" gap = {5}>
      <Form.Group className='male'>
        <Stack direction = "horizontal" gap = {1}>
        <Form.Check placeholder = 'gender1' type='radio' name = "gender" id = "gender1" onClick={(e) => setGender('Male')} defaultChecked />
        <Form.Label htmlFor = "gender1"> Male </Form.Label>
        </Stack>
      </Form.Group>
      <Form.Group className='female'>
        <Stack direction = "horizontal" gap = {1}>
        <Form.Check placeholder = 'gender2' type='radio' name = "gender" id = "gender2" onClick={(e) => setGender('Female')}/>
        <Form.Label htmlFor = "gender2"> Female </Form.Label>
        </Stack>
      </Form.Group>
      <div className = 'spacebetween'></div>
      </Stack>
      <div className = 'spacebetween'></div>
      <div className = "d-grid gap-2">
      <Button variant = 'grad' size ='lg' onClick = {async () => await signupbuttonHandler()}>Sign-up</Button>
      </div>
      <div className = 'spacebetween'></div>
    </Form>
  </div>
  )
}
