import React, { useEffect, useState } from 'react'
import { Card, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'
import { ReviewInfo } from '../store/slices/review'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import { fetchUsers, selectUser, User } from '../store/slices/user'

export default function Review (props: { review: ReviewInfo }): JSX.Element {
  const [hover, setHover] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const userState = useSelector(selectUser)
  const review = props.review

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const findAuthorName = (ID: number | undefined) => {
    return userState.users.find((user: User) => { return (user.id === ID) })?.nickname
  }

  const navigate = useNavigate()

  return <div>
    <Card onClick = {() => navigate(`/community/${review.id}`)} style={{ width: '18rem' }} border={hover ? 'primary' : ''} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <Card.Img alt = "review image" variant="top" src={review.image_url} style={{ width: '17.9rem', height: '24rem', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title >{review.content}</Card.Title>
        <Card.Text >{findAuthorName(review.author)}</Card.Text>
        <Stack direction = 'horizontal'>
          {
            Array.from({ length: review.rating }, (_, i) => i).map((key) => <Icon.StarFill key={key} />)
          }
          {
            Array.from({ length: 5 - review.rating }, (_, i) => i).map((key) => <Icon.Star key={key} />)
          }
        </Stack>
      </Card.Body>
    </Card>
  </div>
}
