import React from 'react'
import '../css/Footer.css'
import { Stack } from 'react-bootstrap'

export default function Footer (): JSX.Element {
  return (
      <div className="footer">
        <Stack direction = 'horizontal' gap = { 3 }>
          <div className = 'spaces'></div>
          <p >BridgeUs Inc.</p>
          <p className ="ms-auto" >about </p>
          <p>contact </p>
          <p>FAQ</p>
          <div></div>
        </Stack>
      </div>
  )
}
