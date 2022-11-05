import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Stack } from 'react-bootstrap'
/*eslint-disable */

export default function OrderForm (): JSX.Element {
  return <div>
    {/*Need to make a new form for the product info */}
    <Stack direction = 'vertical' gap = {3}>
      <h3>Your Order</h3>
      <h5>Product information details Component</h5>
      <Stack direction = 'horizontal' gap= {5}>
        <Card style={{ width: '10rem' }}>
          <Card.Body>
            <Card.Title>Express Shipping</Card.Title>
            <Card.Text>
              1-3 Business days
            </Card.Text>
            <Card.Text>
              $10.00
            </Card.Text>
            <Button variant="primary">Select</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '10rem' }}>
          <Card.Body>
            <Card.Title>Standard Shipping</Card.Title>
            <Card.Text>
              4-7 Business days
            </Card.Text>
            <Card.Text>
              $5.00
            </Card.Text>
            <Button variant="primary">Select</Button>
          </Card.Body>
        </Card>
      </Stack>
      
    </Stack>
  </div>
}
