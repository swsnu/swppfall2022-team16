import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Form, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export interface OrderDetailProps {
  itemID?: number | undefined
  itemName: string | undefined
  sellerName: string | undefined
  rating: number
  colors: string[]
  quantity: number
  price: number | undefined
  recommendedSize: string
}

export default function OrderDetailForm (props: OrderDetailProps): JSX.Element {
  const navigate = useNavigate()

  const quantityOptions = () => {
    let i
    for(i = 0; i < props.quantity; i++){
      
    }
  }

  return (
    <Card style={{ width: '36rem' }}>
      <Card.Body>
        <Card.Title>{'★'.repeat(Math.round(props.rating)) + '☆'.repeat(5 - Math.round(props.rating))}</Card.Title>
        <Card.Text>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
            { '$' + (props.price !== undefined ? props.price.toString() : '0') }
          </span>
        </Card.Text>
        <Form>
          <Form.Select aria-label = "Color">
            {props.colors.map((color, index) => (
              <span key={index}>
              <option>{color}</option>
              </span>
            ))} 
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
              { 'recommended size: ' + props.recommendedSize }
            </Form.Text>
          </Stack>
        </Form>
        <Button variant='primary'>Add to Cart</Button>
        <Button variant='secondary' onClick = { () => { navigate('/payment/' + (props.itemID !== undefined ? props.itemID.toString() : '0')) } }>Buy Now</Button>
      </Card.Body>
    </Card>
  )
}
