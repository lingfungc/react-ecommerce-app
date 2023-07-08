import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        {/* {console.log(heroBanner)} */}

        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>

        {/*
          {console.log(heroBanner.image)}
          {console.log(urlFor(heroBanner.image))}
        */}

        <img
          src={urlFor(heroBanner.image)}
          alt="perfumes"
          className="hero-banner-image"
        />
        <div>
          <Link href={`/products/${heroBanner.slug.current}`}>
            <button type="button">Explore</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
