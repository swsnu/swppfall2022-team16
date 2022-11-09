import React, {useEffect, useState} from 'react'
import { Button, Form, Nav } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import {selectUser} from '../store/slices/user'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
  }, [userState.currentLoggedIn])
  
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
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <Button variant="outline-success" onClick={() => navigate(`/search/${searchText}`)} disabled={searchText === ""}>Search</Button>
          </Form>
          {
            loggedIn ? <Nav.Link href = {path}> welcome, {userName} </Nav.Link>
             :  <Nav.Link href = '/login'>login</Nav.Link>
          }
        </Nav>
      </Container>
    </Navbar>
  </>
  )
}