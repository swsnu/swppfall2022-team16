import React from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import LoginForm from '../components/LoginForm'
import SideBar from '../components/SideBar'
import { AppDispatch } from '../store'
import Footer from '../components/Footer'


/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/
export default function LoginPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  return (
  <>
  <Stack direction='vertical' gap ={3}>
    <SideBar />
    <Container>
      <Row>
        <Col>
          <LoginForm />
          <div>If you don't have your id, you can <a href='/signup'>signup</a> here.</div>
        </Col>
      </Row>
    </Container>
  </Stack>
  <Footer/>
  </>)
}
