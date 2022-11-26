import React, { useEffect, useState } from 'react'
import { Button, Form, Nav, Stack } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { selectUser, signout } from '../store/slices/user'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../store'
import '../css/mainpage.css'
import userorder, { selectUserOrder } from '../store/slices/userorder'


export default function TopBar (): JSX.Element {
  const [loggedIn, setloggedIn] = useState(false)
  const [searchText, setSearchText] = useState('')
  const userState = useSelector(selectUser)
  const navigate = useNavigate()
  const userOrderState = useSelector(selectUserOrder)

  useEffect(() => {
    if (userState.currentLoggedIn != null) {
      setloggedIn(true)
    } else setloggedIn(false)
  })

  

  const items = userOrderState.cart
  const userId = userState.currentLoggedIn?.id
  const path = '/user/' + userId
  const userName = userState.currentLoggedIn?.nickname
  const dispatch = useDispatch<AppDispatch>()
  const loggingout = async () => {
    setloggedIn(false)
    dispatch(signout())
    navigate('/')
  }
  return (
    <>
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
              color: #FFE5B4;
              text-decoration: none;
            }  
    `}
      </style>
    <Navbar sticky = "top" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">
          <Stack direction = 'horizontal' gap = {2}>
            <img alt = 'bridgeUsLogo' src = '/bridgeUsLogo.png' width = '20' height = '22'></img>
            <img alt = 'BridgeUs' src ='/BridgeUs.png' width = '80' height = '20'></img>
          </Stack>
        </Navbar.Brand>
        <Nav className ="side">
            <Nav.Link href = '/community'>
            <Stack direction = 'horizontal'>
              <img alt = 'community' src = '/community.png' width = '20' height = '20' className='communitylogo'></img>
              <div className = 'sp    acing3'></div>
              </Stack>
            </Nav.Link>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  navigate(`/search/${searchText}`)
                }
              }}
            />
          </Form>
            
            <Stack direction = 'horizontal'>
              <img alt = 'shoppingcart' src = '/shoppingcart.png' width = '20' height = '20' className='shoppingcart' onClick = {() => navigate('/payment')} ></img>
              {0}
              <div className = 'spacing3'></div>
              </Stack>
          {
            loggedIn
              ? <Stack direction = 'horizontal'>
              <Nav.Link href = {path}> welcome, {userName} </Nav.Link>
              <Button variant = 'grad' onClick = {async () => await loggingout()} >log out</Button>
            </Stack>
              : <Nav.Link href = '/login'>login</Nav.Link>
          }
        </Nav>
      </Container>
    </Navbar>
  </>
  )
}
