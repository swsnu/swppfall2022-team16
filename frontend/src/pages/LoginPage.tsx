import React from 'react'
import { Stack } from 'react-bootstrap'
import LoginForm from '../components/LoginForm'
import SideBar from '../components/SideBar'


/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/
export default function LoginPage (): JSX.Element {
  return (<Stack direction='vertical' gap ={3}>
    <SideBar />
    <LoginForm />
  </Stack>)
}
