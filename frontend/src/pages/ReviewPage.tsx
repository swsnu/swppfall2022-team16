import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReviewForm from '../components/ReviewForm'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'
import Footer from '../components/Footer'
/*eslint-disable */


export default function ReviewPage (): JSX.Element {
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
          <h1>Write your review</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ShopItem key={1} shopItem={shopItemState.shopitems[0]} />
        </Col>
        <Col>
          <ReviewForm />
        </Col>
      </Row>
    </Container>
    <Footer/>
  </div>)
}
