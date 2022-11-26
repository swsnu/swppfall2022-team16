import React, { useEffect } from 'react'
import TopBar from '../components/TopBar'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Purchased from '../components/Purchased'
import CommunityAlert from '../components/CommunityAlert'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import Footer from '../components/Footer'
import { Col, Container, Image, ListGroup, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { fetchOrders, selectUserOrder } from '../store/slices/userorder'
import '../css/Footer.css'

export default function MyPage (): JSX.Element {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const userOrderState = useSelector(selectUserOrder)

  const time = new Date()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  return (<div className = 'page-container'>
    <div className = 'contents'>
    <TopBar />
    <br/>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Img variant="top" src="../mypagebackground.jpg" />
              <Card.ImgOverlay style={{ textAlign: 'center' }}>
                <Image className = "profilepicture" src = '../mypageprofile.png' height = {150} width = {150} style={{ alignSelf: 'center', marginTop: '72px' }}></Image>
                <Card.Title style={{ fontSize: '30px', color: 'white' }}>Alice</Card.Title>
              </Card.ImgOverlay>
              <Card.Body style={{ textAlign: 'center' }}>
                <Button variant="primary">Edit</Button>
              </Card.Body>
            </Card>
            <h1 className="Header-row  Header">Purchased</h1>
            <ListGroup>
              {
                userOrderState.userOrders.filter((userOrder) => userOrder.user_id === Number(id))
                  .map((userOrder) =>
                    <ListGroup.Item key={userOrder.id}>
                      <Purchased order={userOrder} />
                    </ListGroup.Item>)
              }
              {/* <ListGroup.Item>
                <Purchased
                  itemName='Melange twill shirt'
                  itemPrice = {209}
                  shippingStatus = "Shipping"
                  purchaseDate = "2022/10/27"
                  />
              </ListGroup.Item>
              <ListGroup.Item>
                <Purchased
                  itemName='BTS orange hoodle'
                  itemPrice = {59}
                  shippingStatus = "Complete"
                  purchaseDate = "2022/10/27"
                  />
              </ListGroup.Item> */}
            </ListGroup>

            <br/>
            <h1 className="Header-row Header">Community</h1>
            <ListGroup>
              <ListGroup.Item action>
                <CommunityAlert
                  newCommentAuthor='Bethany'
                  newCommentPostedTime = {time}
                  newCommentedPostId={1}
                />
              </ListGroup.Item>
              <ListGroup.Item action>
                <CommunityAlert
                  newCommentAuthor='Adam'
                  newCommentPostedTime = {time}
                  newCommentedPostId={1}
                />
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
    <Footer/>
  </div>)
}
