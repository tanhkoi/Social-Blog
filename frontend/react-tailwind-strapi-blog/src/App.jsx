import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./pages/Admin/Header";
import Sidebar from "./pages/Admin/Sidebar";
import Home from "./pages/Admin/Home";
import Homepage from "./pages/Public/HomePage/Homepage";
import BlogContentPage from "./pages/Public/BlogContentPage/BlogContentPage";
import SignUpPage from "./pages/Public/AuthPage/SignUpPage";
import LoginPage from "./pages/Public/AuthPage/LoginPage";
import Aboutpage from "./pages/Public/AboutPage/Aboutpage";
import NotFoundPage from "./pages/Public/NotFoundPage/NotFoundPage";
import SupportPage from "./pages/Public/SupportPage/SupportPage";
import HistoryPage from "./pages/Public/HistoryPage/HistoryPage";
import AccountDetailPage from "./pages/Public/AccountPage/AccountDetailPage";
import NewPostPage from "./pages/Public/NewPostPage/NewPostPage";
import SavedBlogsPage from "./pages/Public/SavedBlogsPage/SavedBlogsPage";
import ProfilePage from "./pages/Public/AccountPage/ProfilePage";
import TagPage from "./pages/Public/TagPage/TagPage";
import TagList from "./pages/Public/TagPage/TagList";
import PopularPage from "./pages/Public/PopularPage/PopularPage";



import {
  CategoriesPage,
  BlogPage,
  CustomerPage,
  SettingPage,
} from "./pages/Admin";

const AdminLayout = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<BlogPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="customers" element={<CustomerPage />} />
          <Route path="settings" element={<SettingPage />} />
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
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/account" element={<AccountDetailPage />} />
        <Route path="/newpost" element={<NewPostPage />} />
        <Route path="/saved" element={<SavedBlogsPage />} />
        <Route path="/category" element={<TagPage />} />
        <Route path="/category/:categoryName" element={<TagList />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
