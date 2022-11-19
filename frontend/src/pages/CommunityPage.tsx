import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
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
            <img src = '/bannerforcommunity.png' width = '100%'></img>
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
        <div className = 'postsection'>
          <Row md={4}>
              <div className = 'white'>
                <Col>
                  {
                    shopItemState.shopitems &&
                      shopItemState.shopitems[2] &&
                    <ShopItem shopItem={shopItemState.shopitems[2]} />
                  }
                </Col>
              </div>
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
        </div>
        <Row className="Header-row" >
          <Col>
            <h4 id = 'title'>Suga</h4>
          </Col>
        </Row>
        <div className = 'postsection'>
          <Row md={4}>
              <div className = 'white'>
                <Col>
                  {
                    shopItemState.shopitems &&
                      shopItemState.shopitems[0] &&
                    <ShopItem shopItem={shopItemState.shopitems[0]} />
                  }
                </Col>
              </div>
            <Col>
            <div className = 'trendingpost'>
                <h5 id ='postitself'>Trending Post</h5>
                <Post id={1} />
              </div>
            </Col>
            <Col>
              <PostComments review_id={1} />
            </Col>
          </Row>
        </div>
    </div>
    </div>
    <Footer/>
  </div>)
}
