import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Filter, { filters } from '../components/Filter'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'
import Footer from '../components/Footer'
/*eslint-disable */

export default function SearchPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)

  useEffect(() => {
    dispatch(fetchMainItems())
  }, [dispatch])

  return (<div>
    <TopBar/>
    <Container>
      <Row>
        <Col>
          <h1>Top Results</h1>
        </Col>
        {
          filters.map(({category, options}) => <Col>
            <Filter key={category} category={category} options={options}/>
          </Col>)
        }
      </Row>
      <Row>
        {
          shopItemState.shopitems.map((shopItem) => <Col>
            <ShopItem key={shopItem.id} shopItem={shopItem} />
          </Col>)
        }
      </Row>
      <Row>
        <Col>
          <Button>Show More</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Recommendations</h1>
        </Col>
        {
          filters.map(({category, options}) => <Col>
            <Filter key={category} category={category} options={options}/>
          </Col>)
        }
      </Row>
      <Row>
        {
          shopItemState.shopitems.map((shopItem) => <Col>
            <ShopItem key={shopItem.id} shopItem={shopItem} />
          </Col>)
        }
      </Row>
    </Container>
    <Footer/>
  </div>)
}
