import React from 'react'
import { Stack } from 'react-bootstrap'
import LoginForm from '../components/LoginForm'
import SideBar from '../components/SideBar'

export default function LoginPage (): JSX.Element {
  return (<Stack direction='horizontal'>
    <SideBar />
    <LoginForm />
  </Stack>)
}
