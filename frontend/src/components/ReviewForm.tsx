import React from 'react'
import { Card, Form, Button } from 'react-bootstrap';
/*eslint-disable */

export default function ReviewForm (): JSX.Element {
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
        <Form.Control type = "image" placeholder=''/>
        </Form.Group>
        <Form.Select aria-label = "Rating">
          <option>Rank Your Outfit</option>
          <option value = "1">One</option>
          <option value = "2">Two</option>
          <option value = "3">Three</option>
          <option value = "4">Four</option>
          <option value = "5">Five</option>
        </Form.Select>
        <Button variant = "secondary" type = "submit">
         Post Your Review
        </Button>
      </Form>
      </div>
  )
}
