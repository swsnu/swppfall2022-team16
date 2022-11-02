import React from 'react'
import './App.css'
import MainPage from './pages/MainPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SearchPage from './pages/SearchPage'
import ProductPage from './pages/ProductPage'
import PaymentPage from './pages/PaymentPage'
import MyPage from './pages/MyPage'
import CommunityPage from './pages/CommunityPage'
import PostPage from './pages/PostPage'
import ReviewPage from './pages/ReviewPage'

function App (): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/search/:id" element={<SearchPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/user/:id" element={<MyPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/:id" element={<PostPage />} />
          <Route path="/review/:id" element={<ReviewPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
