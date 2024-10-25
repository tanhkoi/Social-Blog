import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { Homepage, BlogContentPage, SignUpPage, AboutPage, NotFoundPage, SupportPage } from "./pages";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blog/:id" element={<BlogContentPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pagenotfound" element={<NotFoundPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </div>
  );
};

export default App;
