import React from 'react'
import { Card, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons';
import { ReviewInfo } from '../store/slices/review';
/*eslint-disable */

export default function Review (props: { review: ReviewInfo }): JSX.Element {
  const review = props.review

  const navigate = useNavigate();
  
  return <div>
    <Card onClick = {() => navigate(`/community/${review.id}`)} style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://img.sbs.co.kr/newsnet/etv/upload/2020/10/28/30000654805_1280.jpg" style={{ width: '18rem' }} />
      <Card.Body>
        <Card.Title as= "h3">{review.content}</Card.Title>
        <Card.Text as= "p">{review.author}</Card.Text>
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