import React, { useEffect, useState } from 'react'
import { Button, Card, Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'
import { AppDispatch } from '../store'
import { fetchReviews, likePost, removeLikePost, selectReview } from '../store/slices/review'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { fetchUsers, selectUser, User } from '../store/slices/user'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'

export interface IProps {
  id: number
}

export default function Post (props: IProps): JSX.Element {
  const [loaded, setLoaded] = useState<boolean>(false)
  const [hover, setHover] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const reviewState = useSelector(selectReview)
  const userState = useSelector(selectUser)
  const itemState = useSelector(selectShopItem)

  useEffect(() => {
    const fetchRequired = async (): Promise<void> => {
      await dispatch(fetchReviews())
      await dispatch(fetchMainItems())
      await dispatch(fetchUsers())
      setLoaded(true)
    }
    fetchRequired().catch(() => {})
  }, [dispatch])

  if (loaded) {
    const review = reviewState.reviews.find((review) => review.id === props.id)!

    const findAuthorName = (ID: number | undefined): string | undefined => {
      return userState.users.find((user: User) => { return (user.id === ID) })?.nickname
    }

    const alreadyLiked = userState.currentLoggedIn?.liked_posts?.split(',')?.includes(review.id.toString()) ?? true

    const likeButtonHandler = async (): Promise<void> => {
      if (userState.currentLoggedIn === null) {
        window.alert('Guest can\'t give likes')
        return
      }

      // let alreadyLiked = false
      // // console.log(userState.currentLoggedIn.liked_posts)
      // if (userState.currentLoggedIn.liked_posts !== undefined) {
      //   const list = userState.currentLoggedIn.liked_posts.split(',')
      //   list.forEach((element) => {
      //     const liked = parseInt(element)
      //     if (liked === review!.id) {
      //       alreadyLiked = true
      //     }
      //   })
      //   console.log(list)
      // }

      if (alreadyLiked) {
        await dispatch(removeLikePost(review.id))
      } else await dispatch(likePost(review.id))
    }
    // console.debug(props.id)
    // console.debug(itemState.shopitems)

    return <div>
      <Card onClick = {() => navigate(`/community/${props.id}`)} style={{ width: '18rem' }} border={hover ? 'primary' : ''} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
        <Card.Img alt = "postimage" variant="top" src={review.image_url === '' ? '/bridgeUsLogo.png' : review.image_url} style={{ width: '17.9rem', height: '24rem', objectFit: 'cover' }} />
        <Card.Body>
          <Stack direction = 'horizontal'>
          <Stack direction = 'vertical'>
            <Card.Text as= "h5" data-testid = "rating">
              {
                Array.from({ length: ((review != null) ? review.rating : 0) }, (_, i) => i).map((key) => <Icon.StarFill key={key} />)
              }
              {
                Array.from({ length: 5 - ((review != null) ? review.rating : 0) }, (_, i) => i).map((key) => <Icon.Star key={key} />)
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
              }}>
                {
                  alreadyLiked ? <AiFillLike/> : <AiOutlineLike/>
                }</Button>
              {review?.likes}
            </Stack>
          </Stack>
        </Card.Body>
      </Card>
    </div>
  } else {
    return <div></div>
  }
}
