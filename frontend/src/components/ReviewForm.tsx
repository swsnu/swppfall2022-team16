import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../store'
import { postReview, selectReview } from '../store/slices/review'
/*eslint-disable */

export interface IProps {
  shopItemId: number
}

export default function ReviewForm (props : IProps): JSX.Element {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedImage, setSelectedImage] = useState("");

  const [tmpRating, setTmpRating] = useState<number>(3)
  const [rating, setRating] = useState<number>(3)
  const [isMouseOnStar, setIsMouseOnStar] = useState<boolean>(false)
    
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const reviewState = useSelector(selectReview)
  
  const postReviewButtonHandler = async () => {
    console.log(title, description, props.shopItemId, rating)
    const result = await dispatch(postReview({title: title, content: description, review_item: props.shopItemId, rating: rating}))
    if (result.type === `${postReview.typePrefix}/fulfilled`) {
      navigate(`/community/${reviewState.current_review?.id}`)
    }
  }

  return (
    <div>
      <Form>
        <Form.Group className='Title' controlId = "reviewForm">
        <Form.Label>Title</Form.Label>
        <Form.Control type = "title" placeholder='Karinas outfit from LA' onChange={(e) => setTitle(e.target.value)}/>
        </Form.Group>
        <Form.Group className='Description' controlId = "reviewForm">
        <Form.Label>Description</Form.Label>
        <Form.Control type = "description" placeholder='This is amazing' onChange={(e) => setDescription(e.target.value)}/>
        </Form.Group>
        <Form.Group className='Upload_Photo' controlId = "reviewForm">
        <Form.Label>Upload Your Photo</Form.Label>
        <Form.Control type = "file" accept='image/jpeg, image/png' placeholder='upload your photo' onChange={(e) => setSelectedImage(e.target.value)}/>
        </Form.Group>
        <div>
          <span onMouseOver={() => setIsMouseOnStar(true)} onMouseOut={() => setIsMouseOnStar(false)}>
            {
              [1, 2, 3, 4, 5].map((idx) => (idx <= (isMouseOnStar ? tmpRating : rating) ?
                <Icon.StarFill key={idx} onMouseOver={() => setTmpRating(idx)} onClick={() => setRating(idx)} size={24} /> :
                <Icon.Star key={idx} onMouseOver={() => setTmpRating(idx)} onClick={() => setRating(idx)} size={24} /> ))
            }
          </span>
        </div>
        <Button variant = "secondary" onClick={() => postReviewButtonHandler()}>
          Post Your Review
        </Button>
      </Form>
      </div>
  )
}
