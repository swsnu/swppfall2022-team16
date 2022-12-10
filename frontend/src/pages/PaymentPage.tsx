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
import '../css/paymentpage.css'
import { selectShopItemDetail } from '../store/slices/shopitemdetail'
import { fetchCart, purchaseWithCredit, selectUserOrder } from '../store/slices/userorder'
import usershop, { fetchUserShop, selectUserShop } from '../store/slices/usershop'

export default function PaymentPage (): JSX.Element {
  const [loaded, setLoaded] = useState<boolean>(false)
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
    const fetchRequired = async (): Promise<void> => {
      await dispatch(fetchMainItems())
      await dispatch(fetchUsers())
      await dispatch(fetchCart())
      await dispatch(fetchUserShop())
      setLoaded(true)
    }
    fetchRequired().catch(() => {})
  }, [dispatch])

  if (loaded) {
    const items = userOrderState.cart
    let subtotal = 0
    for (let i = 0; i < items.length; i++) {
      subtotal = subtotal + (items[i].ordered_amount * items[i].single_price)
    }
    const item = shopItemState.shopitems.find((shopitem) => shopitem.id === Number(id))
    // for each item, itemDetail exists. Retrieve shopitemdetail through item id to get color and size of the product
    const itemDetail = shopItemDetailState.shopitem_details.find((shopitemdetail) => shopitemdetail.main_item === Number(id))
    const findAuthorName = (ID: number | undefined): string | undefined => {
      return userState.users.find((user: User) => { return (user.id === ID) })?.nickname
    }

    const buyWithMyCreditHandler = async (): Promise<void> => {
      console.log(`shippingOption: ${shippingOption}`)
      const result = await dispatch(purchaseWithCredit(shippingOption === 'Fast' ? 10 : 5))
      if (result.type === `${purchaseWithCredit.typePrefix}/fulfilled`) {
        navigate('/user/8')
      } else {
        alert('Your purchase has errors. Please try again!')
      }
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

                       
                 
              .btn-gradients {
                background-image: linear-gradient(to right, #ee9ca7 0%, #ffdde1  51%, #ee9ca7  100%);
                margin: 10px;
                padding: 15px 45px;
                text-align: center;
                text-transform: uppercase;
                transition: 0.5s;
                background-size: 200% auto;
                color: white;            
                box-shadow: 0 0 20px #eee;
                display: block;
                font-weight : bold;
              }
    
              .btn-gradients:hover {
                background-position: right center; /* change the direction of the change here */
                color: #fff;
                text-decoration: none;
              }
             
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
            <Stack direction = 'vertical'>
              {
                items.map((userorder) =>
                  <OrderForm
                    key={userorder.id}
                    orderID={userorder.id}
                    itemID={userorder.item_id}
                    color={userorder.color}
                    size={userorder.size}
                    quantity={userorder.ordered_amount}
                    price = {userorder.single_price}
                  />
                )
              }
              <div className = 'deleteWholeCart'>
                <Button variant = 'gradients' >
                  Delete Cart
                </Button>
              </div>
            </Stack>
          </Col>
          <Col>
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
              <div className = 'spacing2'></div>
              <br/>
              <Stack>
                <hr></hr>
                <h3>Total Receipt</h3>
                <div className = 'spacing2'></div>
                <PaymentForm shippingFee={shippingOption === 'Fast' ? 10 : 5} totalCost = {subtotal} credit = {(userShopState.usershop != null) ? userShopState.usershop.credit : 0}/>
                <Button variant = 'grad' onClick={() => { buyWithMyCreditHandler() }}>Buy with my credit</Button>
              </Stack>
          </Col>
        </Row>
      </Container>
      </div>
      <Footer/>
    </div>)
  } else {
    return <div></div>
  }
}
