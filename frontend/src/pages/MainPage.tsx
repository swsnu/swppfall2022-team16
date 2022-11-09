import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../components/Banner'
import Filter, { filters } from '../components/Filter'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'
import Footer from '../components/Footer'
import { fetchUsers } from '../store/slices/user'
/*eslint-disable */

export default function MainPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)

  useEffect(() => {
    dispatch(fetchMainItems())
    dispatch(fetchUsers())
  }, [dispatch])

  return (<div>
    <TopBar />
    <br/>
    <Container>
      <Row>
        <Col>
          <Banner />
        </Col>
      </Row>
      <Row className="Header-row">
        <Col md={3}>
          <h1 className="Header">Trending</h1>
        </Col>
        <Col md={6}></Col>
        {
          filters.map(({category, options}) => <Col key={category} md={1}>
            <Filter key={category} category={category} options={options}/>
          </Col>)
        }
      </Row>
      <Row>
        {
          shopItemState.shopitems.map((shopItem) => <Col key={shopItem.id}>
            <ShopItem key={shopItem.id} shopItem={shopItem} />
            <br/>
          </Col>)
        }
      </Row>
    </Container>
    <Footer/>
  </div>)
}
