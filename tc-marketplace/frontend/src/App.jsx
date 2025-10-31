import { useState } from 'react'


import HomePage from './pages/Home'
import ProductPage from './pages/ProductPage'
import Shop from './pages/Shop'
import About from './pages/About'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPostPage from './pages/BlogPostPage'
import { blogPosts } from './data/blogPosts'
import FeaturedPosts from './components/blog/FeaturedPosts'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import RegisterSeller from './pages/RegisterSeller'
import SellerDashboardPage from './pages/SellerDashboardPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-seller" element={<RegisterSeller />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />   
          <Route path="/dashboard" element={<SellerDashboardPage />} />
          {/* <Route path="/admin/dashboard" element={<AdminDashboardPage />} />      */}
        </Routes>
        { <Footer />}
      </BrowserRouter>
    </>
  )
}

export default App
