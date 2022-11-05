import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Banner from '../components/Banner'
import Filter from '../components/Filter'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
/*eslint-disable */

export default function MainPage (): JSX.Element {
  return (<Container>
    <Row>
      <Col>
        <TopBar />
        <br/>
      </Col>
    </Row>
    <Row>
      <Col>
        <Banner />
        <br/>
      </Col>
    </Row>
    <Row>
      <Col>
        <h1>Trending</h1>
      </Col>
      {
        [0, 1, 2, 3].map((i) => <Col>
          <Filter key={i} />
        </Col>)
      }
    </Row>
    <Row>
      {
        [0, 1, 2, 3].map((i) => <Col>
          <ShopItem key={i} />
        </Col>)
      }
    </Row>
  </Container>)
}
