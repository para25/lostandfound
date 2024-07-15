import React, {  } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import LostItems from "./Components/LostItems";
import FoundItems from "./Components/FoundItems";
import Home from "./Components/Home";
import ItemPage from "./Components/ItemPage";
import LostItem from "./Components/Lost_item";
import MyListings from "./Components/MyListings";
import AdminDashboard from "./Components/AdminDashboard";
import Layout from "./layout"; 

window.OneSignal = window.OneSignal || [];
// eslint-disable-next-line no-unused-vars
const OneSignal = window.OneSignal;


function App() {
  const iSAuthenticated = localStorage.getItem('token')   //Check if user is authenticated
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin')) // Get admin status
 
  
  return (
      <BrowserRouter>
          <Layout>
          <Routes>

          <Route path="/" element={<Home />}  />
          <Route path="/log-in" element={<Login/>} />
          <Route path="/sign-up" element={<Signup/>} />
          <Route path="/lostitems" element={<LostItems/>} />
          <Route path="/founditems" element={<FoundItems/>} />
          <Route path="/postitem" element={<LostItem/>} />
          <Route path="/mylistings" element={<MyListings/>} />
          <Route path="/:item" element={<ItemPage/>} />
          <Route path="/admin" element={iSAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/log-in"/>} />
          <Route path="/*" element={<Home/>} />
          </Routes>
          <ToastContainer />
          </Layout>
      </BrowserRouter>

  );
}

export default App;
