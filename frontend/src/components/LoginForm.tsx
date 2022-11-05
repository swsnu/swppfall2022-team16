import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { login } from '../store/slices/bridgeus'
/*eslint-disable */

export default function LoginForm (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const loginbuttonHandler = async () => {
    const result = await dispatch(login({ username : username, password: password }))
    console.log(result)
  }

  return (
    <div className='Login'>
      <h1>Login</h1>
      <Form>
        <Form.Group className='emailForm'>
          <Form.Control type='text' placeholder='Email Address' onChange = {(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className='passwordForm'>
          <Form.Control type='password' placeholder='Password' onChange = {(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button onClick = {() => loginbuttonHandler()}>Login</Button>
      </Form>
    </div>
  )
}