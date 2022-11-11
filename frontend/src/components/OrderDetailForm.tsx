import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Form, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export interface IProps {
  itemID?: number | undefined
  itemName: string | undefined
  sellerName: string | undefined
  quantity: number
  price: number | undefined
  recommendedSize: string
}

export default function OrderDetailForm (props: IProps): JSX.Element {
  const navigate = useNavigate()

  if (props.itemID === undefined) {
    props.itemID = 1
  }

  return (
    <Card style={{ width: '36rem' }}>
      <Card.Body>
        <Card.Title>★★★★☆</Card.Title>
        <Card.Text>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{ '$' + (props.price !== undefined ? props.price.toString() : '0') }</span>
        <Form>
          <Form.Select aria-label = "Color">
            <option>White</option>
            <option>Black</option>
            <option>Brown</option>
          </Form.Select>
          <Stack direction = "horizontal" gap = {5}>
            <Form.Select aria-label = "Quantity">
              <option>Quantity</option>
              <option value = "1">1</option>
              <option value = "2">2</option>
              <option value = "3">3</option>
              <option value = "4">4</option>
              <option value = "5">5</option>
            </Form.Select>
            <Form.Select aria-label = "Size">
              <option>Size</option>
              <option value = "1">S</option>
              <option value = "2">M</option>
              <option value = "3">L</option>
            </Form.Select>
            <Form.Text style={{ width: '20rem' }}>
              { 'recommendddded size: ' + props.recommendedSize }
            </Form.Text>
          </Stack>
        </Form>
        </Card.Text>
        <Button variant='primary'>Add to Cart</Button>
        <Button variant='secondary' onClick = { () => { navigate('/payment/' + (props.itemID !== undefined ? props.itemID.toString() : '0')) } }>Buy Now</Button>
      </Card.Body>
    </Card>
  )
}
