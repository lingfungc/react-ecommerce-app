import React from "react";

import { client, urlFor } from "../../lib/client";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[0])} />
          </div>
          {/* <div className="small-images-container"> */}
          {/* This "?" is to ensure the "image" array exists */}
          {/* {image?.map((item, i) => (
              <img src={urlFor(item)} className="" onMouseEnter="" />
            ))} */}
          {/* </div> */}
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            {/* <div> */}
            {<AiFillStar />}
            {<AiFillStar />}
            {<AiFillStar />}
            {<AiFillStar />}
            {<AiOutlineStar />}
            {/* </div> */}
            <p>(20)</p>
          </div>
          <div>
            <h4>Details: </h4>
            <p>{details}</p>
            <p className="price">£{price}</p>
          </div>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick="">
                <AiOutlineMinus />
              </span>
              <span className="num" onClick="">
                0
              </span>
              <span className="plus" onClick="">
                <AiOutlinePlus />
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
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

export const getStaticProps = async ({ params: { slug } }) => {
  const product = await client.fetch(
    // We only want the first product that matches this query with the slug name
    `*[_type == "product" && slug.current == '${slug}'][0]`
  );

  const products = await client.fetch(`*[_type == "product"]`);

  return { props: { product, products } };
};

export default ProductDetails;
