import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Form, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../css/orderdetailform.css'

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
    <>
    <style type="text/css">
        {`
             
             .btn-grad {
              background-image: linear-gradient(to right, #5f2c82 0%, #49a09d  51%, #5f2c82  100%);
              text-align: center;
              transition: 0.5s;
              background-size: 200% auto;
              color: white;       
              font-weight : bold;     
              box-shadow: 0 0 20px #eee;
              border-radius: 10px;
              display: block;
            }
  
            .btn-grad:hover {
              background-position: right center; /* change the direction of the change here */
              color: #FFE5B4;
              text-decoration: none;
            }
           
    `}
    {`
             
                      
         .btn-cart {
          background-image: linear-gradient(to right, #1FA2FF 0%, #12D8FA  51%, #1FA2FF  100%);
          text-align: center;
          text-transform: uppercase;
          transition: 0.5s;
          background-size: 200% auto;
          color: white;            
          box-shadow: 0 0 20px #eee;
          border-radius: 10px;
          font-weight : bold;     
          display: block;
        }

        .btn-cart:hover {
          background-position: right center; /* change the direction of the change here */
          color: #fff;
          text-decoration: none;
        }
       
           
    `}
      </style>
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
          <br/>
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
          </Stack>
        </Form>
        <br/>
        <Stack direction = 'horizontal' gap = {1}>
          <Button variant='cart'>Add to Cart</Button>
          <Button variant='grad' onClick = { () => { navigate('/payment/' + (props.itemID !== undefined ? props.itemID.toString() : '0')) } }>Buy Now</Button>
        </Stack>
      </Card.Body>
    </Card>
    </>
  )
}
