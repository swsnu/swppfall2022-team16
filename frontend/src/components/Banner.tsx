import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'

/*eslint-disable */

export default function Banner (): JSX.Element {
  return (
    <div>
    <Carousel>
    <Carousel.Item>
      <img
        id = "first image"
        className="d-block w-100"
        src="./firstbanner.png"
        alt="First slide"
      />
      <Carousel.Caption>
        <Button variant="dark" size = 'sm' href = '/search/karina'>SHOP NOW</Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="./secondbanner.png"
        alt="Second slide"
      />
      <Carousel.Caption>
       <Button variant="dark" size = 'sm' href = '/search/bts'>SHOP NOW</Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="./thirdbanner.jpg"
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

