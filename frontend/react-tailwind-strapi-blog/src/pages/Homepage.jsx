// eslint-disable-next-line no-unused-vars
import React from "react";
import { NavBar, Blogs, Footer, SideBar } from "../components";

const Homepage = () => {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
      <div className="flex">
        <SideBar />
        <Blogs />
        </div>
      </main>
      {/* <footer className="absolute bottom-0 left-0 w-full">
        <Footer />
      </footer> */}
    </div>
  );
};

export default Homepage;
