import React, { useEffect, useState } from 'react'
import { Image, Stack, Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'
import { fetchUsers, selectUser, User } from '../store/slices/user'
import { deleteFromCart, fetchCart, selectUserOrder } from '../store/slices/userorder'

import '../css/orderform.css'

export interface IProps {
  orderID: number
  itemID: number
  color: string
  size: string
  quantity: number
  price: number
}

export default function OrderForm (props: IProps): JSX.Element {
  const [loaded, setLoaded] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)
  const userState = useSelector(selectUser)
  const userOrderState = useSelector(selectUserOrder)

  useEffect(() => {
    const fetchRequired = async (): Promise<void> => {
      await dispatch(fetchMainItems())
      await dispatch(fetchUsers())
      await dispatch(fetchCart())
      setLoaded(true)
    }
    fetchRequired().catch(() => {})
  }, [dispatch])

  if (loaded) {
    const item = shopItemState.shopitems.find((shopitem) => shopitem.id === props.itemID)!

    const findAuthorName = (ID: number | undefined): string | undefined => {
      return userState.users.find((user: User) => { return (user.id === ID) })?.nickname
    }

    return (
      <>
      <style type="text/css">
          {`
                       
         .btn-gradient {
          background-image: transparent;
          text-align: center;
          text-transform: uppercase;
          transition: 0.5s;
          background-size: 200% auto;
          color: white;            
          box-shadow: 0 0 20px #eee;
          border-radius: 10px;
          display: block;
        }

        .btn-gradient:hover {
          background-position: right center; /* change the direction of the change here */
          color: #fff;
          text-decoration: none;
        }
       
      `}
        </style>
      <Stack direction="horizontal" gap={3}>
        <Image alt='itemimage' rounded style={{ width: 210, height: 280, objectFit: 'cover' }} src={item.image_url}/>
        <Stack direction="vertical" gap ={3}>
          <h5>{item.name}</h5>
          <h6>{findAuthorName(item.seller)}</h6>
          <Table>
            <thead>
              <tr>
                <th>Color</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.color}</td>
                <td>{props.size}</td>
                <td>{props.quantity}</td>
                <td>{props.price}</td>
              </tr>
            </tbody>
          </Table>
          <div className = 'deleteitem'>
            <Button variant = 'gradient' onClick = {() => {
              dispatch(deleteFromCart(props.orderID)).catch(() => {})
            }}>
            <img alt = 'trashbin' src = '/trash.png' width = '20' height = '20' className='trash'></img>
            </Button>
          </div>
        </Stack>
      </Stack>
      <br/>
      </>
    )
  } else {
    return <div></div>
  }
}
