import React, { useEffect, useState } from 'react'
import { Card, Placeholder } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../store'
import { ShopItemInfo } from '../store/slices/shopitem'
import { fetchUsers, selectUser, User } from '../store/slices/user'
import '../css/shopitem.css'

export default function ShopItem (props: { shopItem: ShopItemInfo | undefined }): JSX.Element {
  const [loaded, setLoaded] = useState<boolean>(false)
  const [hover, setHover] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const shopItem = props.shopItem
  let itemTitle = shopItem?.name
  const userState = useSelector(selectUser)
  const navigate = useNavigate()

  const cutTitle = (): string => {
    if (itemTitle === undefined) {
      return ' '
    } else {
      itemTitle = itemTitle.substring(0, 23) + '...'
      return itemTitle
    }
  }

  useEffect(() => {
    const fetchRequired = async (): Promise<void> => {
      await dispatch(fetchUsers())
      setLoaded(true)
    }
    fetchRequired().catch(() => {})
  }, [dispatch])

  if (loaded) {
    const findAuthorName = (ID: number | undefined): string | undefined => {
      return userState.users.find((user: User) => { return (user.id === ID) })?.nickname
    }

    return <div data-testid='card-with-data'>
      <Card style={{ width: '18rem' }} border={hover ? 'primary' : ''} onClick = {() => navigate(`/product/${shopItem!.id}`)} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
        <Card.Img variant="top" src={shopItem?.image_url} alt="Product Image" style={{ width: '17.9rem', height: '24rem', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title bsPrefix='shopitemtitle' >{cutTitle()}</Card.Title>
          <Card.Text data-testid = "test">{findAuthorName(shopItem?.seller)}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  } else {
    return <div data-testid='card-with-placeholder'>
      <Card style={{ width: '18rem' }} border={hover ? 'primary' : ''} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
        <Card.Img variant="top" src='/bridgeUsLogo.png' alt="Product Image" style={{ width: '17.9rem', height: '24rem', objectFit: 'contain' }} />
        <Card.Body>
          <Placeholder as={Card.Title} animation='glow'>
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} data-testid='test' animation='glow'>
            <Placeholder xs={4} /> <Placeholder xs={6} />
          </Placeholder>
        </Card.Body>
      </Card>
    </div>
  }
}
