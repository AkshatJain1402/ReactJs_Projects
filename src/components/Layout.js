import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children, user }) {
  return (
    <div>
      <Navbar user={user}></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}

export default Layout;
