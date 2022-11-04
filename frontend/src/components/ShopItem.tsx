import React from 'react'
import { Card } from 'react-bootstrap'

export default function ShopItem (): JSX.Element {
  return <div>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://img.sbs.co.kr/newsnet/etv/upload/2020/10/28/30000654805_1280.jpg" style={{ width: '18rem' }} />
      <Card.Body>
        <Card.Title>Karina</Card.Title>
        <Card.Text>카리나!</Card.Text>
      </Card.Body>
    </Card>
  </div>
}
