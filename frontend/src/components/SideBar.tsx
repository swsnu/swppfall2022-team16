import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
/*eslint-disable */

export default function SideBar (): JSX.Element {
  return (
    <>
    <Navbar sticky = "top" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">{' '}BridgeUs</Navbar.Brand>
      </Container>
    </Navbar>
  </>
  )
}
