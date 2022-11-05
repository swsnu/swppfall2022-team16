import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TopBar from '../components/TopBar'
/*eslint-disable */

export default function MyPage (): JSX.Element {
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
