import React  from 'react'
import {  Container } from '@mui/material'
import {BrowserRouter , Routes , Route , Navigate } from 'react-router-dom'
import Home from './components/Home/Home'
import Navbar from './components/Nav/Navbar'
import Auth from './components/Auth/Auth'
import PostDetailes from './components/PostDetailes/PostDetailes'

const App = () => {
  
  const user = JSON.parse(localStorage.getItem('profile'));


  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Navbar/>
        <Routes>
          <Route path='/posts'  element={<Home />} />
          <Route path='/'  element={<Navigate replace to="/posts" />}/>
          <Route path='/posts/search'  element={<Home />} />
          <Route path="/posts/:id" element={<PostDetailes />} />
          <Route path='/auth' element={ !user ? <Auth /> : <Navigate replace to="/posts" />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App