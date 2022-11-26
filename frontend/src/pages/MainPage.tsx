import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../components/Banner'
import Filter, { filters } from '../components/Filter'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'
import Footer from '../components/Footer'
import { fetchUsers } from '../store/slices/user'
import { AiOutlineFilter } from 'react-icons/ai'
import '../css/mainpage.css'
import '../css/Footer.css'
import '../css/Banner.css'

export default function MainPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)
  const [tags, setTags] = useState<string[]>([])
  const [showMoreCount, setShowMoreCount] = useState(4)

  useEffect(() => {
    dispatch(fetchMainItems())
    dispatch(fetchUsers())
  }, [dispatch])

  const tagHandler = (remove: string, add: string) => {
    console.log('Remove:' + remove)
    console.log('Add:' + add)
    setTags(tags.filter((val) => val !== remove).concat(add).filter((val) => val !== ''))
  }

  const showMoreHandler = ()=>{
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
        <Col md={5}></Col>
        {
          filters.map(({ category, options }) => <Col key={category} md={1}>
            <Filter key={category} category={category} options={options} handler={tagHandler}/>
          </Col>)
        }
        <Col md={1}>
          <Button style={{ backgroundColor: 'transparent', color: 'black', borderColor: 'black' }} onClick={() => { console.log(tags) }}>
            <AiOutlineFilter />
          </Button>
        </Col>
      </Row>
      <Row>
        <div className = 'spacing2'></div>
        <div className = 'shopitems'>
        <Row md={4}>
          {  showMoreCount == 4 ? 
          (shopItemState.shopitems.map((shopItem) => <Col key={shopItem.id}>
            <ShopItem key={shopItem.id} shopItem={shopItem} />
            <br/>
          </Col>).slice(0,4)) : (shopItemState.shopitems.map((shopItem) => <Col key={shopItem.id}>
            <ShopItem key={shopItem.id} shopItem={shopItem} />
            <br/>
          </Col>).slice(0,showMoreCount))  
        }
        </Row>
        </div>
      </Row>
      <div className ='showmore'>
      <Button variant = 'showmore' onClick={()=> {showMoreHandler()}}>Show More</Button>
      </div>
      <div className = 'spacing2'></div>
      </div>
    </Container>
    <div className = 'spacing'></div>
    <div className = 'community'>
      <a href = '/community'>
        <img src = '/communitybanner.png' width = '100%'></img>
      </a>
    </div>
    </div>
    </div>
    <Footer/>
  </div>)
}
