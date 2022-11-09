import React from 'react'
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
/*eslint-disable */

export interface IProps {
  itemName: string | undefined;
  itemPrice: number
  shippingStatus: string | undefined;
  purchaseDate: string | undefined;
}

export default function Purchased (props : IProps): JSX.Element {
  const navigate = useNavigate()
  return (
    <div className = "Purchases">
      <Stack direction = "horizontal" gap ={3}>
        <h5>{props.itemName}</h5>
        <h3>{"$" + props.itemPrice}</h3>
        <p>{props.shippingStatus}</p>
        <h3>{props.purchaseDate}</h3>
      </Stack>
      <Button variant = "secondary" type = "submit" onClick = {() => {navigate('/review/1')}}>
        Write your Review
      </Button>
    </div>
  );
}
