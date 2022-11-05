import React, { useState } from 'react'
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
/*eslint-disable */

export default function ShippingForm (): JSX.Element {
  const [addr, setAddr] = useState('');
  const [buildingNum, setBuildingNum] = useState('');
  const [stateZip, setStateZip] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  
  return (
    <div className='ShippingForm'>
      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title as= "h3">Fast Shipping</Card.Title>
            <Card.Text as= "h5">1 ~ 3 business days</Card.Text>
            <Card.Text as= "h5">$10.00</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title as= "h3">Fast Shipping</Card.Title>
            <Card.Text as= "h5">3 ~ 5 business days</Card.Text>
            <Card.Text as= "h5">$5.00</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className='ShippingForm'>
        <div className = "pageTitle"> Shipping Address</div>
        <div className = "Road Address">
          <input id = "Road Address" type = "Road Address" onChange = {(e) => setAddr(e.target.value)}></input>
        </div>
        <div className = "Building No.">
          <input id = "Building No." type = "Building No." onChange = {(e) => setBuildingNum(e.target.value)}></input>
        </div>
        <div className = "stateZip">
          <input id = "stateZip" type = "stateZip" onChange = {(e) => setStateZip(e.target.value)}></input>
        </div>
        <div className = "country">
          <input id = "country" type = "country" onChange = {(e) => setCountry(e.target.value)}></input>
        </div>
        <div className = "city">
          <input id = "city" type = "city" onChange = {(e) => setCity(e.target.value)}></input>
        </div>
      </div>
    </div>
  )
}
