import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Stack from 'react-bootstrap/Stack'

export default function SideBar (): JSX.Element {
  return (
    <>
    <Navbar sticky = "top" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
        <Stack direction = 'horizontal' gap = {2}>
            <img src = '/bridgeUsLogo.png' width = '20' height = '22'></img>
            <img src ='/BridgeUsWhite.png' width = '80' height = '20'></img>
          </Stack>
        </Navbar.Brand>
      </Container>
    </Navbar>
  </>
  )
}
