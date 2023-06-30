import React from "react";

import { Layout } from "../components";

import "@/styles/globals.css";

// Crashed with babel config
// import { Inter } from "@next/font/google";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
