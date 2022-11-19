import React from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import LoginForm from '../components/LoginForm'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import '../css/loginpage.css'


/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/
export default function LoginPage (): JSX.Element {
  return (
  <div className = 'page-container'>
  <Stack direction = 'horizontal'>
  <div className = 'pictureinsignup'>
      <a href = '/' >
        <img src ='/signupbanner.png' width = '100%' height = '100%'></img>
      </a>
    </div>
    <Stack direction='vertical' gap ={3}>
      <Container>
        <Row>
          <Col>
            <LoginForm />
            <div className = 'spacebetweenlogin'></div>
            <div>If you don't have your id, you can <Link to='/signup'>signup</Link> here.</div>
          </Col>
        </Row>
      </Container>
    </Stack>
  </Stack>
  </div>
  )
}
