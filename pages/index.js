import React from "react";

import { client } from "../lib/client.js";

import { Product, HeroBanner, FooterBanner, Footer } from "./components";

// * We are getting the data { products, banners } as props from getServerSideProps() i.e. Sanity
const Home = ({ products, banners }) => {
  return (
    <>
      <HeroBanner heroBanner={banners.length & banners[0]} />
      {/* {console.log(banners)} */}

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

// * This getServerSideProps() is a Next.js function that allows us to fetch data and pass it as props to React component(s)
export const getServerSideProps = async () => {
  const products = await client.fetch(`*[_type == "product"]`);
  const banners = await client.fetch(`*[_type == "banner"]`);

  return { props: { products, banners } };
};

export default Home;
