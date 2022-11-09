import React, { useEffect } from 'react'
import { Col, Container, Image, Row, Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import OrderDetailForm from '../components/OrderDetailForm'
import Review from '../components/Review'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { fetchReviews, selectReview } from '../store/slices/review'
import { fetchUsers, selectUser, User } from '../store/slices/user'
/*eslint-disable */

export default function ProductPage (): JSX.Element {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)
  const reviewState = useSelector(selectReview)
  const userState = useSelector(selectUser)

  useEffect(() => {
    dispatch(fetchMainItems())
    dispatch(fetchReviews())
    dispatch(fetchUsers())
  }, [dispatch])

  const item = shopItemState.shopitems.find((shopitem) => shopitem.id === Number(id))
  const reviews = reviewState.reviews.filter((review) => review.review_item === Number(id))

  const findAuthorName = (ID : number | undefined) => {
    return userState.users.find((user : User) => {return (user.id === ID);})?.nickname;
};

  return (<div>
    <TopBar />
    <Container>
      <Row className="Header-row">
        <Col>
          <Stack>
            <h1 className="Header">{item?.name}</h1>
            <h3>{findAuthorName(item?.seller)}</h3>
            <Image rounded style={{width: '24rem', height: '32rem'}} src={item?.image_url} />
          </Stack>
        </Col>
        <Col style={{paddingTop: '144px'}}>
          <OrderDetailForm 
                itemName='Melange twill shirt'
                sellerName='StyleNanda'
                quantity = {10}
                price = {199}
                recommendedSize = 'M'
              />
        </Col>
      </Row>
      <Row className="Header-row">
        <Col>
          <h1 className="Header">What others are saying</h1>
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
