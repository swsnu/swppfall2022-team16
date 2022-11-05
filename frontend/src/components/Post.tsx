import React from 'react'
import { Card } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { Navigate, useNavigate } from 'react-router-dom'
/*eslint-disable */

export default function Post(): JSX.Element {

  const navigate = useNavigate();
  
  return <div>
    <Card onClick = {() => navigate("/community/:id")} style={{ width: '18rem' }}>
      <Card.Header>Trending Post</Card.Header>
      <Card.Img variant="top" src="https://img.sbs.co.kr/newsnet/etv/upload/2020/10/28/30000654805_1280.jpg" style={{ width: '18rem' }} />
      <Card.Body>
        <Card.Text as= "h5">@karina</Card.Text>
      </Card.Body> 
    </Card>
  </div>
}
