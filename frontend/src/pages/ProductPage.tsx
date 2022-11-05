import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import OrderForm from '../components/OrderForm'
import Review from '../components/Review'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
/*eslint-disable */

export default function ProductPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  return (<div>
    <TopBar />
    <Container>
      <Row>
        <Col>
          <ShopItem shopItem={null} />
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
    </Container>
  </div>)
}
