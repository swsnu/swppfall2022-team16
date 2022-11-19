import React from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import SignupForm from '../components/SignupForm'
import '../css/signupform.css'

/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/
export default function SignupPage (): JSX.Element {
  return (
  <div className = 'page-container'>
    <Stack direction = 'horizontal'>
      <div className = 'pictureinsignup'>
        <a href = '/' >
        <img src ='/signupbanner.png' width = '100%' height = '100%'></img>
        </a>
      </div>
      <Stack direction='vertical' gap ={5}>
        <Container>
          <Row>
            <Col>
              <SignupForm />
              <div className = 'signupimmi'>If you already have your id, you can <a href='/login'>login</a> here.</div>
            </Col>
          </Row>
        </Container>
      </Stack>
    </Stack>
  </div>
  )
}
