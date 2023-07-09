import React, { useState, useRef, useEffect } from "react";

import { client, urlFor } from "../../lib/client";

import { useStateContext } from "../../context/StateContext";

import { Product } from "../../components";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineRight,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  const [index, setIndex] = useState(0);

  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  const carouselRef = useRef(null);

  const [scrollAmount, setScrollAmount] = useState(0);
  const [showScrollLeft, setShowScrollLeft] = useState(false);
  const [showScrollRight, setShowScrollRight] = useState(true);

  const scrollPerClick = 480;

  useEffect(() => {
    const carouselWidth = carouselRef.current.scrollWidth;

    carouselRef.current.scrollTo({
      top: 0,
      left: scrollAmount,
      behavior: "smooth",
    });

    if (scrollAmount > 0) {
      setShowScrollLeft(true);
    } else if (scrollAmount === 0) {
      setShowScrollLeft(false);
    }

    if (scrollAmount > carouselWidth - scrollPerClick) {
      setShowScrollRight(false);
    } else if (scrollAmount < carouselWidth) {
      setShowScrollRight(true);
    }
  }, [scrollAmount]);

  const scrollLeft = () => {
    setScrollAmount((prevScrollAmount) => {
      const newScrollAmount = prevScrollAmount - scrollPerClick;
      return newScrollAmount < 0 ? 0 : newScrollAmount;
    });
  };

  const scrollRight = () => {
    const carouselWidth = carouselRef.current.scrollWidth;

    setScrollAmount((prevScrollAmount) => {
      const newScrollAmount = prevScrollAmount + scrollPerClick;
      return newScrollAmount > carouselWidth
        ? carouselWidth - scrollPerClick
        : newScrollAmount;
    });
  };

  // console.log(products);

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
              alt={name}
            />
          </div>
          <div className="small-images-container">
            {/* This "?" is to ensure the "image" array exists */}
            {image?.map((item, i) => (
              <img
                // The "key" should be unique and can't use "item._id" because it will be the same for all images
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
                alt={name}
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
              <span className="num">{qty}</span>
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
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        {/* <div className="marquee"> */}
        {/* <div className="maylike-products-container track"> */}
        <div className="carousel">
          <div className="carousel-arrows">
            {showScrollLeft && (
              <AiOutlineLeft
                onClick={scrollLeft}
                className="carousel-scroll-left"
              />
            )}
            {showScrollRight && (
              <AiOutlineRight
                onClick={scrollRight}
                className="carousel-scroll-right"
              />
            )}
          </div>
          <div className="carousel-cards" ref={carouselRef}>
            {products.map((item) => (
              <div className="carousel-card" key={item._id}>
                <Product product={item} />
              </div>
            ))}
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
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
