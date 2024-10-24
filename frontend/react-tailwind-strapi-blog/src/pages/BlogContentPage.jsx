// eslint-disable-next-line no-unused-vars
import React from "react";
import { NavBar, Footer, BlogContent, SideBar } from "../components";

const BlogContentPage = () => {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="flex">
          <SideBar />
          <BlogContent />
        </div>
      </main>
      {/* <footer>
        <Footer />
      </footer> */}
      {/* <Footer /> */}
    </div>
  );
};

export default BlogContentPage;
