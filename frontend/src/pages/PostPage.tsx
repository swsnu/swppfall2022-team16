import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Post from '../components/Post'
import PostComments from '../components/PostComments'
import TopBar from '../components/TopBar'
/*eslint-disable */

export default function PostPage (): JSX.Element {
  return (<div>
    <TopBar />
    <Container>
      <Row>
        <Col>
          <Post />
        </Col>
        <Col>
          <PostComments />
        </Col>
      </Row>
    </Container>
  </div>)
}
