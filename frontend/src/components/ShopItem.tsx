import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../store';
import { ShopItemInfo } from '../store/slices/shopitem';
import { fetchUsers, selectUser, User } from '../store/slices/user';
/*eslint-disable */

export default function ShopItem (props: { shopItem: ShopItemInfo }): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const shopItem = props.shopItem
  const userState = useSelector(selectUser)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const navigate = useNavigate();
  const findAuthorName = (ID : number | undefined) => {
          return userState.users.find((user : User) => {return (user.id === ID);})?.nickname;
      };

  
  return <div>
    <Card onClick = {() => navigate(`/product/${shopItem.id}`)} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={shopItem.image_url} alt="Product Image" style={{ width: '18rem' }} />
      <Card.Body>
        <Card.Title as= "h3">{shopItem.name}</Card.Title>
        <Card.Text as= "h5">{findAuthorName(shopItem.seller)}</Card.Text>
      </Card.Body>
    </Card>
  </div>
}
