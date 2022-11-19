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
import { selectUser } from '../store/slices/user'
/*eslint-disable */

export default function SearchPage (): JSX.Element {
  const { text } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)
  const userState = useSelector(selectUser)
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    dispatch(fetchMainItems())
    dispatch(fetchTopResult({ text: text, tags: [] }))
    dispatch(fetchRecommendation(userState.currentLoggedIn?.id))
  }, [dispatch])

  const tagHandler = (remove: string, add: string) => {
    console.log('Remove:' + remove)
    console.log('Add:' + add)
    setTags(tags.filter((val) => val !== remove).concat(add).filter((val) => val !== ''))
  }

  return (<div className = 'page-container'>
    <div className = 'contents'>
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
            <Filter key={category} category={category} options={options} handler={tagHandler}/>
          </Col>)
        }
        <Col md={1}>
          <Button style={{backgroundColor: 'purple', color: 'white'}} onClick={() => { dispatch(fetchTopResult({ text: text, tags: tags })) }}>
            <AiOutlineFilter />
          </Button>
        </Col>
      </Row>
      <Row style={{backgroundColor: 'gainsboro'}}>
        {
          shopItemState.top_results?.map((shopItem) => <Col key={shopItem.id}>
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
          shopItemState.recommendations?.map((shopItem) => <Col key={shopItem.id}>
            <ShopItem shopItem={shopItem} />
          </Col>)
        }
      </Row>
    </Container>
    </div>
    <Footer/>
  </div>)
}
