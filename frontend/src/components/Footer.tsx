import React from 'react'
import { Nav } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import '../css/Footer.css'
/*eslint-disable */

export default function Footer (): JSX.Element {
  return (
    <Navbar bg="dark" variant="dark" >
      <Container>
        <Navbar.Brand href = '/'>BridgeUS</Navbar.Brand>
        <Nav className ="side">
          <Nav.Link href = '/'>About</Nav.Link>
          <Nav.Link href = '/'>FAQ</Nav.Link>
          <Nav.Link href = '/'>Contact</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}