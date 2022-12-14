import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../components/Banner'
import Filter, { filters } from '../components/Filter'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import { fetchMainItems, fetchTopResult, selectShopItem } from '../store/slices/shopitem'
import Footer from '../components/Footer'
import { fetchUsers } from '../store/slices/user'
import { AiOutlineFilter } from 'react-icons/ai'
import { fetchTrendingPosts, selectReview } from '../store/slices/review'
import Post from '../components/Post'
import '../css/mainpage.css'
import '../css/Footer.css'
import '../css/Banner.css'

export default function MainPage (): JSX.Element {
  const [loaded, setLoaded] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)
  const [tags, setTags] = useState<string[]>([])
  const [showMoreCount, setShowMoreCount] = useState(4)
  const reviewState = useSelector(selectReview)

  useEffect(() => {
    const fetchRequired = async (): Promise<void> => {
      await dispatch(fetchMainItems())
      await dispatch(fetchTopResult({ text: '', tags: [] }))
      await dispatch(fetchUsers())
      await dispatch(fetchTrendingPosts())
      setLoaded(true)
    }
    fetchRequired().catch(() => {})
  }, [dispatch])

  if (loaded) {
    const tagHandler = (remove: string, add: string): void => {
      // console.log('Remove:' + remove)
      // console.log('Add:' + add)
      setTags(tags.filter((val) => val !== remove.toLowerCase()).concat(add.toLowerCase()).filter((val) => val !== ''))
    }

    const showMoreHandler = (): void => {
      setShowMoreCount(showMoreCount + 4)
    }

    return (
    <div className = 'page-container'>
      <style type="text/css">
          {`
              
              .btn-showmore {
                background-image: linear-gradient(to right, #5f2c82 0%, #49a09d  51%, #5f2c82  100%);
                text-align: center;
                transition: 0.5s;
                background-size: 200% auto;
                color: white;       
                font-weight : bold;     
                box-shadow: 0 0 20px #eee;
                border-radius: 10px;
              }
    
              .btn-showmore:hover {
                background-position: right center; /* change the direction of the change here */
                color: #FFE5B4;
                text-decoration: none;
              }
      `}
        </style>
      <div className = 'contents'>
      <TopBar />
      <div className = 'banner'>
            <Banner />
      </div>
      <div className = 'recommend'>
      <Container>
        <div className = 'spacing'></div>
        <div className = 'mainpage'>
        <Row className="Header-row">
          <Col md={3}>
            <Stack direction = 'horizontal' gap = {1}>
              <h3 id = 'Trending'>Trending</h3>
              <img src = '/trending-1.png' width = '25' height = '30'></img>
            </Stack>
          </Col>
          <Col md={6}></Col>
          {
            filters.map(({ category, options }) => <Col key={category} md={1}>
              <Filter key={category} data-testid={`tag_${category}`} category={category} options={options} handler={tagHandler}/>
            </Col>)
          }
          <Col md={1}>
            <Button data-testid='apply-filter' style={{ backgroundColor: 'transparent', color: 'black', borderColor: 'black' }} onClick={() => { dispatch(fetchTopResult({ text: '', tags })) }}>
              <AiOutlineFilter />
            </Button>
          </Col>
        </Row>
        <Row>
          <div className = 'spacingbetweenword'></div>
          <div className = 'shopitems'>
          <Row md={4}>
            { showMoreCount === 4
              ? (shopItemState.top_results.map((shopItem) => <Col key={shopItem.id}>
              <ShopItem key={shopItem.id} shopItem={shopItem} />
              <br/>
            </Col>).slice(0, 4))
              : (shopItemState.top_results.map((shopItem) => <Col key={shopItem.id}>
              <ShopItem key={shopItem.id} shopItem={shopItem} />
              <br/>
            </Col>).slice(0, showMoreCount))
          }
          </Row>
          </div>
        </Row>
        {
          shopItemState.top_results?.length > 0
            ? <div className ='showmore'>
                {
                  // change 8 below to however we want
                  showMoreCount === 8
                    ? <></>
                    : <Button data-testid='show-more' variant = 'showmore' onClick={() => { showMoreHandler() }}>Show More</Button>
                }
              </div>
            : <div>
                <h1 className="Header">There is no result.</h1>
              </div>
        }
        <div className = 'spacingbetweensection'></div>
        </div>
      </Container>
      <div className = 'spacing'></div>
      <div className = 'community'>
        <a href = '/community'>
          <img src = '/communitybanner.png' width = '100%'></img>
        </a>
      </div>
      </div>
      <div className = 'communityPosts'>
      <Container>
        <div className = 'spacing'></div>
        <div className = 'secondpage'>
        <Row className="Header-row">
          <Col md={3}>
            <Stack direction = 'horizontal' gap = {1}>
              <h3 id = 'Trending'>Top Posts</h3>
              <img src = '/trending-1.png' width = '25' height = '30'></img>
            </Stack>
          </Col>
        </Row>
        <div className = 'spacingbetweenword'></div>
        <Row>
        {
          reviewState.trending_posts.map((review) => <Col key={review.id}>
            <Post id = {review.id} />
            <br/>
          </Col>).slice(0, 4)
        }
        </Row>
        <div className = 'spacingbetweensection'></div>
        </div>
      </Container>
      </div>
      </div>
      <Footer/>
    </div>)
  } else {
    return <div></div>
  }
}
