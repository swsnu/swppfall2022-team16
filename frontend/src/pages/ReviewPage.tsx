import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReviewForm from '../components/ReviewForm'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import '../css/Footer.css'
/*eslint-disable */


export default function ReviewPage (): JSX.Element {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)

  useEffect(() => {
    dispatch(fetchMainItems())
  }, [dispatch])

  return (<div className = 'page-container'>
    <div className = 'contents'>
    <TopBar />
    <Container>
      <Row>
        <Col>
          <h1>Write your review</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ShopItem shopItem={shopItemState.shopitems.find((shopitem) => shopitem.id === Number(id))!} />
        </Col>
        <Col>
          <ReviewForm shopItemId = {id}/>
        </Col>
      </Row>
    </Container>
    </div>
    <Footer/>
  </div>)
}
