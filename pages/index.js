import React from "react";

import { client } from "../lib/client.js";

import { Product, HeroBanner, FooterBanner, Footer } from "./components";

const Home = ({ products, banners }) => {
  return (
    <>
      <HeroBanner />
      {console.log(banners)}

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Perfumes of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => product.name)}
      </div>
      <FooterBanner />
    </>
  );
};

export const getServerSideProps = async () => {
  const products = await client.fetch(`*[_type == "product"]`);
  const banners = await client.fetch(`*[_type == "banner"]`);

  return { props: { products, banners } };
};

export default Home;
