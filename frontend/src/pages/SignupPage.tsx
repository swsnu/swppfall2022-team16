import React from 'react'
import { Stack } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import SideBar from '../components/SideBar'
import SignupForm from '../components/SignupForm'
import { AppDispatch } from '../store'
/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/
export default function SignupPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  return (<Stack direction='vertical' gap ={5}>
    <SideBar />
    <SignupForm />
  </Stack>)
}
