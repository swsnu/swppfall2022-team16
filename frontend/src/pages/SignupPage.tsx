import React from 'react'
import { Stack } from 'react-bootstrap'
import SideBar from '../components/SideBar'
import SignupForm from '../components/SignupForm'

export default function SignupPage (): JSX.Element {
  return (<Stack direction='horizontal'>
    <SideBar />
    <SignupForm />
  </Stack>)
}
