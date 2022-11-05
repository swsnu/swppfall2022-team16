import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Banner from '../components/Banner'
import Filter from '../components/Filter'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
/*eslint-disable */

export default function MainPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  return (<div>
    <TopBar />
    <br/>
    <Container>
      <Row>
        <Col>
          <Banner />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Trending</h1>
        </Col>
        {
          [0, 1, 2, 3].map((i) => <Col>
            <Filter key={i}/>
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
    </Container>
  </div>)
}
