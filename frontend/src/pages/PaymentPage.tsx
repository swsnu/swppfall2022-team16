import React from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import OrderForm from '../components/OrderForm'
import PaymentForm from '../components/PaymentForm'
import ShippingForm from '../components/ShippingForm'
import TopBar from '../components/TopBar'
/*eslint-disable */

export default function PaymentPage (): JSX.Element {
  return (<Container>
    <Row>
      <Col>
        <TopBar />
      </Col>
    </Row>
    <Row>
      <Col>
        <h1>Checkout Your Order</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <Stack>
          <OrderForm />
          <ShippingForm />
        </Stack>
      </Col>
      <Col>
        <Stack>
          <PaymentForm />
          <Button>Buy with my credit</Button>
        </Stack>
      </Col>
    </Row>
  </Container>)
}
