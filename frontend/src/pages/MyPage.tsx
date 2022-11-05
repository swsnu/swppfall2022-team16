import React from 'react'
<<<<<<< HEAD
import TopBar from '../components/TopBar'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Purchased from '../components/Purchased';
import CommunityAlert from '../components/CommunityAlert';
=======
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import TopBar from '../components/TopBar'
import { AppDispatch } from '../store'
>>>>>>> 0f6ff9dfa9d03fd93c5593cfcfcbb154b970acab
/*eslint-disable */

export default function MyPage (): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  return (<div>
    <TopBar />
    <br/>
    <>
      <Card>
        <Card.Img variant="top" src="../mypagebackground.jpg" />
          <Card.ImgOverlay>
            <img className = "profilepicture" src = '../mypageprofile.png' height = {150} width = {150} style={{ alignSelf: 'center' }}></img>
            <Card.Title>Alice</Card.Title>
          </Card.ImgOverlay>
          <Card.Body>
            <Button variant="primary">Edit</Button>
          </Card.Body>
      </Card>
      <Purchased></Purchased>
      <Purchased></Purchased>
      <br/>
      <CommunityAlert></CommunityAlert>
      <CommunityAlert></CommunityAlert>
    </>
  </div>)
}
