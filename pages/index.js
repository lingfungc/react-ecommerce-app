import React from "react";

// This "client.js" is responsible for getting backend data from Sanity
// We are using this "client.js" with .getServerSideProps() and pass the data as props
import { client } from "../lib/client.js";

import {
  Product,
  HeroBanner,
  FooterBanner,
  Footer,
} from "../components/index.js";

// We are getting the data { products, banners } as props from getServerSideProps() i.e. Sanity
const Home = ({ products, banners }) => {
  return (
    <>
      {/* The { banners.length } is a conditional. Only when it's true, we pass the banners[0] as heroBanner to HeroBanner component */}
      <HeroBanner heroBanner={banners.length && banners[0]} />
      {/* {console.log(banners)} */}

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Perfumes of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={banners && banners[0]} />
    </>
  );
};

// This getServerSideProps() is a Next.js function that allows us to fetch data and pass it as props to React component(s)
// We use getServerSideProps() in Next.js while we use useEffect() with fetch() in React
export const getServerSideProps = async () => {
  const products = await client.fetch(`*[_type == "product"]`);
  const banners = await client.fetch(`*[_type == "banner"]`);

  return { props: { products, banners } };
};

export default Home;
