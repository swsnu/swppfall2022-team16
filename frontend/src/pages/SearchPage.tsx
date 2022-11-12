import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Filter, { filters } from '../components/Filter'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { AiOutlineFilter } from 'react-icons/ai'
/*eslint-disable */

export default function SearchPage (): JSX.Element {
  const { text } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)

  useEffect(() => {
    dispatch(fetchMainItems())
  }, [dispatch])

  return (<div>
    <TopBar/>
    <Container>
      <Row className="Header-row">
        <Col>
          <h1 className="Header" style={{color: 'deeppink'}}>Search result for '{text}'</h1>
        </Col>
      </Row>
      <Row className="Header-row" style={{backgroundColor: 'gainsboro', paddingTop: '16px'}}>
        <Col md={3}>
          <h1 className="Header">Top Results</h1>
        </Col>
        <Col md={5}></Col>
        {
          filters.map(({category, options}) => <Col key={category} md={1}>
            <Filter key={category} category={category} options={options}/>
          </Col>)
        }
        <Col md={1}>
          <Button style={{backgroundColor: 'purple', color: 'white'}}>
            <AiOutlineFilter />
          </Button>
        </Col>
      </Row>
      <Row style={{backgroundColor: 'gainsboro'}}>
        {
          shopItemState.shopitems.map((shopItem) => <Col key={shopItem.id}>
            <ShopItem shopItem={shopItem} />
          </Col>)
        }
      </Row>
      <Row style={{backgroundColor: 'gainsboro', paddingBottom: '16px'}}>
        <Col style={{textAlign: 'center'}}>
          <Button style={{marginTop: '16px'}}>Show More</Button>
        </Col>
      </Row>
      <Row className="Header-row">
        <Col>
          <h1 className="Header">Recommendations</h1>
        </Col>
      </Row>
      <Row>
        {
          shopItemState.shopitems.map((shopItem) => <Col key={shopItem.id}>
            <ShopItem shopItem={shopItem} />
          </Col>)
        }
      </Row>
    </Container>
    <Footer/>
  </div>)
}
