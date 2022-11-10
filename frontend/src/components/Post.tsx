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
import { fetchUsers, selectUser, User } from '../store/slices/user';
/*eslint-disable */

export interface IProps {
  id: number
}

export default function Post(props: IProps): JSX.Element {
  const [hover, setHover] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const reviewState = useSelector(selectReview)
  const userState = useSelector(selectUser)
  const [numLike, setNumLike] = useState(1000); // have to get info from DB

  useEffect(() => {
    dispatch(fetchReviews()).then(() => {
      setNumLike(reviewState.reviews.find((review) => review.id === props.id)?.likes ?? 0)
    })
    dispatch(fetchUsers())
  }, [dispatch])
  
  const likeButtonHandler = () => {setNumLike(numLike + 1)}; // axios command necessary
  const review = reviewState.reviews.find((review) => review.id === props.id)
  
  const findAuthorName = (ID : number | undefined) => {
    return userState.users.find((user : User) => {return (user.id === ID);})?.nickname;
};

  return <div>
    <Card onClick = {() => navigate(`/community/${props.id}`)} style={{ width: '18rem' }} border={hover ? 'primary' : ''} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <Card.Img variant="top" src={review?.image_url} style={{ width: '17.9rem', height: '24rem', objectFit: 'cover'}} />
      <Card.ImgOverlay>
        <Stack direction = "horizontal">
          <div className="me-auto"></div>
          <Button style={{verticalAlign: 'middle'}} variant = "default" onClick={(e) => {
            e.stopPropagation()
            likeButtonHandler()
            }}><AiFillLike/></Button>
          {numLike}
        </Stack>
      </Card.ImgOverlay>
      <Card.Body>
        <Card.Text as= "h5">
          @{findAuthorName(review?.author)}
        </Card.Text>
      </Card.Body> 
    </Card>
  </div>
}
