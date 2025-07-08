import { useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Navigate from './components/Navigate'
import {BrowserRouter as Router ,Route,Routes} from "react-router-dom"
import Signin from "../src/components/Signin"
import Signup from "./components/Signup"
import Footer from "./components/Footer"
import CreateBlog from './components/Blogs/CreateBlog'


function App() {
  return (
    <Router>
     <Navbar />
     <Routes >
     <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Navigate />
            </>
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add" element={<CreateBlog/>} />
        </Routes>
      <Footer />
    </Router>
  )
}

export default App
