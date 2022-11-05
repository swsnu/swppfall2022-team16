import React from 'react'
import { Nav } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
/*eslint-disable */

export default function TopBar (): JSX.Element {
  return (
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