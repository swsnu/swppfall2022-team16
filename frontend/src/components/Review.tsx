import React from 'react'
import { Card, Stack } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons';
/*eslint-disable */

export default function Review (): JSX.Element {

  const navigate = useNavigate();
  
  return <div>
    <Card onClick = {() => navigate("/community/:id")} style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://img.sbs.co.kr/newsnet/etv/upload/2020/10/28/30000654805_1280.jpg" style={{ width: '18rem' }} />
      <Card.Body>
        <Card.Title as= "h3">Such a great place</Card.Title>
        <Card.Text as= "p">Bethany</Card.Text>
        <Stack direction = 'horizontal'>
          <Icon.StarFill/>
          <Icon.StarFill/>
          <Icon.StarFill/>
          <Icon.StarFill/>
          <Icon.StarFill/>
        </Stack>
      </Card.Body>
    </Card>
  </div>
}