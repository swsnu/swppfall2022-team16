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
import { fetchTrendingPosts, selectReview } from '../store/slices/review'

export default function CommunityPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)
  const reviewState = useSelector(selectReview)

  useEffect(() => {
    dispatch(fetchMainItems())
    dispatch(fetchTrendingPosts())
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
         {
          reviewState.trending_posts
            ? reviewState.trending_posts.map((review) => <div>
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
                            <ShopItem shopItem={shopItemState.shopitems.find((shopitem) => shopitem.id === review.review_item)!} />
                        }
                      </Col>
                    </div>
                  <Col>
                  <div className = 'trendingpost'>
                      <h5 id ='postitself'>Trending Post</h5>
                      <Post id={review.id} />
                    </div>
                  </Col>
                  <Col>
                    <PostComments review_id={review.id} />
                  </Col>
                </Row>
              </div>
            </div>)
            : false
         }
    </div>
    </div>
    <Footer/>
  </div>)
}
