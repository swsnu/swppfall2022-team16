import React, { useState } from 'react'
import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import OrderForm from '../components/OrderForm'
import PaymentForm from '../components/PaymentForm'
import ShippingForm from '../components/ShippingForm'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
/*eslint-disable */

export default function PaymentPage (): JSX.Element {
  const navigate = useNavigate()
  const [shippingOption, setShippingOption] = useState<string>("Fast")
  const dispatch = useDispatch<AppDispatch>()
  return (<div>
    <TopBar />
    <Container>
      <Row className="Header-row">
        <Col>
          <h1 className="Header">Checkout Your Order</h1>
        </Col>
      </Row>
      <Row className="Header-row">
        <Col>
          <Stack>
            <OrderForm 
              itemName='Melange twill shirt'
              sellerName='StyleNanda'
              color='White'
              size='M'
              quantity = {10}
            />
            
            <Container fluid>
              <Row className='Header-row'>
                <Col>
                  <Card style={{ width: '18rem' }} border={shippingOption == "Fast" ? "primary" : ""} onClick={() => setShippingOption("Fast")}>
                    <Card.Body>
                      <Card.Title as= "h3">Fast Shipping</Card.Title>
                      <Card.Text as= "h5">1 ~ 3 business days</Card.Text>
                      <Card.Text as= "h5">$10.00</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ width: '18rem' }} border={shippingOption == "Standard" ? "primary" : ""} onClick={() => setShippingOption("Standard")}>
                    <Card.Body>
                      <Card.Title as= "h3">Standard</Card.Title>
                      <Card.Text as= "h5">3 ~ 5 business days</Card.Text>
                      <Card.Text as= "h5">$5.00</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
            <ShippingForm />
          </Stack>
        </Col>
        <Col>
          <Stack>
            <PaymentForm shippingFee={shippingOption == "Fast" ? 10 : 5} />
            <Button onClick={() => navigate('/user/8')}>Buy with my credit</Button>
          </Stack>
        </Col>
      </Row>
    </Container>
    <Footer/>
  </div>)
}
