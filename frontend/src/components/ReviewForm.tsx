import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
/*eslint-disable */

export default function ReviewForm (): JSX.Element {
  const [tmpRating, setTmpRating] = useState<number>(3)
  const [rating, setRating] = useState<number>(3)
  const [isMouseOnStar, setIsMouseOnStar] = useState<boolean>(false)

  return (
    <div>
      <Form>
        <Form.Group className='Title' controlId = "reviewForm">
        <Form.Label>Title</Form.Label>
        <Form.Control type = "title" placeholder='Karinas outfit from LA'/>
        </Form.Group>
        <Form.Group className='Description' controlId = "reviewForm">
        <Form.Label>Description</Form.Label>
        <Form.Control type = "description" placeholder='This is amazing'/>
        </Form.Group>
        <Form.Group className='Upload_Photo' controlId = "reviewForm">
        <Form.Label>Upload Your Photo</Form.Label>
        <Form.Control type = "file" accept='image/jpeg, image/png' placeholder='upload your photo'/>
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
        <Button variant = "secondary">
          Post Your Review
        </Button>
      </Form>
      </div>
  )
}
