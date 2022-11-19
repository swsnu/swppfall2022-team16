import React, { useEffect, useState } from 'react'
import { Button, Form, Nav, Stack } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { selectUser, signout } from '../store/slices/user'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../store'
/*eslint-disable */


export default function TopBar (): JSX.Element {
  const [loggedIn, setloggedIn] = useState(false)
  const [searchText, setSearchText] = useState("")
  const userState = useSelector(selectUser)
  const navigate = useNavigate()

  useEffect(()=>{
      if (userState.currentLoggedIn){
        setloggedIn(true)
      } else setloggedIn(false)
  })
  
  const userId = userState.currentLoggedIn?.id
  const path = '/user/' + userId
  const userName = userState.currentLoggedIn?.nickname
  const dispatch = useDispatch<AppDispatch>()
  const loggingout = async () => {
    setloggedIn(false)
    dispatch(signout())
    navigate('/')
  }
  return (
    <>
     <style type="text/css">
        {`
    .btn-signout {
      background-color: purple;
      color: white;
    }
    `}
      </style>
    <Navbar sticky = "top" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">
          <Stack direction = 'horizontal' gap = {2}>
            <img src = '/bridgeUsLogo.png' width = '20' height = '22'></img>
            <img src ='/BridgeUs.png' width = '80' height = '20'></img>
          </Stack>
        </Navbar.Brand>
        <Nav className ="side">
          <Nav.Link href = '/community'>community</Nav.Link>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter"){
                  navigate(`/search/${searchText}`)
                }}}
            />
          </Form>
          {
            loggedIn ? <Stack direction = 'horizontal'>
              <Nav.Link href = {path}> welcome, {userName} </Nav.Link>
              <Button variant = 'signout' onClick = {() => loggingout()} >log out</Button>
            </Stack>
             :  <Nav.Link href = '/login'>login</Nav.Link>
          }
        </Nav>
      </Container>
    </Navbar>
  </>
  )
}