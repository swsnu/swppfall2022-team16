import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
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

  useEffect(() => {
    dispatch(fetchMainItems())
    dispatch(fetchUsers())
  }, [dispatch])

  return (<div className = 'page-container'>
    <div className = 'contents'>
    <TopBar />
    <div className = 'banner'>
          <Banner />
    </div>
    <div className = 'recommend'>
    <Container>
      <br/>
      <div className = 'mainpage'>
      <Row className="Header-row">
        <Col md={3}>
          <h3 id = 'Trending'>Trending</h3>
        </Col>
        <Col md={5}></Col>
        {
          filters.map(({category, options}) => <Col key={category} md={1}>
            <Filter key={category} category={category} options={options}/>
          </Col>)
        }
        <Col md={1}>
          <Button style={{backgroundColor: 'transparent', color: 'black', borderColor : 'black'}}>
            <AiOutlineFilter />
          </Button>
        </Col>
      </Row>
      <br/>
      <Row>
        {
          shopItemState.shopitems.map((shopItem) => <Col key={shopItem.id}>
            <ShopItem key={shopItem.id} shopItem={shopItem} />
            <br/>
          </Col>)
        }
      </Row>
      </div>
    </Container>
    </div>
    </div>
    <Footer/>
  </div>)
}
