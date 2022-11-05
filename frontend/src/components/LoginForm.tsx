import React, { useState } from 'react'
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
      <div className='Login-page'>
        <div className = "pageTitle"> Log in </div>
        <div className = "email-input">
          <input id = "email-input" type = "email" onChange = {(e) => setUsername(e.target.value)}></input>
        </div>
        <div className = "pw-input">
          <input id = "pw-input" type = "pw" onChange = {(e) => setPassword(e.target.value)}></input>
        </div>
      </div>
    <button id = "login-button" onClick = {() => loginbuttonHandler()}>login</button>
    </div>
  )
}