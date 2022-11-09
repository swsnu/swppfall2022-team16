import React from 'react'
import { Nav } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import '../css/Footer.css'
import {Stack} from 'react-bootstrap'
/*eslint-disable */

export default function Footer (): JSX.Element {
  return (
      <div className="footer">
        <Stack direction = 'horizontal' gap = {3}>
          <p >BridgeUs Inc.</p>
          <p className ="ms-auto" >about </p>
          <p>contact </p>
          <p>FAQ</p>
          <div></div>
        </Stack>
      </div>
  )
}