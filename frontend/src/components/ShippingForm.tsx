import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

export default function ShippingForm (): JSX.Element {
  const [addr, setAddr] = useState('')
  const [buildingNum, setBuildingNum] = useState('')
  const [stateZip, setStateZip] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')

  return (
    <div className='ShippingForm'>
      <div className = "pageTitle Header-row">
        <h3>Shipping Address</h3>
      </div>
      <Form>
      <Form.Group className='RoadAddress' controlId = "formShippingForm">
      <Form.Label>Road Address</Form.Label>
      <Form.Control type = "address" placeholder='enter your road address'/>
      </Form.Group>
      <Form.Group className='BuildingNo' controlId = "formShippingForm">
      <Form.Label>Building No.</Form.Label>
      <Form.Control type = "BuildingNo" placeholder='enter the number of your building'/>
      </Form.Group>
      <Form.Group className='stateZip' controlId = "formShippingForm">
      <Form.Label>State/zip</Form.Label>
      <Form.Control type = "stateZip" placeholder='enter your state or zip code'/>
      </Form.Group>
      <Form.Group className='Country' controlId = "formShippingForm">
      <Form.Label>Country</Form.Label>
      <Form.Control type = "country" placeholder='enter your country'/>
      </Form.Group>
      <Form.Group className='City' controlId = "formShippingForm">
      <Form.Label>City</Form.Label>
      <Form.Control type = "city" placeholder='enter your city'/>
      </Form.Group>
      </Form>
    </div>
  )
}
