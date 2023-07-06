import React, { useState, useEffect } from "react";

import { client, urlFor } from "../../lib/client";

import { useStateContext } from "../../context/StateContext";

import { Product } from "../../components";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  const [index, setIndex] = useState(0);

  const { decQty, incQty, qty, onAdd } = useStateContext();

  // console.log(products);

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {/* This "?" is to ensure the "image" array exists */}
            {image?.map((item, i) => (
              <img
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
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
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num" onClick="">
                {qty}
              </span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              // * We need to use onAdd() as a callback function
              onClick={() => onAdd(product, qty)}
            >
              Add to cart
            </button>
            <button type="button" className="buy-now" onClick="">
              Buy now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
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

// * We need to get the product data from Sanity by params[slug]
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
