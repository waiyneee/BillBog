import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider, useDispatch } from 'react-redux';
import store from './state/store';
import axios from 'axios';

import { login, logout } from './state/authSlice'; 

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Navigate from './components/Navigate';
import Signin from "./components/Signin"; 
import Signup from "./components/Signup";
import Footer from './components/Footer';
import CreateBlog from './components/Blogs/CreateBlog';
import BlogList from './components/Blogs/BlogList'; 
import SingleBlog from './components/Blogs/SingleBlog';



const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const res = await axios.get("/api/user/auth-status", { withCredentials: true });
        if (res.data.isAuthenticated && res.data.user) {
          dispatch(login({
            email: res.data.user.email,
            fullName: res.data.user.fullName,
            id: res.data.user._id,
          }));
        } else {
          dispatch(logout());
        }
      } catch (err) {
        console.error("Failed to check authentication status on app load:", err);
        dispatch(logout());
      }
    };

    checkUserAuth();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Navigate />
              <BlogList /> 
            </>
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add" element={<CreateBlog />} />
        
        <Route path="/blogs/:id" element={<SingleBlog />} />
      </Routes>
      <Footer />
    </>
  );
};


function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
