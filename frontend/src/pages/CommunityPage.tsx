import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Post from '../components/Post'
import PostComments from '../components/PostComments'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
/*eslint-disable */

export default function CommunityPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  return (<div>
    <TopBar />
    <Container>
      <Row>
        <Col>
          <ShopItem shopItem={null} />
        </Col>
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
