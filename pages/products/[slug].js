import React from "react";

import { client, urlFor } from "../../lib/client";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[0])} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: "'${slug}'.js",
        },
      },
    ],
    fallback: "blocking",
  };
};

// * This block of code is from JavaScript Mastery, but not working
// export const getStaticPaths = async () => {
//   const products = await client.fetch(`*[_type == "product] {
//     slug {
//       current
//     }
//   }`);

//   const paths = products.map((product) => ({
//     params: {
//       slug: product.slug.current,
//     },
//   }));

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

export const getStaticProps = async ({ params: { slug } }) => {
  const product = await client.fetch(
    // We only want the first product that matches this query with the slug name
    `*[_type == "product" && slug.current == '${slug}'][0]`
  );

  const products = await client.fetch(`*[_type == "product"]`);

  return { props: { product, products } };
};

export default ProductDetails;
