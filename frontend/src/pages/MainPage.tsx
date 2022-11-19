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
/*eslint-disable */

export default function MainPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    dispatch(fetchMainItems())
    dispatch(fetchUsers())
  }, [dispatch])

  const tagHandler = (remove: string, add: string) => {
    console.log('Remove:' + remove)
    console.log('Add:' + add)
    setTags(tags.filter((val) => val !== remove).concat(add).filter((val) => val !== ''))
  }

  return (<div className = 'page-container'>
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
          filters.map(({category, options}) => <Col key={category} md={1}>
            <Filter key={category} category={category} options={options} handler={tagHandler}/>
          </Col>)
        }
        <Col md={1}>
          <Button style={{backgroundColor: 'transparent', color: 'black', borderColor : 'black'}} onClick={() => {console.log(tags)}}>
            <AiOutlineFilter />
          </Button>
        </Col>
      </Row>
      <Row>
        <div className = 'spacing2'></div>
        {
          shopItemState.shopitems.map((shopItem) => <Col key={shopItem.id}>
            <ShopItem key={shopItem.id} shopItem={shopItem} />
            <br/>
          </Col>)
        }
      </Row>
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
