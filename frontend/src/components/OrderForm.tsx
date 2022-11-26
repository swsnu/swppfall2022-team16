import React, { useEffect } from 'react'
import { Image, Stack, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'
import { fetchUsers, selectUser } from '../store/slices/user'

export interface IProps {
  itemID: number
  color: string
  size: string
  quantity: number
}

export default function OrderForm (props: IProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)
  const userState = useSelector(selectUser)

  useEffect(() => {
    dispatch(fetchMainItems())
    dispatch(fetchUsers())
  }, [dispatch])

  const item = shopItemState.shopitems.find((shopitem) => shopitem.id === props.itemID)!

  const findAuthorName = (ID: number | undefined) => {
    return userState.users.find((user: User) => { return (user.id === ID) })?.nickname
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <Image alt='itemimage' rounded style={{ width: 210, height: 280, objectFit: 'cover' }} src={item.image_url}/>
      <Stack direction="vertical" gap ={3}>
        <h2>{item.name}</h2>
        <h4>{findAuthorName(item.seller)}</h4>
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
  )
}
