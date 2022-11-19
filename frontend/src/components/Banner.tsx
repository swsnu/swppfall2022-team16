import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'
import '../css/Banner.css'

/*eslint-disable */

export default function Banner (): JSX.Element {
  return (
    
    <div className = 'banner'>
    <Carousel data-interval = '1' data-pause = 'hover'>
    <Carousel.Item>
      <img
        id = "first image"
        className="d-block w-100"
        src="./firstbanner.png"
        alt="First slide"
      />
      <Carousel.Caption>
        <Button variant="shopnow" size = 'sm' href = '/search/karina'>SHOP NOW</Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="./secondbanner.png"
        alt="Second slide"
      />
      <Carousel.Caption>
       <Button variant="shopnow" size = 'sm' href = '/search/bts'>SHOP NOW</Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="./thirdbanner.jpg"
        alt="Third slide"
      />
      <Carousel.Caption>
        <Button variant="shopnow" size = 'sm' href = '/search/bts'>SHOP NOW</Button>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  </div>
  )
}

