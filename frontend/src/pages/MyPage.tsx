import React from 'react'
import TopBar from '../components/TopBar'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Purchased from '../components/Purchased'
import CommunityAlert from '../components/CommunityAlert'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import Footer from '../components/Footer'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
/*eslint-disable */

export default function MyPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  let time = new Date();

  return (<div>
    <TopBar />
    <br/>
    <>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Img variant="top" src="../mypagebackground.jpg" />
                <Card.ImgOverlay>
                  <img className = "profilepicture" src = '../mypageprofile.png' height = {150} width = {150} style={{ alignSelf: 'center' }}></img>
                  <Card.Title>Alice</Card.Title>
                </Card.ImgOverlay>
                <Card.Body>
                  <Button variant="primary">Edit</Button>
                </Card.Body>
            </Card>
            <h1>Purchased</h1>
            <ListGroup>
              <ListGroup.Item>
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
              </ListGroup.Item>
            </ListGroup>

            <br/>
            <h1>Community</h1>
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
    </>
    <Footer/>
  </div>)
}
