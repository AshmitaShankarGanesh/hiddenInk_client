import React, {useEffect, useState} from 'react';
import { useTheme } from "./context/ThemeContext";

import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import ToDo from './Pages/ToDo';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import AdminDashBoard from "./Dashboard/AdminDashBoard";
import UserDashBoard from "./Dashboard/UserDashBoard";

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


const Layout = () => {
  const location = useLocation();

  const hide = ['/login', '/signup', '/admin', '/user'];
  const hideLayout = hide.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/todo' element={<ToDo />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin' element={<AdminDashBoard />} />
        <Route path='/user' element={<UserDashBoard />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  )
}


const App = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <Router>
        <Layout />
      </Router>
    </div>
  );
};

export default App;


