import React from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import SideBar from '../components/SideBar'
import SignupForm from '../components/SignupForm'
import { AppDispatch } from '../store'
import Footer from '../components/Footer'
/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/
export default function SignupPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <>
  <Stack direction='vertical' gap ={5}>
    <SideBar />
    <Container>
      <Row>
        <Col>
          <SignupForm />
          <div>If you already have your id, you can <a href='/login'>login</a> here.</div>
        </Col>
      </Row>
    </Container>
  </Stack>
  <Footer/>
  </>
  )
}
