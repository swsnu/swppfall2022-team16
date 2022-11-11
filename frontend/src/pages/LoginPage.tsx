import React from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import LoginForm from '../components/LoginForm'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'


/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/
export default function LoginPage (): JSX.Element {
  const navigate = useNavigate()
  return (
  <>
  <Stack direction='vertical' gap ={3}>
    <SideBar />
    <Container>
      <Row>
        <Col>
          <LoginForm />
          <div>If you don't have your id, you can <Link to='/signup'>signup</Link> here.</div>
        </Col>
      </Row>
    </Container>
  </Stack>
  <Footer/>
  </>)
}
