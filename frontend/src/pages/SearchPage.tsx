import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Filter from '../components/Filter'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
/*eslint-disable */

export default function SearchPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  return (<div>
    <TopBar/>
    <Container>
      <Row>
        <Col>
          <h1>Top Results</h1>
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
            <ShopItem key={i} shopItem={null} />
          </Col>)
        }
      </Row>
      <Row>
        <Col>
          <Button>Show More</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Recommendations</h1>
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
            <ShopItem key={i} shopItem={null} />
          </Col>)
        }
      </Row>
    </Container>
  </div>)
}
