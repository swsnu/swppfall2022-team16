import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import OrderForm from '../components/OrderForm'
import PaymentForm from '../components/PaymentForm'
import ShippingForm from '../components/ShippingForm'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchMainItems, selectShopItem } from '../store/slices/shopitem'
import { fetchUsers, selectUser, User } from '../store/slices/user'
import '../css/Footer.css'
import { selectShopItemDetail } from '../store/slices/shopitemdetail'
import { fetchCart, selectUserOrder } from '../store/slices/userorder'
import usershop, { fetchUserShop, selectUserShop } from '../store/slices/usershop'

export default function PaymentPage (): JSX.Element {
  const { id } = useParams()
  const navigate = useNavigate()
  const [shippingOption, setShippingOption] = useState<string>('Fast')
  const dispatch = useDispatch<AppDispatch>()
  const shopItemState = useSelector(selectShopItem)
  const userState = useSelector(selectUser)
  const shopItemDetailState = useSelector(selectShopItemDetail)
  const userOrderState = useSelector(selectUserOrder)
  const userShopState = useSelector(selectUserShop)

  useEffect(() => {
    dispatch(fetchMainItems())
    dispatch(fetchUsers())
    dispatch(fetchCart())
    dispatch(fetchUserShop())
  }, [dispatch])

  const items = userOrderState.cart
  const item = shopItemState.shopitems.find((shopitem) => shopitem.id === Number(id))
  // for each item, itemDetail exists. Retrieve shopitemdetail through item id to get color and size of the product
  const itemDetail = shopItemDetailState.shopitem_details.find((shopitemdetail) => shopitemdetail.main_item === Number(id))
  const findAuthorName = (ID: number | undefined) => {
    return userState.users.find((user: User) => { return (user.id === ID) })?.nickname
  }
  return (
  <div className = 'page-container'>
    <style type="text/css">
        {`
             .btn-grad {
              background-image: linear-gradient(to right, #5f2c82 0%, #49a09d  51%, #5f2c82  100%);
              text-align: center;
              transition: 0.5s;
              background-size: 200% auto;
              color: white;       
              font-weight : bold;     
              box-shadow: 0 0 20px #eee;
              border-radius: 10px;
              display: block;
            }
  
            .btn-grad:hover {
              background-position: right center; /* change the direction of the change here */
              color: blue;
              text-decoration: none;
            }
    `}
      </style>
      <div className = 'contents'>
    <TopBar />
    <Container>
      <Row className="Header-row">
        <Col>
          <h1 className="Header">Checkout Your Order</h1>
        </Col>
      </Row>
      <Row className="Header-row">
        <Col>
          <Stack>
            {
              items.map((userorder) =>
                <OrderForm
                  key={userorder.id}
                  itemID={userorder.item_id}
                  color={userorder.color}
                  size={userorder.size}
                  quantity={userorder.ordered_amount}
                  price = {userorder.single_price}
                />
                ) 
            }
            <Container fluid>
              <Row className='Header-row'>
                <Col>
                  <Card style={{ width: '18rem' }} border={shippingOption === 'Fast' ? 'primary' : ''} onClick={() => setShippingOption('Fast')} data-testid='fast'>
                    <Card.Body>
                      <Card.Title as= "h3">Fast Shipping</Card.Title>
                      <Card.Text as= "h5">1 ~ 3 business days</Card.Text>
                      <Card.Text as= "h5">$10.00</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ width: '18rem' }} border={shippingOption === 'Standard' ? 'primary' : ''} onClick={() => setShippingOption('Standard')} data-testid='standard'>
                    <Card.Body>
                      <Card.Title as= "h3">Standard</Card.Title>
                      <Card.Text as= "h5">3 ~ 5 business days</Card.Text>
                      <Card.Text as= "h5">$5.00</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
            <br/>
            <ShippingForm />
          </Stack>
        </Col>
        <Col>
          <Stack>
            <PaymentForm shippingFee={shippingOption === 'Fast' ? 10 : 5} totalCost = {100} credit = {400}/>
            <Button variant = 'grad' onClick={() => navigate('/user/8')}>Buy with my credit</Button>
          </Stack>
        </Col>
      </Row>
    </Container>
    </div>
    <Footer/>
  </div>)
}
