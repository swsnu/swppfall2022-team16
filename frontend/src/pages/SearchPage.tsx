import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Filter from '../components/Filter'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
/*eslint-disable */

export default function SearchPage (): JSX.Element {
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
            <ShopItem key={i} />
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
            <ShopItem key={i} />
          </Col>)
        }
      </Row>
    </Container>
  </div>)
}
