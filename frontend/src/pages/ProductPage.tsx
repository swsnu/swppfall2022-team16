import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import OrderForm from '../components/OrderForm'
import Review from '../components/Review'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'
import Footer from '../components/Footer'
/*eslint-disable */

export default function ProductPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)

  useEffect(() => {
    dispatch(fetchMainItems())
  }, [dispatch])

  return (<div>
    <TopBar />
    <Container>
      <Row>
        <Col>
          <ShopItem shopItem={shopItemState.shopitems[0]} />
        </Col>
        <Col>
          <OrderForm />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>What others are saying</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Review />
        </Col>
        <Col>
          <Review />
        </Col>
        <Col>
          <Review />
        </Col>
        <Col>
          <Review />
        </Col>
      </Row>
    </Container>
    <Footer/>
  </div>)
}
