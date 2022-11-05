import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import ReviewForm from '../components/ReviewForm'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'

/*eslint-disable */


export default function ReviewPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  return (<div>
    <TopBar />
    <Container>
      <Row>
        <Col>
          <h1>Write your review</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ShopItem />
        </Col>
        <Col>
          <ReviewForm />
        </Col>
      </Row>
    </Container>
  </div>)
}
