import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../store'
import { login } from '../store/slices/user'

export default function LoginForm (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const loginbuttonHandler = async (): Promise<void> => {
    const result = await dispatch(login({ username, password }))
    if (result.type === `${login.typePrefix}/fulfilled`) {
      navigate('/')
    } else {
      alert('Email or password is wrong')
    }
  }

  return (
    <div className='Login'>
       <style type="text/css">
        {`
             
             .btn-grad {
              background-image: linear-gradient(to right, #5C258D 0%, #4389A2  51%, #5C258D  100%);
              padding: 15px 45px;
              text-align: center;
              text-transform: uppercase;
              transition: 0.5s;
              font-weight : bold;
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
      <h1>Login</h1>
      <div className = 'spacebetween'></div>
      <Form>
        <Form.Group className='emailForm'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='text' placeholder='Email Address' onChange = {(e) => setUsername(e.target.value)} />
        </Form.Group>
        <div className = 'spacebetween'></div>
        <Form.Group className='passwordForm'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' onChange = {(e) => setPassword(e.target.value)} />
        </Form.Group>
        <div className = 'spacebetween'></div>
        <div className = "d-grid gap-2">
        <Button variant = 'grad' onClick = {() => { loginbuttonHandler() }}>Login</Button>
        </div>
      </Form>
    </div>
  )
}
