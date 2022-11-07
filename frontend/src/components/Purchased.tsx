import React from 'react'
import { Stack, Button } from 'react-bootstrap';
/*eslint-disable */

export interface IProps {
  itemName: string | undefined;
  itemPrice: number
  shippingStatus: string | undefined;
  purchaseDate: string | undefined;
}

export default function Purchased (props : IProps): JSX.Element {
  return (
    <div className = "Purchases">
      <h1>Purchases</h1>
      <Stack direction = "horizontal">
        <h5>{props.itemName}</h5>
        <h3>{"$" + props.itemPrice}</h3>
        <p>{props.shippingStatus}</p>
        <h3>{props.purchaseDate}</h3>
        <Button variant = "secondary" type = "submit" onClick = {() => {}}>
          Write your Review
        </Button>
      </Stack>
    </div>
  );
}
