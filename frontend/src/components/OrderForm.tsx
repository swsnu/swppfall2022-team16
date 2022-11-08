import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Col, Container, Row, Stack } from 'react-bootstrap'
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
      <img style={{width: 200, height: 300}}src="https://img.sbs.co.kr/newsnet/etv/upload/2020/10/28/30000654805_1280.jpg"/>
      <Stack direction="vertical" gap ={3}>
        <h1>{props.itemName}</h1>
        <p>{props.sellerName}</p>
        <Container>
          <Row>
            <Col>Color</Col>
            <Col>Size</Col>
            <Col>Quantity</Col>
          </Row>
          <Row>
            <Col>{props.color}</Col>
            <Col>{props.size}</Col>
            <Col>{props.quantity}</Col>
          </Row>
        </Container>
      </Stack>
    </Stack>
  );
}
