import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post'
import PostComments from '../components/PostComments'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchMainItem, selectShopItem, ShopItemInfo } from '../store/slices/shopitem'
import { fetchReview, selectReview } from '../store/slices/review'
import { fetchUsers, selectUser, User } from '../store/slices/user'
import '../css/Footer.css'
import '../css/PostPage.css'
import { postComment } from '../store/slices/comment'
import { unwrapResult } from '@reduxjs/toolkit'

export default function PostPage (): JSX.Element {
  const [loaded, setLoaded] = useState<boolean>(false)
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')
  const reviewState = useSelector(selectReview)
  const itemState = useSelector(selectShopItem)
  const userState = useSelector(selectUser)
  const alertMessage = 'Comment is empty'

  useEffect(() => {
    const fetchRequired = async (): Promise<void> => {
      await dispatch(fetchUsers())
      const result = unwrapResult(await dispatch(fetchReview(Number(id))))
      await dispatch(fetchMainItem(result.review_item))
      setLoaded(true)
    }
    fetchRequired().catch(() => {})
  }, [dispatch])

  if (loaded) {
    const findAuthorName = (ID: number | undefined): string | undefined => {
      return userState.users.find((user: User) => { return (user.id === ID) })?.nickname
    }

    const commentButtonHandler = (): void => {
      if (comment.length >= 1) {
        const data = { review_id: Number(id), content: comment }
        dispatch(postComment(data))
        setComment('')
      } else {
        return window.alert(alertMessage)
      }
    }

    const review = reviewState.reviews.find((review) => review.id === Number(id))!

    const item = itemState.shopitems.find((item: ShopItemInfo) => item.id === review.review_item)!

    return (
    <div className = 'page-container'>
        <div className = 'contents'>
        <style type="text/css">
          {`
              
              .btn-showmore {
                background-image: linear-gradient(to right, #5f2c82 0%, #49a09d  51%, #5f2c82  100%);
                text-align: center;
                transition: 0.5s;
                background-size: 200% auto;
                color: white;       
                font-weight : bold;     
                box-shadow: 0 0 20px #eee;
                border-radius: 10px;
              }
    
              .btn-showmore:hover {
                background-position: right center; /* change the direction of the change here */
                color: #FFE5B4;
                text-decoration: none;
              }
      `}
        </style>
      <TopBar />
      <div className = 'spacing'></div>
      <Container>
        <Row>
          <Col>
            <h1>{itemState.current_shopitem?.name}</h1>
            <p>{findAuthorName(itemState.current_shopitem?.seller)}</p>
            <Post id={Number(id)} />
            <div className = 'spacing'></div>
            <Button variant = 'showmore' onClick={() => navigate(`/product/${reviewState.current_review?.review_item}`)}>Purchase the Look</Button>
          </Col>
          <Col>
          <div className = 'spacing2'></div>
            <PostComments review_id={Number(id)} />
            <InputGroup>
            <Form.Control type='commment' onChange = {(e) => setComment(e.target.value)} value = {comment} />
            <Button onClick={() => commentButtonHandler()}>Comment</Button>
            </InputGroup>
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
