import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
/*eslint-disable */

export default function MyPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  return (<div>
    <TopBar />
    <Container>
      <Row>
        <Col>
          <h1>Purchases</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Community</h1>
        </Col>
      </Row>
      <h1>MyPage</h1>
      <p>Hi!</p>
    </Container>
  </div>)
}
