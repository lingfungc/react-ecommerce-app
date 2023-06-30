import React from "react";

// This "head" refers to the HTML <head /> and all those metadata
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>THY Perfumery - by Ling Fung Chan</title>
        <link rel="icon" href="../../lingfungc-favicon-32x32.png" sizes="any" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
