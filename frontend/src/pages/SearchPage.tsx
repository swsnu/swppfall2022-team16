import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Filter from '../components/Filter'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'
import Footer from '../components/Footer'
/*eslint-disable */

export default function SearchPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)

  useEffect(() => {
    dispatch(fetchMainItems())
  }, [dispatch])

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
          shopItemState.shopitems.map((shopItem) => <Col>
            <ShopItem key={shopItem.id} shopItem={shopItem} />
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
          shopItemState.shopitems.map((shopItem) => <Col>
            <ShopItem key={shopItem.id} shopItem={shopItem} />
          </Col>)
        }
      </Row>
    </Container>
    <Footer/>
  </div>)
}
