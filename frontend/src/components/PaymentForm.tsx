import React, { useState } from 'react'
import { Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import { selectUserShop } from '../store/slices/usershop'

export default function PaymentForm (props: { shippingFee: number, totalCost: number, credit: number }): JSX.Element {
  // const dispatch = useDispatch<AppDispatch>()
  const [userCredit, setUserCredit] = useState(0)
  const dispatch = useDispatch<AppDispatch>()
  const usershopState = useSelector(selectUserShop)

  return <div>
    {/* Overall structure of the layout. Need to integrate and get data from the redux store */}
    <Stack direction = 'vertical' gap = {3}>
      <Stack direction ='horizontal' gap = {5}>
        <div className = 'credits'>Your credits </div>
        <div className = 'credits ms-auto'>${props.credit}.00</div>
      </Stack>
      <hr style={{
        background: 'grey',
        color: 'grey',
        borderColor: 'black',
        height: '3px'
      }}></hr>
      <Stack direction = 'vertical' gap = {3}>
        <div className = 'subtotal'>
          <Stack direction = 'horizontal'>
            <div className = "subtotal">Subtotal</div>
            <div className = "subtotal ms-auto">${props.totalCost}.00</div>
          </Stack>
        </div>
        <div className = 'subtotal'>
          <Stack direction = 'horizontal'>
            <div className = "subtotal">Shipping Fee</div>
            <div className = "subtotal ms-auto">${props.shippingFee}.00</div>
          </Stack>
        </div>
      </Stack>
      <hr style={{
        background: 'grey',
        color: 'grey',
        borderColor: 'black',
        height: '3px'
      }}></hr>
      <Stack direction = 'horizontal' gap = {5}>
        <div className = "total">Total</div>
        <div className = "totalfee ms-auto">${props.totalCost + props.shippingFee}.00</div>
      </Stack>
      <hr style={{
        background: 'grey',
        color: 'grey',
        borderColor: 'black',
        height: '3px'
      }}></hr>
      <Stack direction = 'horizontal'>
        <div className = 'remainingfee'>Remaining Credits</div>
        <div className = 'remainingfee ms-auto'>${props.credit - (props.totalCost + props.shippingFee)}.00</div>
      </Stack>
      <hr style={{
        background: 'grey',
        color: 'grey',
        borderColor: 'black',
        height: '3px'
      }}></hr>
    </Stack>
  </div>
}
