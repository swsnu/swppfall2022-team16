import React, { useEffect } from 'react'
import { Col, Row, Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post'
import PostComments from '../components/PostComments'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'
import Footer from '../components/Footer'
import '../css/Footer.css'
import '../css/communitypage.css'
/*eslint-disable */

export default function CommunityPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)

  useEffect(() => {
    dispatch(fetchMainItems())
  }, [dispatch])

  return (
  <div className = 'page-container'>
    <div className = 'contents'>
    <TopBar />
    <div className = 'mainsection'>
        <div className = 'community'>
          <a href = '/community'>
            <img src = '/communitybanner.png' width = '100%'></img>
          </a>
         </div>
         <div className = 'theheader'>
          Community
         </div>
        <Row className="Header-row" >
          <Col>
            <h4 id = 'title'>Karina</h4>
          </Col>
        </Row>
        <Row md={4}>
          <Stack direction = 'horizontal'>
            <div className = 'spacing'></div>
            <div className = 'white'>
              <Col>
                {
                  shopItemState.shopitems &&
                    shopItemState.shopitems[2] &&
                  <ShopItem shopItem={shopItemState.shopitems[2]} />
                }
              </Col>
            </div>
          </Stack>
          <Col>
          <div className = 'trendingpost'>
              <h5 id ='postitself'>Trending Post</h5>
              <Post id={2} />
            </div>
          </Col>
          <Col>
            <PostComments review_id={2} />
          </Col>
        </Row>
      <Row className="Header-row">
        <Col>
          <h4>Suga</h4>
        </Col>
      </Row>
      <Row md={4} style={{backgroundColor: 'gainsboro', padding: '16px 0'}}>
        <Col>
          {
            shopItemState.shopitems &&
              shopItemState.shopitems[0] &&
            <ShopItem shopItem={shopItemState.shopitems[0]} />
          }
        </Col>
        <Col>
          <h4>Trending Post</h4>
          <Post id={1} />
        </Col>
        <Col>
          <PostComments review_id={1} />
        </Col>
      </Row>
    </div>
    </div>
    <Footer/>
  </div>)
}
