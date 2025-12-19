import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import UserDashboard from "./Dashboard/UserDashboard";
import UserLayout from "./Dashboard/UserLayout";
import UserRoute from "./routes/UserRoute";
import UserTodos from "./Dashboard/UserTodos";
import UserNotes from "./Dashboard/UserNotes";


import AdminLayout from "./admin/AdminLayout";
import AdminDashBoard from "./admin/AdminDashBoard";
import AdminUsers from "./admin/AdminUsers";

const Layout = () => {
  const location = useLocation();
  const hideLayout = ["/login", "/signup", "/user", "/admin"].some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* USER */}
        <Route path="/user" element={<UserLayout />}>
  <Route index element={<UserDashboard />} />
  <Route path="dashboard" element={<UserDashboard />} />
  <Route path="notes" element={<UserNotes />} />
  <Route path="todos" element={<UserTodos />} />
</Route>



        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <Layout />
  </Router>
);

export default App;
