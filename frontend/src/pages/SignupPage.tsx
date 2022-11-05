import React from 'react'
import { Stack } from 'react-bootstrap'
import SideBar from '../components/SideBar'
import SignupForm from '../components/SignupForm'
/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/
export default function SignupPage (): JSX.Element {
  return (<Stack direction='vertical' gap ={5}>
    <SideBar />
    <SignupForm />
  </Stack>)
}
