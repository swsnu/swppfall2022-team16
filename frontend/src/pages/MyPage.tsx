import React, { useEffect, useState } from 'react'
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
import { fetchRelatedComments, selectComment } from '../store/slices/comment'
import { selectUser, User } from '../store/slices/user'

export default function MyPage (): JSX.Element {
  const [loaded, setLoaded] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const userOrderState = useSelector(selectUserOrder)
  const commentState = useSelector(selectComment)
  const userState = useSelector(selectUser)
  const id = userState.currentLoggedIn?.id

  const time = new Date()

  useEffect(() => {
    const fetchRequired = async (): Promise<void> => {
      await dispatch(fetchOrders())
      await dispatch(fetchRelatedComments())
      setLoaded(true)
    }
    fetchRequired().catch(() => {})
  }, [dispatch])

  if (loaded) {
    const findAuthorName = (ID: number | undefined): string | undefined => {
      return userState.users.find((user: User) => { return (user.id === ID) })?.nickname
    }

    return (<div className = 'page-container'>
      <div className = 'contents'>
      <TopBar />
      <br/>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Img variant="top" src="../mypagebackground.jpg" style={{ width: 'auto', height: '24rem', objectFit: 'cover' }} />
                <Card.ImgOverlay style={{ textAlign: 'center' }}>
                  <Image className = "profilepicture" src = '../mypageprofile.png' height = {150} width = {150} style={{ alignSelf: 'center', marginTop: '72px' }}></Image>
                  <Card.Title style={{ fontSize: '30px', color: 'black' }}>{findAuthorName(Number(id))}</Card.Title>
                </Card.ImgOverlay>
              </Card>
              <h1 className="Header-row  Header">Purchased</h1>
              <ListGroup>
                {
                  userOrderState.userOrders.filter((userOrder) => userOrder.user_id === Number(id) && userOrder.status !== 0)
                    .map((userOrder) =>
                      <ListGroup.Item key={userOrder.id}>
                        <Purchased order={userOrder} />
                      </ListGroup.Item>)
                }
              </ListGroup>

              <br/>
              <h1 className="Header-row Header">Community</h1>
              <ListGroup>
                {
                  commentState.comments.map((comment) => {
                    return <ListGroup.Item key={comment.id} action>
                      <CommunityAlert
                        newCommentAuthor={findAuthorName(comment.author)!}
                        newCommentPostedTime = {comment.created_at}
                        newCommentedPostId={comment.review}
                      />
                    </ListGroup.Item>
                  })
                }
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer/>
    </div>)
  } else {
    return <div></div>
  }
}
