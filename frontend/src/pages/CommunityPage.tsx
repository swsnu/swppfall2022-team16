import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post'
import PostComments from '../components/PostComments'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'
import Footer from '../components/Footer'
/*eslint-disable */

export default function CommunityPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)

  useEffect(() => {
    dispatch(fetchMainItems())
  }, [dispatch])

  return (<div>
    <TopBar />
    <Container>
      <Row>
        <Col>
          {
            shopItemState.shopitems &&
              shopItemState.shopitems[0] &&
            <ShopItem shopItem={shopItemState.shopitems[0]} />
          }
        </Col>
        <Col>
          <Post id={1} />
        </Col>
        <Col>
          <PostComments review_id={1} />
        </Col>
      </Row>
    </Container>
    <Footer/>
  </div>)
}
