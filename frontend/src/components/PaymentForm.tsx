import React from 'react'
import { Stack } from 'react-bootstrap'

/*eslint-disable */

export default function PaymentForm (): JSX.Element {
  return <div>
    <Stack direction = 'vertical' gap = {3}>
      <Stack direction ='horizontal' gap = {5}>
        <input placeholder = 'Your Credits : $300'></input>
        <button >Apply</button>
      </Stack>
      <Stack direction = 'vertical' gap = {3}>
        <div className = "subtotal">Subtotal    $190.00</div>
        <div className = "subtotal">Shipping Fee     $9.00</div>
      </Stack>
      <Stack direction = 'horizontal' gap = {5}>
        <div className = "total">Total</div>
        <div className = "totalfee">$199.00</div>
      </Stack>
    </Stack>
  </div>
}
