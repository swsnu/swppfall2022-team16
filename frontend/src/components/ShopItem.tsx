import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../store';
import { ShopItemInfo } from '../store/slices/shopitem';
import { fetchUsers, selectUser, User } from '../store/slices/user';
/*eslint-disable */

export default function ShopItem (props: { shopItem: ShopItemInfo }): JSX.Element {
  const [hover, setHover] = useState<boolean>(false)
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
    <Card style={{ width: '18rem' }} border={hover ? 'primary' : ''} onClick = {() => navigate(`/product/${shopItem.id}`)} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <Card.Img variant="top" src={shopItem.image_url} alt="Product Image" style={{ width: '17.9rem', height: '24rem', objectFit: 'cover'}} />
      <Card.Body>
        <Card.Title >{shopItem.name}</Card.Title>
        <Card.Text >{findAuthorName(shopItem.seller)}</Card.Text>
      </Card.Body>
    </Card>
  </div>
}
