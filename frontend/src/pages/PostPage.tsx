import React from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Post from '../components/Post'
import PostComments from '../components/PostComments'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
/*eslint-disable */

export default function PostPage (): JSX.Element {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  return (<div>
    <TopBar />
    <Container>
      <Row>
        <Col>
          <Post id={Number(id)} />
        </Col>
        <Col>
          <PostComments review_id={Number(id)} />
          <InputGroup>
            <Form.Control />
            <Button>Comment</Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
    <Footer/>
  </div>)
}
