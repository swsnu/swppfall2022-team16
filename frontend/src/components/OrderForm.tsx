import React from 'react'
import { Image, Stack, Table } from 'react-bootstrap'
/*eslint-disable */

export interface IProps {
  imageURL: string | undefined;
  itemName: string | undefined;
  sellerName: string | undefined;
  color: string;
  size: string;
  quantity: number;
}

export default function OrderForm (props : IProps): JSX.Element {
  return (
    <Stack direction="horizontal" gap={3}>
      <Image rounded style={{width: 210, height: 280, objectFit: 'cover'}} src={props.imageURL}/>
      <Stack direction="vertical" gap ={3}>
        <h2>{props.itemName}</h2>
        <h4>{props.sellerName}</h4>
        <Table>
          <thead>
            <tr>
              <th>Color</th>
              <th>Size</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.color}</td>
              <td>{props.size}</td>
              <td>{props.quantity}</td>
            </tr>
          </tbody>
        </Table>
      </Stack>
    </Stack>
  );
}
