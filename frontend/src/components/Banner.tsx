import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { Nav } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';

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
        <Button variant="dark" size = 'sm' href = '/search/karina'>SHOP NOW</Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="./carousel2.png"
        alt="Second slide"
      />
      <Carousel.Caption>
       <Button variant="dark" size = 'sm' href = '/search/bts'>SHOP NOW</Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="./bannerCarousel.png"
        alt="Third slide"
      />
      <Carousel.Caption>
        <Button variant="dark" size = 'sm' href = '/search/bts'>SHOP NOW</Button>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  </div>
  )
}
