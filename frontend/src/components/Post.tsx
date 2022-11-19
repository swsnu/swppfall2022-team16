import React, { useEffect, useState } from 'react'
import { Button, Card, Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'
import { AppDispatch } from '../store'
import { fetchReviews, selectReview } from '../store/slices/review'
import { AiFillLike } from 'react-icons/ai'
import { fetchUsers, selectUser, User } from '../store/slices/user'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'
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
  const itemState = useSelector(selectShopItem)
  const [numLike, setNumLike] = useState(1000); // have to get info from DB

  useEffect(() => {
    dispatch(fetchReviews()).then(() => {
      setNumLike(reviewState.reviews.find((review) => review.id === props.id)?.likes ?? 0)
    })
    dispatch(fetchMainItems())
    dispatch(fetchUsers())
  }, [dispatch])
  
  const likeButtonHandler = () => {setNumLike(numLike + 1)}; // axios command necessary
  const review = reviewState.reviews.find((review) => review.id === props.id)!
  
  const findAuthorName = (ID : number | undefined) => {
    return userState.users.find((user : User) => {return (user.id === ID);})?.nickname;
};
  console.debug(props.id)
  console.debug(itemState.shopitems)


  return <div>
    <Card onClick = {() => navigate(`/community/${props.id}`)} style={{ width: '18rem' }} border={hover ? 'primary' : ''} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <Card.Img alt = "postimage" variant="top" src={review?.image_url} style={{ width: '17.9rem', height: '24rem', objectFit: 'cover'}} />
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
        <Stack direction = 'horizontal'>
          <Card.Text as= "h5" data-testid = "test">
            {
              Array.from({length: review.rating}, (_, i) => i).map((key) => <Icon.StarFill key={key} />)
            }
            {
              Array.from({length: 5 - review.rating}, (_, i) => i).map((key) => <Icon.Star key={key} />)
            }
          </Card.Text>
          <div className = "ms-auto">
          <Card.Text as= "h5" data-testid = "test">
            @{findAuthorName(review?.author)}
          </Card.Text>
          </div>
        </Stack>
      </Card.Body> 
    </Card>
  </div>
}
