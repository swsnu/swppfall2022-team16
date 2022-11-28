import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row, Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import OrderDetailForm from '../components/OrderDetailForm'
import Review from '../components/Review'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import { fetchMainItem, selectShopItem } from '../store/slices/shopitem'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { fetchReviews, selectReview } from '../store/slices/review'
import { fetchUsers, selectUser, User } from '../store/slices/user'
import '../css/Footer.css'

export default function ProductPage (): JSX.Element {
  const [loaded, setLoaded] = useState<boolean>(false)
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)
  const reviewState = useSelector(selectReview)
  const userState = useSelector(selectUser)

  useEffect(() => {
    const fetchRequired = async (): Promise<void> => {
      await dispatch(fetchMainItem(Number(id)))
      await dispatch(fetchReviews())
      await dispatch(fetchUsers())
      setLoaded(true)
    }
    fetchRequired().catch(() => {})
  }, [dispatch])

  if (loaded) {
    const item = shopItemState.current_shopitem
    const reviews = reviewState.reviews.filter((review) => review.review_item === Number(id))

    const findAuthorName = (ID: number | undefined) => {
      return userState.users.find((user: User) => { return (user.id === ID) })?.nickname
    }

    return (<div className = 'page-container'>
      <div className = 'contents'>
      <TopBar />
      <Container>
        <Row className="Header-row">
          <Col>
            <Stack>
              <h1 className="Header">{item?.name}</h1>
              <h3>{findAuthorName(item?.seller)}</h3>
              <Image rounded style={{ width: '24rem', height: '32rem' }} src={item?.image_url} />
            </Stack>
          </Col>
          <Col style={{ paddingTop: '144px' }}>
            <OrderDetailForm
                  itemID={item?.id}
                  itemName={item?.name}
                  sellerName={findAuthorName(item?.seller)}
                  rating={item?.rating}
                  colors={['White', 'Black', 'Brown']}
                  quantity = {10}
                  price = {item?.price}
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
            reviews.length > 0
              ? reviews.map((review) => <Col key={review.id}><Review review={review}/></Col>)
              : <Col>No reviews yet.</Col>
          }
        </Row>
      </Container>
      </div>
      <Footer/>
    </div>)
  } else {
    return <div></div>
  }
}
