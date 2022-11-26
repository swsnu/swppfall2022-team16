import React, { useEffect, useState } from 'react'
import { Button, Card, Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'
import { AppDispatch } from '../store'
import { fetchReviews, likePost, selectReview } from '../store/slices/review'
import { AiFillLike } from 'react-icons/ai'
import { fetchUsers, selectUser, User } from '../store/slices/user'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'

export interface IProps {
  id: number
}

export default function Post (props: IProps): JSX.Element {
  const [hover, setHover] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const reviewState = useSelector(selectReview)
  const userState = useSelector(selectUser)
  const itemState = useSelector(selectShopItem)
  const [numLike, setNumLike] = useState(1000) // have to get info from DB

  useEffect(() => {
    dispatch(fetchReviews()).then(() => {
      setNumLike(review.likes)
    })
    dispatch(fetchMainItems())
    dispatch(fetchUsers())
  }, [dispatch])

  const likeButtonHandler = async () => {
    if (userState.currentLoggedIn === null)
        return;
    
    var alreadyLiked = false;
    console.log(userState.currentLoggedIn.liked_posts)
    if (userState.currentLoggedIn.liked_posts !== undefined){
      var list = userState.currentLoggedIn.liked_posts.split(',');
      for (var element in list){
        var liked = parseInt(element);
        if (liked == review.id){
          alreadyLiked = true;
          break;
        }
      }
    }

    if (alreadyLiked)
        alert("You already liked the post.")
    else await dispatch(likePost(review.id))
  }
  const review = reviewState.reviews.find((review) => review.id === props.id)

  const findAuthorName = (ID: number | undefined) => {
    return userState.users.find((user: User) => { return (user.id === ID) })?.nickname
  }
  // console.debug(props.id)
  // console.debug(itemState.shopitems)

  return <div>
    <Card onClick = {() => navigate(`/community/${props.id}`)} style={{ width: '18rem' }} border={hover ? 'primary' : ''} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <Card.Img alt = "postimage" variant="top" src={review?.image_url} style={{ width: '17.9rem', height: '24rem', objectFit: 'cover' }} />
      <Card.Body>
        <Stack direction = 'horizontal'>
        <Stack direction = 'vertical'>
          <Card.Text as= "h5" data-testid = "rating">
            {
              Array.from({ length: review?.rating && 0 }, (_, i) => i).map((key) => <Icon.StarFill key={key} />)
            }
            {
              Array.from({ length: 5 - (review?.rating && 0) }, (_, i) => i).map((key) => <Icon.Star key={key} />)
            }
          </Card.Text>
          <Card.Text as= "h5" data-testid = "author">
            @{findAuthorName(review?.author)}
          </Card.Text>
          </Stack>
          <Stack direction = "horizontal">
          <Button style={{ verticalAlign: 'middle' }} variant = "default" onClick={(e) => {
            e.stopPropagation()
            likeButtonHandler()
          }}><AiFillLike/></Button>
            {numLike}
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  </div>
}
