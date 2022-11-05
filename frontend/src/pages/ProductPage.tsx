import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import OrderForm from '../components/OrderForm'
import Review from '../components/Review'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
/*eslint-disable */

export default function ProductPage (): JSX.Element {
  return (<Container>
    <Row>
      <Col>
        <TopBar />
      </Col>
    </Row>
    <Row>
      <Col>
        <ShopItem />
      </Col>
      <Col>
        <OrderForm />
      </Col>
    </Row>
    <Row>
      <Col>
        <h1>What others are saying</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <Review />
      </Col>
      <Col>
        <Review />
      </Col>
      <Col>
        <Review />
      </Col>
      <Col>
        <Review />
      </Col>
    </Row>
  </Container>)
}
