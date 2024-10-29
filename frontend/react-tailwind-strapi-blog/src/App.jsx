import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import SearchResults from "./components/SearchResults"
import { Homepage, BlogContentPage, SignUpPage,LoginPage, AboutPage, NotFoundPage, SupportPage } from "./pages";

const App = () => {
  return (
    <div className="Hello">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blog/:id" element={<BlogContentPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/support" element={<SupportPage />} />
        {/* <Route path="/search" element={<SearchResults blogs={blogs} />} /> */}
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
