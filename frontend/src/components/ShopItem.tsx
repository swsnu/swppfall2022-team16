import React from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ShopItemInfo } from '../store/slices/shopitem';
/*eslint-disable */

export default function ShopItem (props: { shopItem: ShopItemInfo | null }): JSX.Element {
  const shopItem = props.shopItem

  const navigate = useNavigate();
  
  return <div>
    <Card onClick = {() => navigate(`/product/${shopItem?.id}`)} style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://img.sbs.co.kr/newsnet/etv/upload/2020/10/28/30000654805_1280.jpg" style={{ width: '18rem' }} />
      <Card.Body>
        <Card.Title as= "h3">{shopItem?.name}</Card.Title>
        <Card.Text as= "h5">{shopItem?.seller}</Card.Text>
      </Card.Body>
    </Card>
  </div>
}
