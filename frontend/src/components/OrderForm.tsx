import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Col, Container, Image, Row, Stack, Table } from 'react-bootstrap'
/*eslint-disable */

export interface IProps {
  itemName: string | undefined;
  sellerName: string | undefined;
  color: string;
  size: string;
  quantity: number;
}

export default function OrderForm (props : IProps): JSX.Element {
  return (
    <Stack direction="horizontal" gap={3}>
      <Image rounded style={{width: 210, height: 280, objectFit: 'cover'}} src="https://i0.wp.com/www.fashionchingu.com/wp-content/uploads/2022/10/Jimin-BTS-Beige-Stripe-Patterned-Sweater-2-270x370.jpg"/>
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
