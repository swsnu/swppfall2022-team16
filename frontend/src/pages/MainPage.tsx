import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../components/Banner'
import Filter from '../components/Filter'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'
/*eslint-disable */

export default function MainPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)

  useEffect(() => {
    dispatch(fetchMainItems())
  }, [dispatch])

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
  </div>)
}
