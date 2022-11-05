import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { Nav } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
/*eslint-disable */


export default function Banner (): JSX.Element {
  const navigate = useNavigate();
  return (
    <div>
    <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="./bannerCarousel.png"
        alt="First slide"
      />
      <Carousel.Caption>
        <button onClick = {()=> navigate('./search/:id')} >SHOP NOW</button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="./bannerCarousel.png"
        alt="Second slide"
      />

      <Carousel.Caption>
        <button onClick = {()=> navigate('./search/:id')} >SHOP NOW</button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="./carousel2.png"
        alt="Third slide"
      />

      <Carousel.Caption>
        <button onClick = {()=> navigate('./search/:id')} >SHOP NOW</button>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  </div>
  )
}
