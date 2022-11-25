import React, { useEffect } from 'react'
import { Stack, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../store'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'
import { UserOrderInfo } from '../store/slices/userorder'

export default function Purchased (props: { order: UserOrderInfo }): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const shopItemState = useSelector(selectShopItem)

  useEffect(() => {
    dispatch(fetchMainItems)
  }, [dispatch])

  const item = shopItemState.shopitems.find((shopitem) => shopitem.id === props.order.item_id)

  return (
    <div className = "Purchases">
      <Stack direction = "horizontal" gap ={3}>
        <h5>{item?.name}</h5>
        <h3>{'$' + item?.price}</h3>
        <p>{props.order.status}</p>
        {/* <h3>{props.purchaseDate}</h3> */}
      </Stack>
      <Button variant = "secondary" type = "submit" onClick = {() => { navigate(`/review/${props.order.item_id}`) }}>
        Write your Review
      </Button>
    </div>
  )
}
