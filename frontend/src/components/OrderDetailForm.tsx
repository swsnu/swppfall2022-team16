import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Form, Stack } from 'react-bootstrap'

export interface IProps {
  itemName: string | undefined;
  sellerName: string | undefined;
  quantity: number;
  price: number | undefined;
  recommendedSize: string | undefined;
}

export default function OrderDetailForm (props : IProps): JSX.Element {
  return (
  <Stack direction = 'vertical' gap = {3}>
  <h3>{props.itemName}</h3>
  <p>{props.sellerName}</p>
  <Stack direction = 'horizontal' gap= {5}>
    <Card style={{ width: '10rem' }}>
      <Card.Body>
        <Card.Title>★★★★☆</Card.Title>
        <Card.Text>
          {"$" + props.price}
        <Form>
        <Form.Control type = "color" defaultValue="#563d7c" title="Choose your color"/>
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
          <Form.Control placeholder = {"recommended size: " + props.recommendedSize}/>
            <option>Size</option>
            <option value = "1">S</option>
            <option value = "2">M</option>
            <option value = "3">L</option>
          </Form.Select>
          </Stack>
        </Form>
        </Card.Text>
        <Button variant="primary">Add to Cart</Button>
        <Button variant="secondary" /*onClick = {() => {useNavigate("/payment")}}*/>Buy Now</Button>
      </Card.Body>
    </Card>
  </Stack>
</Stack>
  );
}
