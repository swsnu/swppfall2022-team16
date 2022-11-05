import React from 'react'
import Banner from '../components/Banner'
import Filter from '../components/Filter'
import ShopItem from '../components/ShopItem'
import TopBar from '../components/TopBar'
/*eslint-disable */

export default function MainPage (): JSX.Element {
  return (<div>
    <TopBar />
    <Banner />
    {
      [0, 1, 2, 3].map((i) => <Filter key={i} />)
    }
    {
      [0, 1, 2, 3].map((i) => <ShopItem key={i} />)
    }
  </div>)
}
