import { appendFileSync } from 'fs';
import React, { useEffect, useState } from 'react'
import { Button, Card, Stack } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom'
import { AppDispatch } from '../store';
import { fetchReviews, selectReview } from '../store/slices/review';
import * as Icon from 'react-bootstrap-icons';
import {AiFillLike} from "react-icons/ai"
/*eslint-disable */

export interface IProps {
  id: number
}

export default function Post(props: IProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const reviewState = useSelector(selectReview)
  const [numLike, setNumLike] = useState(1000); // have to get info from DB

  useEffect(() => {
    dispatch(fetchReviews())
  }, [dispatch])
  
  const likeButtonHandler = () => {setNumLike(numLike + 1)}; // axios command necessary

  return <div>
    <Card onClick = {() => navigate(`/community/${props.id}`)} style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://img.sbs.co.kr/newsnet/etv/upload/2020/10/28/30000654805_1280.jpg" style={{ width: '18rem' }} />
      <Card.ImgOverlay>
        <Stack direction = "horizontal">
        <Button variant = "default" onClick={(e) => {
          e.stopPropagation()
          likeButtonHandler()
          }}><AiFillLike/></Button>
        <p>{numLike}</p>
        </Stack>
      </Card.ImgOverlay>
      <Card.Body>
        <Card.Text as= "h5">
          {reviewState.reviews.find((review) => review.id === props.id)?.author}
        </Card.Text>
      </Card.Body> 
    </Card>
  </div>
}
