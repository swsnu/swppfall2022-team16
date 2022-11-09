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
import { useParams } from 'react-router-dom'
import { fetchReviews, selectReview } from '../store/slices/review'
/*eslint-disable */

export default function ProductPage (): JSX.Element {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)
  const reviewState = useSelector(selectReview)

  useEffect(() => {
    dispatch(fetchMainItems())
    dispatch(fetchReviews())
  }, [dispatch])

  const reviews = reviewState.reviews.filter((review) => review.review_item === Number(id))

  return (<div>
    <TopBar />
    <Container>
      <Row>
        <Col>
          <ShopItem shopItem={shopItemState.shopitems.find((shopitem) => shopitem.id === Number(id))!} />
        </Col>
        <Col>
          <OrderForm 
            itemName='Melange twill shirt'
            sellerName='StyleNanda'
            color='White'
            size='M'
            quantity = {10}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>What others are saying</h1>
        </Col>
      </Row>
      <Row md={4}>
        {
          reviews.length > 0 ? reviews.map((review) => <Col><Review key={review.id} review={review}/></Col>)
            : <Col>No reviews yet.</Col>
        }
      </Row>
    </Container>
    <Footer/>
  </div>)
}
