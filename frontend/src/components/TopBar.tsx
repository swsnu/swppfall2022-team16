import React, {useEffect, useState} from 'react'
import { Nav } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import {selectUser} from '../store/slices/user'
import {useSelector} from 'react-redux'

/*eslint-disable */



export default function TopBar (): JSX.Element {
  const [loggedIn, setloggedIn] = useState(false)
  const userState = useSelector(selectUser)
  useEffect(()=>{
      if (userState.currentLoggedIn){
        setloggedIn(true)
      } else setloggedIn(false)
  }, [userState.currentLoggedIn])
  console.log('loggedin?', userState.currentLoggedIn)
  if (loggedIn){
    const userId = userState.currentLoggedIn?.id
    const path = '/user/' + userId
    const userName = userState.currentLoggedIn?.username
    return (
      <>
      <Navbar sticky = "top" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">{' '}BridgeUs</Navbar.Brand>
          <Nav className ="side">
            <Nav.Link href = '/community'>community</Nav.Link>
            <input placeholder = 'search'></input>
            <Nav.Link href = {path}> welcome, {userName} </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
    )
  }
  else return (
    <>
    <Navbar sticky = "top" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">{' '}BridgeUs</Navbar.Brand>
        <Nav className ="side">
          <Nav.Link href = '/community'>community</Nav.Link>
          <input placeholder = 'search'></input>
          <Nav.Link href = '/login'>login</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  </>
  )
}