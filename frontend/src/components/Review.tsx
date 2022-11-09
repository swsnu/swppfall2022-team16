import React, { useEffect } from 'react'
import { Card, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons';
import { ReviewInfo } from '../store/slices/review';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchUsers, selectUser, User } from '../store/slices/user';
/*eslint-disable */

export default function Review (props: { review: ReviewInfo }): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const userState = useSelector(selectUser)
  const review = props.review

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const findAuthorName = (ID : number | undefined) => {
          return userState.users.find((user : User) => {return (user.id === ID);})?.nickname;
      };

  const navigate = useNavigate();
  
  return <div>
    <Card onClick = {() => navigate(`/community/${review.id}`)} style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://img.sbs.co.kr/newsnet/etv/upload/2020/10/28/30000654805_1280.jpg" style={{ width: '18rem', height: '24rem', objectFit: 'cover'}} />
      <Card.Body>
        <Card.Title as= "h3">{review.content}</Card.Title>
        <Card.Text as= "p">{findAuthorName(review.author)}</Card.Text>
        <Stack direction = 'horizontal'>
          <Icon.StarFill/>
          <Icon.StarFill/>
          <Icon.StarFill/>
          <Icon.StarFill/>
          <Icon.StarFill/>
        </Stack>
      </Card.Body>
    </Card>
  </div>
}