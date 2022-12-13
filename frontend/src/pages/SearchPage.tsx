import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Filter, { filters } from '../components/Filter'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import { fetchMainItems, fetchRecommendation, fetchTopResult, selectShopItem } from '../store/slices/shopitem'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { AiOutlineFilter } from 'react-icons/ai'
import '../css/Footer.css'
import '../css/mainpage.css'
import '../css/searchpage.css'
import { selectUser } from '../store/slices/user'

export default function SearchPage (): JSX.Element {
  const [loaded, setLoaded] = useState<boolean>(false)
  const { text } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)
  const userState = useSelector(selectUser)
  const [tags, setTags] = useState<string[]>([])
  const [showMoreCount, setShowMoreCount] = useState(4)

  useEffect(() => {
    const fetchRequired = async (): Promise<void> => {
      await dispatch(fetchMainItems())
      await dispatch(fetchTopResult({ text, tags: [] }))
      await dispatch(fetchRecommendation(8))
      setLoaded(true)
    }
    fetchRequired().catch(() => {})
  }, [dispatch])

  if (loaded) {
    const showMoreHandler = (): void => {
      setShowMoreCount(showMoreCount + 4)
    }
    const tagHandler = (remove: string, add: string): void => {
      // console.log('Remove:' + remove)
      // console.log('Add:' + add)
      setTags(tags.filter((val) => val !== remove.toLowerCase()).concat(add.toLowerCase()).filter((val) => val !== ''))
    }

    return (<div className = 'page-container'>
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
      <TopBar/>
      <Container>
        <Row className="Header-row">
          <Col>
            <h1 className="searchresult" style={{ color: 'deeppink' }}>Search result for &apos;{text}&apos;</h1>
          </Col>
        </Row>
        <Row className="Header-row">
          <Col md={3}>
            <h3 id="Trending">Top Results</h3>
          </Col>
          <Col md={6}></Col>
          {
            filters.map(({ category, options }) => <Col key={category} md={1}>
              <Filter key={category} category={category} options={options} handler={tagHandler}/>
            </Col>)
          }
          <Col md={1}>
            <Button style={{ backgroundColor: 'transparent', color: 'black', borderColor: 'black' }} onClick={() => { dispatch(fetchTopResult({ text, tags })) }}>
              <AiOutlineFilter />
            </Button>
          </Col>
        </Row>
        <Row md={4}>
          { showMoreCount === 4
            ? shopItemState.top_results?.map((shopItem) => <Col key={shopItem.id}>
              <ShopItem shopItem={shopItem} />
              <br/>
            </Col>).slice(0, 4)
            : shopItemState.top_results?.map((shopItem) => <Col key={shopItem.id}>
              <ShopItem shopItem={shopItem} />
              <br/>
            </Col>).slice(0, showMoreCount)
          }
        </Row>
        {
          shopItemState.top_results?.length > 0 
          ? <div className ='showmore'>
            <Button variant = 'showmore' onClick={() => { showMoreHandler() }}>Show More</Button>
            </div>
            : <div>
              <h1 className="Header">There is no result.</h1>  
              </div>
        }
        <Row className="Header-row">
          <Col>
            <h1 className="Header">Recommendations</h1>
          </Col>
        </Row>
        <Row md={4}>
          {
            shopItemState.recommendations?.map((shopItem) => <Col key={shopItem.id}>
              <ShopItem shopItem={shopItem} />
            </Col>)
          }
        </Row>
      </Container>
      </div>
      <Footer/>
    </div>)
  } else {
    return <div></div>
  }
}
