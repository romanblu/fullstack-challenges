import { useState } from 'react'


import HomePage from './pages/Home'
import ProductPage from './pages/ProductPage'
import Shop from './pages/Shop'
import About from './pages/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPostPage from './pages/BlogPostPage'
import { blogPosts } from './data/blogPosts'

function App() {

  return (
    <>
      
      {/* <HomePage /> */}
        {/* <ProductPage /> */}
      {/* { <Shop />} */}
      
      {/* { <About />} */}
      {/* {<SignIn /> } */}
      { <BlogPostPage /> }
      { <Footer />}
    </>
  )
}

export default App
