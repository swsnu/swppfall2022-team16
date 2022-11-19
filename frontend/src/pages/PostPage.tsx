import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post'
import PostComments from '../components/PostComments'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchMainItems, selectShopItem, ShopItemInfo } from '../store/slices/shopitem'
import { fetchReviews, selectReview } from '../store/slices/review'
import { fetchUsers, selectUser, User } from '../store/slices/user'
import '../css/Footer.css'
import { CommentInfo, deleteComment, postComment, putComment } from '../store/slices/comment'
/*eslint-disable */

export default function PostPage (): JSX.Element {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')
  const reviewState = useSelector(selectReview)
  const itemState = useSelector(selectShopItem)
  const userState = useSelector(selectUser)

  useEffect(() => {
    dispatch(fetchMainItems())
    dispatch(fetchUsers())
    dispatch(fetchReviews())
  }, [dispatch])

  const findAuthorName = (ID : number | undefined) => {
    return userState.users.find((user : User) => {return (user.id === ID);})?.nickname;
  };

  const commentButtonHandler = () => {
    setComment("")
    const data = {review_id: Number(id), content: comment}
    dispatch(postComment(data))
  }

  const commentEditButtonHandler = (comment: CommentInfo) => {  
    let notice = window.prompt("Edit Comment", comment.content);
    if(notice === null){
        return;
    }
    else if(notice.length === 0){
        alert("user cannot create empty comment");
    }
    else{
        const EdittedComment = {...comment, content: notice};
        dispatch(putComment(EdittedComment));
    }
};

const commentDeleteButtonHandler = (comment: CommentInfo) => {
    dispatch(deleteComment(comment.id));
};

  const review = reviewState.reviews.find((review) => review.id === Number(id))!

  const item = itemState.shopitems.find((item : ShopItemInfo) => item.id === review.review_item)!

  return (
  <div className = 'page-container'>
      <div className = 'contents'>
    <TopBar />
    <Container>
      <Row>
        <Col>
          <h1>{item.name}</h1>
          <p>{findAuthorName(item.seller)}</p>
          <Post id={Number(id)} />
          <Button onClick={() => navigate(`/product/${review.review_item}`)}>Purchase the Look</Button>
        </Col>
        <Col>
          <PostComments review_id={Number(id)} />
          <InputGroup>
          <Form.Control type='commment' onChange = {(e) => setComment(e.target.value)} />
            <Button onClick={() => commentButtonHandler()}>Comment</Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
    </div>
    <Footer/>
  </div>)
}
