import React from 'react'
import { Card } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'
/*eslint-disable */

export default function ShopItem (): JSX.Element {

  const navigate = useNavigate();
  
  return <div>
    <Card onClick = {() => navigate("/product/:id")} style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://img.sbs.co.kr/newsnet/etv/upload/2020/10/28/30000654805_1280.jpg" style={{ width: '18rem' }} />
      <Card.Body>
        <Card.Title as= "h3">Item1</Card.Title>
        <Card.Text as= "h5">Seller1</Card.Text>
      </Card.Body>
    </Card>
  </div>
}
