import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Post from '../components/Post'
import PostComments from '../components/PostComments'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
/*eslint-disable */

export default function CommunityPage (): JSX.Element {
  return (<Container>
    <Row>
      <Col>
        <TopBar />
      </Col>
    </Row>
    <Row>
      <Col>
        <ShopItem />
      </Col>
      <Col>
        <Post />
      </Col>
      <Col>
        <PostComments />
      </Col>
    </Row>
  </Container>)
}
