import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from './pages/Admin/Header';
import Sidebar from './pages/Admin/Sidebar';
import Home from './pages/Admin/Home'; 
import { Homepage, BlogContentPage, SignUpPage, LoginPage, Aboutpage, NotFoundPage, SupportPage } from "./pages/Public";

const AdminLayout = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="blogs" element={<div>Blogs Page</div>} />
          <Route path="categories" element={<div>Categories Page</div>} />
          <Route path="customers" element={<div>Customers Page</div>} />
          <Route path="inventory" element={<div>Inventory Page</div>} />
          <Route path="reports" element={<div>Reports Page</div>} />
          <Route path="settings" element={<div>Settings Page</div>} />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/blog/:id" element={<BlogContentPage />} />
      <Route path="/about" element={<Aboutpage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
};

export default App;
